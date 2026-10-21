-- EUF pro — instalación y reparación de la base de datos (Supabase)
-- Se puede ejecutar más de una vez sin borrar datos.
-- Supabase → SQL Editor → New query → pegar TODO este archivo → Run.
-- Además de crear tablas y funciones, crea el perfil de las cuentas que se
-- registraron antes de instalar la base de datos.

do $$ begin create type public.app_role as enum ('admin', 'user'); exception when duplicate_object then null; end $$;

-- Perfil visible de cada cuenta
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
drop policy if exists own_profile_read on public.profiles;
create policy own_profile_read on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists own_profile_update on public.profiles;
create policy own_profile_update on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Roles protegidos: nunca se derivan de datos editables por el usuario
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  primary key (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
drop policy if exists own_roles on public.user_roles;
create policy own_roles on public.user_roles for select to authenticated using (user_id = auth.uid());

-- Progreso en la nube por cuenta: ensayos, borradores y orientaciones del profesor
create table if not exists public.progress_records (
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('exam', 'draft', 'professor')),
  record_id text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, record_id)
);
grant select, insert, update, delete on public.progress_records to authenticated;
grant all on public.progress_records to service_role;
alter table public.progress_records enable row level security;
drop policy if exists own_progress_read on public.progress_records;
create policy own_progress_read on public.progress_records for select to authenticated using (user_id = auth.uid());
drop policy if exists own_progress_insert on public.progress_records;
create policy own_progress_insert on public.progress_records for insert to authenticated with check (user_id = auth.uid());
drop policy if exists own_progress_update on public.progress_records;
create policy own_progress_update on public.progress_records for update to authenticated using (user_id = auth.uid());
drop policy if exists own_progress_delete on public.progress_records;
create policy own_progress_delete on public.progress_records for delete to authenticated using (user_id = auth.uid());

-- Historial de evaluaciones: la reserva es atómica y una falla no consume intentos
create table if not exists public.evaluation_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  result_ready boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.evaluation_usage to authenticated;
grant all on public.evaluation_usage to service_role;
alter table public.evaluation_usage enable row level security;
drop policy if exists own_usage on public.evaluation_usage;
create policy own_usage on public.evaluation_usage for select to authenticated using (user_id = auth.uid());

-- Cupo individual de evaluaciones (predeterminado: 2 gratuitas)
create table if not exists public.evaluation_allowances (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_limit integer not null check (total_limit >= 2),
  updated_at timestamptz not null default now()
);
grant select on public.evaluation_allowances to authenticated;
grant all on public.evaluation_allowances to service_role;
alter table public.evaluation_allowances enable row level security;
drop policy if exists own_allowance_read on public.evaluation_allowances;
create policy own_allowance_read on public.evaluation_allowances for select to authenticated using (user_id = auth.uid());

-- Acceso del profesor de literatura (se activa con el pago; de momento, manual)
create table if not exists public.professor_entitlements (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  plan text not null check (plan in ('monthly', 'annual')),
  status text not null default 'inactive' check (status in ('inactive', 'active', 'cancelled')),
  valid_until timestamptz not null,
  ai_denial_reason text,
  updated_at timestamptz not null default now()
);
grant select on public.professor_entitlements to authenticated;
grant all on public.professor_entitlements to service_role;
alter table public.professor_entitlements enable row level security;
drop policy if exists professor_entitlements_read_own on public.professor_entitlements;
create policy professor_entitlements_read_own on public.professor_entitlements for select to authenticated using (user_id = auth.uid());

-- Funciones del servidor
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path to 'public'
as $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

create or replace function public.create_account_profile()
returns trigger language plpgsql security definer set search_path to 'public'
as $$ BEGIN INSERT INTO public.profiles(id,display_name) VALUES(NEW.id,left(coalesce(NEW.raw_user_meta_data->>'display_name',''),100)) ON CONFLICT (id) DO NOTHING; INSERT INTO public.user_roles(user_id,role) VALUES(NEW.id,'user') ON CONFLICT DO NOTHING; RETURN NEW; END $$;

