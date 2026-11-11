import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { freeEvaluationsRemaining } from "./plans";
import { z } from "zod";

export const acknowledgeEvaluation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("acknowledge_evaluation", { _id: data.id });
    if (error) throw new Error("Evaluation delivery confirmation failed");
    return { ok: true };
  });

export const getAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [profile, roles, usage, allowance] = await Promise.all([
      context.supabase.from("profiles").select("display_name").eq("id", context.userId).single(),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      context.supabase.from("evaluation_usage").select("id", { count: "exact", head: true }).eq("user_id", context.userId).eq("status", "completed"),
      context.supabase.from("evaluation_allowances").select("total_limit").eq("user_id", context.userId).maybeSingle(),
    ]);
    if (profile.error || roles.error || usage.error || allowance.error) throw new Error("Account unavailable");
    return { displayName: profile.data.display_name, isAdmin: roles.data === true, remaining: freeEvaluationsRemaining(usage.count ?? 0, allowance.data?.total_limit) };
  });

export const getAdministration = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (error || data !== true) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 30 * 86400000).toISOString();
    const [profiles, usage, allowances, errors, authUsers] = await Promise.all([
      supabaseAdmin.from("profiles").select("id,display_name,created_at").order("created_at", { ascending: false }).limit(500),
      supabaseAdmin.from("evaluation_usage").select("user_id,status,created_at").limit(10000),
      supabaseAdmin.from("evaluation_allowances").select("user_id,total_limit"),
      supabaseAdmin.from("app_errors").select("id,source,status,message,created_at,user_id").gte("created_at", since).order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
    ]);
    if (profiles.error || usage.error || allowances.error) throw new Error("Administration unavailable");
    const emails = new Map((authUsers.data?.users ?? []).map((u) => [u.id, u.email ?? ""]));
    const limits = new Map((allowances.data ?? []).map((a) => [a.user_id, a.total_limit]));
    const now = Date.now(), day = 86400000;
    const done = (usage.data ?? []).filter((u) => u.status === "completed");
    const failed = (usage.data ?? []).filter((u) => u.status === "failed");
    const users = (profiles.data ?? []).map((p) => {
      const used = done.filter((u) => u.user_id === p.id).length;
      const limit = limits.get(p.id) ?? 2;
      return { id: p.id, name: p.display_name, email: emails.get(p.id) ?? "", createdAt: p.created_at, used, remaining: Math.max(0, limit - used), failed: failed.filter((u) => u.user_id === p.id).length };
    });
    return {
      stats: {
        users: users.length,
        today: done.filter((u) => now - Date.parse(u.created_at) < day).length,
        week: done.filter((u) => now - Date.parse(u.created_at) < 7 * day).length,
        total: done.length,
        failedWeek: failed.filter((u) => now - Date.parse(u.created_at) < 7 * day).length,
      },
      users,
      errors: (errors.data ?? []).map((e) => ({ ...e, email: e.user_id ? emails.get(e.user_id) ?? "" : "" })),
    };
  });
