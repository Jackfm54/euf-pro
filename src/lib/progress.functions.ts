import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";

export const progressKind = z.enum(["exam", "draft", "professor"]);
const recordSchema = z.object({
  kind: progressKind,
  id: z.string().min(1).max(200),
  payload: z.record(z.unknown()).refine(value => JSON.stringify(value).length <= 250000, "Record too large"),
});

export const listProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ kind: progressKind }).parse(input))
  .handler(async ({ data, context }) => {
    const result = await context.supabase.from("progress_records").select("record_id,payload,updated_at")
      .eq("user_id", context.userId).eq("kind", data.kind).order("updated_at", { ascending: false });
    if (result.error) throw new Error("Progress unavailable");
    return result.data;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => recordSchema.parse(input))
  .handler(async ({ data, context }) => {
    const result = await context.supabase.from("progress_records").upsert({
      user_id: context.userId, kind: data.kind, record_id: data.id,
      payload: data.payload as Json, updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,kind,record_id" });
    if (result.error) throw new Error("Progress save failed");
    return { ok: true };
  });

export const importProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.array(recordSchema).max(100).parse(input))
  .handler(async ({ data, context }) => {
    if (!data.length) return { ok: true };
    const result = await context.supabase.from("progress_records").upsert(data.map(record => ({
      user_id: context.userId, kind: record.kind, record_id: record.id, payload: record.payload as Json,
    })), { onConflict: "user_id,kind,record_id", ignoreDuplicates: true });
    if (result.error) throw new Error("Progress import failed");
    return { ok: true };
  });

export const deleteProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ kind: progressKind, id: z.string().min(1).max(200).optional() }).parse(input))
  .handler(async ({ data, context }) => {
    let query = context.supabase.from("progress_records").delete().eq("user_id", context.userId).eq("kind", data.kind);
    if (data.id) query = query.eq("record_id", data.id);
    const result = await query;
    if (result.error) throw new Error("Progress deletion failed");
    return { ok: true };
  });