create or replace function public.reserve_evaluation()
returns uuid language plpgsql security definer set search_path to 'public'
as $$
DECLARE uid uuid:=auth.uid(); evaluation_id uuid; used integer; allowance integer;
BEGIN
IF uid IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
PERFORM pg_advisory_xact_lock(hashtextextended(uid::text,0));
UPDATE public.evaluation_usage SET status='failed' WHERE user_id=uid AND status='pending' AND created_at < now()-interval '10 minutes';
IF EXISTS(SELECT 1 FROM public.evaluation_usage WHERE user_id=uid AND status='pending') THEN RAISE EXCEPTION 'evaluation_busy'; END IF;
SELECT count(*) INTO used FROM public.evaluation_usage WHERE user_id=uid AND status='completed';
SELECT coalesce((SELECT total_limit FROM public.evaluation_allowances WHERE user_id=uid),2) INTO allowance;
IF used>=allowance THEN RAISE EXCEPTION 'plan_required'; END IF;
INSERT INTO public.evaluation_usage(user_id) VALUES(uid) RETURNING id INTO evaluation_id;
RETURN evaluation_id;
END $$;

create or replace function public.complete_evaluation(_id uuid, _user_id uuid, _success boolean)
returns void language plpgsql security definer set search_path to 'public'
as $$ BEGIN UPDATE public.evaluation_usage SET status=CASE WHEN _success THEN 'completed' ELSE 'failed' END WHERE id=_id AND user_id=_user_id AND status='pending'; IF NOT FOUND THEN RAISE EXCEPTION 'Invalid evaluation reservation'; END IF; END $$;

create or replace function public.mark_evaluation_ready(_id uuid, _user_id uuid)
returns void language plpgsql security definer set search_path to 'public'
as $$ BEGIN UPDATE public.evaluation_usage SET result_ready=true WHERE id=_id AND user_id=_user_id AND status='pending'; IF NOT FOUND THEN RAISE EXCEPTION 'Invalid evaluation reservation'; END IF; END $$;

create or replace function public.acknowledge_evaluation(_id uuid)
returns void language plpgsql security definer set search_path to 'public'
as $$ DECLARE uid uuid:=auth.uid(); BEGIN IF uid IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF; PERFORM pg_advisory_xact_lock(hashtextextended(uid::text,0)); UPDATE public.evaluation_usage SET status='completed' WHERE id=_id AND user_id=uid AND status='pending' AND result_ready=true; IF NOT FOUND AND NOT EXISTS(SELECT 1 FROM public.evaluation_usage WHERE id=_id AND user_id=uid AND status='completed' AND result_ready=true) THEN RAISE EXCEPTION 'Evaluation not ready'; END IF; END $$;

create or replace function public.get_professor_access()
returns jsonb language sql stable security definer set search_path to 'public'
as $$
 SELECT jsonb_build_object('allowed', EXISTS (SELECT 1 FROM public.professor_entitlements WHERE user_id = auth.uid() AND status = 'active' AND plan IN ('monthly','annual') AND valid_until > now()), 'denial', (SELECT ai_denial_reason FROM public.professor_entitlements WHERE user_id = auth.uid()));
$$;

-- Perfil y rol automáticos al registrarse un usuario
drop trigger if exists create_account_profile on auth.users;
create trigger create_account_profile after insert on auth.users
for each row execute function public.create_account_profile();

-- Solo el servidor puede marcar evaluaciones como listas o terminadas
revoke execute on function public.complete_evaluation(uuid, uuid, boolean) from public, anon, authenticated;
revoke execute on function public.mark_evaluation_ready(uuid, uuid) from public, anon, authenticated;
grant execute on function public.complete_evaluation(uuid, uuid, boolean) to service_role;
grant execute on function public.mark_evaluation_ready(uuid, uuid) to service_role;
revoke execute on function public.reserve_evaluation() from public, anon;
grant execute on function public.reserve_evaluation() to authenticated, service_role;
revoke execute on function public.acknowledge_evaluation(uuid) from public, anon;
grant execute on function public.acknowledge_evaluation(uuid) to authenticated, service_role;

-- Perfil y rol para las cuentas que ya existían antes de instalar la base
insert into public.profiles(id, display_name)
select u.id, left(coalesce(u.raw_user_meta_data->>'display_name', ''), 100)
from auth.users u on conflict (id) do nothing;
insert into public.user_roles(user_id, role)
select u.id, 'user' from auth.users u on conflict do nothing;

-- Avisar a la API que hay tablas nuevas
notify pgrst, 'reload schema';

-- Comprobación: debe mostrar 6 tablas
select count(*) as tablas_instaladas from information_schema.tables
where table_schema = 'public' and table_name in
('profiles','user_roles','progress_records','evaluation_usage','evaluation_allowances','professor_entitlements');
