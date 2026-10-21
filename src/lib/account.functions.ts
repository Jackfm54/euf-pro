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
    const profiles = await supabaseAdmin.from("profiles").select("id,display_name,created_at").order("created_at", { ascending: false }).limit(100);
    if (profiles.error) throw new Error("Administration unavailable");
    return profiles.data;
  });