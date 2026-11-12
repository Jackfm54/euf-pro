import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { FREE_EVALUATIONS } from "./plans";
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
    const [profile, roles, access] = await Promise.all([
      context.supabase.from("profiles").select("display_name").eq("id", context.userId).single(),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      context.supabase.rpc("get_evaluation_access"),
    ]);
    if (profile.error || roles.error || access.error) throw new Error("Account unavailable");
    const value = z.object({ remaining: z.number(), paid: z.boolean(), cancellable: z.boolean(), validUntil: z.string().nullable() }).passthrough().parse(access.data);
    return { displayName: profile.data.display_name, isAdmin: roles.data === true, ...value };
  });

export const getAdministration = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (error || data !== true) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { planFor, dailySeries } = await import("./admin-stats");
    const since = new Date(Date.now() - 30 * 86400000).toISOString();
    const [profiles, usage, allowances, errors, authUsers, reviews, ents] = await Promise.all([
      supabaseAdmin.from("profiles").select("id,display_name,created_at").order("created_at", { ascending: false }).limit(500),
      supabaseAdmin.from("evaluation_usage").select("user_id,status,created_at").limit(10000),
      supabaseAdmin.from("evaluation_allowances").select("user_id,total_limit"),
      supabaseAdmin.from("app_errors").select("id,source,status,message,created_at,user_id").gte("created_at", since).order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
      supabaseAdmin.from("professor_review_usage").select("user_id,status,source,created_at").limit(10000),
      supabaseAdmin.from("professor_entitlements").select("user_id,plan,status,valid_until,tier,period_start,updated_at"),
    ]);
    if (profiles.error || usage.error || allowances.error) throw new Error("Administration unavailable");
    const emails = new Map((authUsers.data?.users ?? []).map((u) => [u.id, u.email ?? ""]));
    const lastSeen = new Map((authUsers.data?.users ?? []).map((u) => [u.id, u.last_sign_in_at ?? null]));
    const limits = new Map((allowances.data ?? []).map((a) => [a.user_id, a.total_limit]));
    const entMap = new Map((ents.data ?? []).map((e) => [e.user_id, e]));
    const now = Date.now(), day = 86400000;
    const all = usage.data ?? [];
    const done = all.filter((u) => u.status === "completed");
    const failed = all.filter((u) => u.status === "failed");
    const rev = reviews.data ?? [];
    const revDone = rev.filter((r) => r.status === "completed");
    const revFailed = rev.filter((r) => r.status === "failed");
    const users = (profiles.data ?? []).map((p) => {
      const used = done.filter((u) => u.user_id === p.id).length;
      const limit = Math.min(FREE_EVALUATIONS, limits.get(p.id) ?? FREE_EVALUATIONS);
      const entitlement = entMap.get(p.id);
      const plan = planFor(entitlement, now);
      const periodStart = Date.parse(entitlement?.period_start ?? entitlement?.updated_at ?? "");
      const periodUsed = all.filter(u => u.user_id === p.id && ["completed", "pending"].includes(u.status) && Date.parse(u.created_at) >= periodStart).length
        + rev.filter(u => u.user_id === p.id && ["completed", "pending"].includes(u.status) && Date.parse(u.created_at) >= periodStart).length;
      const paidQuota = plan.tier === "etudiant" ? 30 : plan.tier === "sprint" ? 60 : plan.tier === "institution" ? limits.get(p.id) ?? 0 : entitlement?.tier === "basico" ? 8 : entitlement?.tier === "avanzado" ? 25 : entitlement?.tier === "premium" ? 70 : 0;
      return {
        id: p.id, name: p.display_name, email: emails.get(p.id) ?? "", createdAt: p.created_at, lastSeen: lastSeen.get(p.id) ?? null,
        used, remaining: Math.max(0, plan.tier === "gratis" ? limit - used : paidQuota - periodUsed), failed: failed.filter((u) => u.user_id === p.id).length,
        reviews: revDone.filter((r) => r.user_id === p.id).length,
        plan,
      };
    });
    const paying = users.filter((u) => u.plan.tier !== "gratis");
    const attempts = done.length + failed.length;
    return {
      stats: {
        users: users.length,
        today: done.filter((u) => now - Date.parse(u.created_at) < day).length,
        week: done.filter((u) => now - Date.parse(u.created_at) < 7 * day).length,
        total: done.length,
        failedWeek: failed.filter((u) => now - Date.parse(u.created_at) < 7 * day).length,
      },
      ai: {
        evaluations: done.length,
        failed: failed.length,
        successRate: attempts ? Math.round((done.length / attempts) * 100) : 100,
        textErrors: (errors.data ?? []).filter((e) => e.source === "correction-texte").length,
        imageErrors: (errors.data ?? []).filter((e) => e.source === "correction-image").length,
        reviews: revDone.length,
        reviewsFailed: revFailed.length,
        reviewsWeek: revDone.filter((r) => now - Date.parse(r.created_at) < 7 * day).length,
      },
      revenue: {
        paying: paying.length,
        free: users.length - paying.length,
        monthly: Math.round(paying.reduce((a, u) => a + u.plan.monthlyValue, 0) * 100) / 100,
      },
      series: dailySeries({ evals: all, reviews: rev, signups: profiles.data ?? [] }, 30, now),
      users,
      errors: (errors.data ?? []).map((e) => ({ ...e, email: e.user_id ? emails.get(e.user_id) ?? "" : "" })),
    };
  });

export const cancelStudentPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { error } = await context.supabase.rpc("cancel_student_plan");
    if (error) throw new Error("Cancellation unavailable");
    return { ok: true };
  });


// Suppression définitive du compte (obligatoire pour Apple/Google et Loi 25).
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ confirm: z.string().max(40) }).parse(input))
  .handler(async ({ data, context }) => {
    const { isDeleteConfirmed } = await import("./legal");
    if (!isDeleteConfirmed(data.confirm)) throw new Error("Confirmation required");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = context.userId;
    for (const table of ["progress_records", "evaluation_usage", "evaluation_allowances", "professor_review_usage", "professor_entitlements", "user_roles"] as const) {
      await supabaseAdmin.from(table).delete().eq("user_id", id);
    }
    await supabaseAdmin.from("app_errors").update({ user_id: null }).eq("user_id", id);
    await supabaseAdmin.from("profiles").delete().eq("id", id);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) throw new Error("Account deletion failed");
    return { ok: true };
  });
