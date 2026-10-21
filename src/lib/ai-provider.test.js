import { describe, expect, test } from "bun:test";
import { resolveAIModel, evaluationErrorCode, evaluationErrorMessage } from "./ai-provider.server";

describe("OpenAI evaluation model", () => {
  test("uses AI_MODEL with the gpt-4o-mini default", () => {
    expect(resolveAIModel()).toBe(process.env.AI_MODEL ?? "gpt-4o-mini");
  });
});

test("provider denials are not misrepresented as exhausted credits", () => {
  expect(evaluationErrorCode({ statusCode: 403 })).toBe("denied");
});

test("OpenAI quota exhaustion is not mistaken for rate limiting", () => {
  expect(evaluationErrorCode({ statusCode: 429, responseBody: JSON.stringify({ error: { type: "insufficient_quota", code: "credit_balance_exhausted" } }) })).toBe("credits");
  expect(evaluationErrorCode({ statusCode: 429 })).toBe("limite");
});

test("an invalid OpenAI key is reported as a configuration error", () => {
  expect(evaluationErrorCode({ statusCode: 401 })).toBe("config");
});

test("errors without a provider body still expose their message", () => {
  expect(evaluationErrorMessage(new Error("No output generated."))).toBe("No output generated.");
});
