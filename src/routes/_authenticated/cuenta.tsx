import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { queryOptions, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, BookOpen, CloudCheck, FileText, PenLine, Save, ShieldCheck, Sparkles, TrendingUp, UserRound } from "lucide-react";
import { getAccount } from "@/lib/account.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { resultat, useTentatives } from "@/lib/euf-progress";
const options = queryOptions({ queryKey:["account"],queryFn:()=>getAccount() });
export const Route = createFileRoute("/_authenticated/cuenta")({ loader:({context})=>context.queryClient.ensureQueryData(options), head:()=>({meta:[{title:"Mi cuenta | ÉUF"},{name:"description",content:"Perfil personal y evaluaciones disponibles en ÉUF."},{property:"og:title",content:"Cuenta ÉUF"},{property:"og:description",content:"Consulta tu perfil y tus evaluaciones gratuitas."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}]}),component:AccountPage });
function AccountPage() {
  const { data } = useSuspenseQuery(options);
  const { user } = useAuth();
  const { t, locale } = useLanguage();
  const queryClient = useQueryClient();
  const { tentatives, loading, error, retry } = useTentatives();
  const [name, setName] = useState(data.displayName);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const latest = tentatives[0];
  const latestResult = latest ? resultat(latest) : null;
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !name.trim()) return;
    setBusy(true); setMessage("");
    try {
      const { error } = await supabase.from("profiles").update({ display_name: name.trim().slice(0, 100) }).eq("id", user.id);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      setMessage("Perfil guardado.");
    } catch { setMessage("No se pudo guardar."); }
    finally { setBusy(false); }
  }
  return <AppShell>
    <section className="flex flex-wrap items-center justify-between gap-6 border-b pb-8">
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground" aria-hidden="true">{data.displayName.trim().slice(0, 1).toUpperCase() || <UserRound />}</div>
        <div className="min-w-0"><p className="text-sm font-medium text-muted-foreground">{t("Mi cuenta")}</p><h1 className="mt-1 break-words text-3xl font-bold tracking-normal">{t("Hola, {name}", { name: data.displayName || t("Usuario") })}</h1><div className="mt-3 flex flex-wrap items-center gap-3"><Badge variant="secondary"><ShieldCheck className="size-3" />{t(data.isAdmin ? "Administrador" : "Usuario")}</Badge><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><CloudCheck className="size-4 text-success" />{t("Progreso en tu cuenta")}</span></div></div>
      </div>
      <Button asChild><Link to="/redaction" search={{ sujet: undefined }}><PenLine />{t("Empezar una redacción")}<ArrowUpRight /></Link></Button>
    </section>

    <section className="mt-7 grid gap-4 sm:grid-cols-3" aria-label={t("Tu actividad")}>
      <article className="rounded-lg border bg-primary p-6 text-primary-foreground"><Sparkles className="size-5" /><p className="mt-4 text-4xl font-bold">{data.remaining}</p><p className="mt-2 text-sm">{t("Intentos disponibles")}</p><span className="sr-only">{t("Evaluaciones gratis restantes: {count}", { count: data.remaining })}</span></article>
      <article className="rounded-lg border bg-card p-6"><FileText className="size-5 text-primary" /><p className="mt-4 text-4xl font-bold">{loading || error ? "—" : tentatives.length}</p><p className="mt-2 text-sm text-muted-foreground">{t("Ensayos guardados")}</p></article>
      <article className="rounded-lg border bg-card p-6"><TrendingUp className="size-5 text-success" /><p className="mt-4 text-4xl font-bold">{loading || error ? "—" : latestResult ? `${latestResult.global} %` : "—"}</p><p className="mt-2 text-sm text-muted-foreground">{t("Último resultado")}</p></article>
    </section>

    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <section className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-bold tracking-normal">{t("Tu actividad")}</h2><Button asChild variant="link"><Link to="/progres">{t("Ver mi progreso")}<ArrowUpRight /></Link></Button></div>
        {loading ? <p className="py-8 text-sm text-muted-foreground">{t("Procesando…")}</p> : error ? <div className="py-8"><p role="alert">{t("No se pudo cargar el progreso. Inténtalo de nuevo.")}</p><Button variant="outline" className="mt-3" onClick={() => void retry()}>{t("Reintentar")}</Button></div> : latest && latestResult ? <article className="mt-4 rounded-lg border bg-card p-5"><div className="flex items-center justify-between gap-4"><p className="text-xs text-muted-foreground">{new Date(latest.date).toLocaleDateString(locale)}</p><Badge variant={latestResult.reussi ? "secondary" : "outline"}>{t(latestResult.verdict)}</Badge></div><h3 className="mt-4 text-base font-semibold tracking-normal" lang="fr" dir="ltr">{latest.sujetEnonce}</h3><div className="mt-5 grid grid-cols-3 gap-2 border-t pt-4">{[["Argumentación", latestResult.coteI], ["Estructura", latestResult.coteII], ["Lengua", latestResult.coteIII]].map(([label, grade]) => <div key={label}><p className="break-words text-xs text-muted-foreground">{t(label)}</p><p className="mt-1 text-xl font-bold">{grade}</p></div>)}</div></article> : <div className="mt-4 border-y py-8"><BookOpen className="mb-3 size-7 text-primary" /><p className="text-sm text-muted-foreground">{t("Todavía no hay ensayos. Empieza con un sujet y tu primera dissertation.")}</p></div>}
        <div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="outline"><Link to="/sujets"><BookOpen />{t("Ver los sujets")}</Link></Button><Button asChild variant="outline"><Link to="/planes"><Sparkles />{t("Planes")}</Link></Button></div>
      </section>
      <section className="min-w-0 border-t pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0"><h2 className="text-xl font-bold tracking-normal">{t("Datos personales")}</h2><div className="mt-5"><p className="text-sm font-medium">{t("Correo electrónico")}</p><p className="mt-1 break-all text-sm text-muted-foreground" dir="ltr">{user?.email}</p></div><form className="mt-6 space-y-3" onSubmit={save}><Label htmlFor="display-name">{t("Nombre")}</Label><Input id="display-name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} /><Button disabled={busy || !name.trim()} type="submit"><Save />{t(busy ? "Procesando…" : "Guardar")}</Button>{message && <p role="status" className="text-sm">{t(message)}</p>}</form><div className="mt-7 flex items-start gap-3 border-t pt-5 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" /><span>{t("Cuenta privada")}</span></div></section>
    </div>
  </AppShell>;
}