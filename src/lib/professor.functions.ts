import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseProfessorAccess, professorInputSchema } from "./professor";
import { deliverProfessorReview } from "./professor-delivery";

export const getProfessorAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("get_professor_access");
    if (error) throw new Error("Professor access unavailable");
    return parseProfessorAccess(data);
  });

export const reviewWithProfessor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => professorInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { feedback: null, error: "config", message: null };
    const reservation = await context.supabase.rpc("reserve_professor_review");
    if (reservation.error || !reservation.data) {
      const reason = reservation.error?.message ?? "";
      return { feedback: null, error: reason.includes("paid_required") ? "paid_required" : reason.includes("review_busy") ? "review_busy" : reason.includes("denied") ? "denied" : "unavailable", message: null };
    }
    const id = reservation.data;
    const { guideWithProfessor } = await import("./professor.server");
    const { evaluationErrorCode, evaluationErrorMessage } = await import("./ai-provider.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let saved: { feedback: import("./professor").ProfessorFeedback; language: string; date: string } | undefined;
    let saving = false;
    try {
      const result = await deliverProfessorReview(
        () => guideWithProfessor(data, apiKey),
        async result => {
          saving = true;
          saved = { feedback: result.feedback, language: data.langue, date: new Date().toISOString() };
          const completion = await supabaseAdmin.rpc("finish_professor_review", { _id: id, _user_id: context.userId, _payload: saved });
          if (completion.error) throw new Error("Professor save failed");
        },
        async () => { await supabaseAdmin.rpc("finish_professor_review", { _id: id, _user_id: context.userId }); },
      );
      return { feedback: result.feedback, id, saved, error: null, message: null };
    } catch (error) {
      const code = saving ? "save_failed" : evaluationErrorCode(error);
      const message = evaluationErrorMessage(error);
      if (code === "denied") {
        setResponseStatus(403);
        await supabaseAdmin.from("professor_entitlements").update({ ai_denial_reason: message ?? "AI access denied" }).eq("user_id", context.userId);
      }
      return { feedback: null, error: code, message };
    }
  });