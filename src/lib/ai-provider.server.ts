import { createOpenAI } from "@ai-sdk/openai";

export function resolveAIModel() {
  return process.env.AI_MODEL ?? "gpt-4o-mini";
}

export function createEvaluationModel(apiKey: string) {
  const provider = createOpenAI({ apiKey });
  return { model: provider.responses(resolveAIModel()) };
}

export function evaluationErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  try {
    const body = JSON.parse((error as { responseBody?: string }).responseBody ?? "{}");
    const message = body.message ?? body.error?.message;
    return typeof message === "string" ? message : null;
  } catch { return null; }
}

export function evaluationErrorCode(error: unknown): string {
  if (!error || typeof error !== "object") return "inconnu";
  const failure = error as { statusCode?: number; responseBody?: string };
  let quota = false;
  try {
    const body = JSON.parse(failure.responseBody ?? "{}");
    quota = body.error?.type === "insufficient_quota" ||
      ["insufficient_quota", "credit_balance_exhausted"].includes(body.error?.code);
  } catch {
    // Unstructured provider failures keep the generic error classification.
  }
  if (failure.statusCode === 403) return "denied";
  if (quota || failure.statusCode === 402) return "credits";
  if (failure.statusCode === 429) return "limite";
  if (failure.statusCode === 401) return "config";
  return "inconnu";
}
