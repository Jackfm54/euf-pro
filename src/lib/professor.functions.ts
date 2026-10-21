import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseProfessorAccess, professorInputSchema } from "./professor";

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
    const access = await context.supabase.rpc("get_professor_access");
    if (access.error) return { feedback: null, error: "unavailable", message: null };
    const permission = parseProfessorAccess(access.data);
    if (!permission.allowed) { setResponseStatus(403); return { feedback: null, error: "paid_required", message: null }; }
    if (permission.denial) { setResponseStatus(403); return { feedback: null, error: "denied", message: permission.denial }; }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { feedback: null, error: "config", message: null };
    const { guideWithProfessor } = await import("./professor.server");
    const { evaluationErrorCode, evaluationErrorMessage } = await import("./ai-provider.server");
    try {
      const result = await guideWithProfessor(data, apiKey);
      return { feedback: result.feedback, error: null, message: null };
    } catch (error) {
      const code = evaluationErrorCode(error);
      const message = evaluationErrorMessage(error);
      if (code === "denied") {
        setResponseStatus(403);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("professor_entitlements").update({ ai_denial_reason: message ?? "AI access denied" }).eq("user_id", context.userId);
      }
      return { feedback: null, error: code, message };
    }
  });