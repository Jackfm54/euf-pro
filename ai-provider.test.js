import { describe, expect, test } from "bun:test";
import {
  resolveAIModel,
  supportsReasoning,
  openAIOptions,
  evaluationErrorCode,
  evaluationErrorMessage,
} from "./ai-provider.server";

describe("OpenAI evaluation model", () => {
  test("falls back to gpt-4o-mini when AI_MODEL is absent", () => {
    const saved = process.env.AI_MODEL;
    delete process.env.AI_MODEL;
    expect(resolveAIModel()).toBe("gpt-4o-mini");
    if (saved !== undefined) process.env.AI_MODEL = saved;
  });

  test("reads AI_MODEL and normalizes a readable name to an id", () => {
    process.env.AI_MODEL = "GPT-6.2 Astra";
    expect(resolveAIModel()).toBe("gpt-6.2-astra");
    delete process.env.AI_MODEL;
  });
});

describe("reasoning-capable models", () => {
  test("gpt-6 family gets the strict reasoning options", () => {
    expect(supportsReasoning("gpt-6-astra")).toBe(true);
    expect(supportsReasoning("gpt-6.2-sol")).toBe(true);
    expect(supportsReasoning("openai/gpt-6-astra")).toBe(true);
    expect(openAIOptions("gpt-6.2-astra").reasoningEffort).toBe("high");
  });

  test("gpt-4o and gpt-4.1 are not sent reasoning options", () => {
    expect(supportsReasoning("gpt-4o-mini")).toBe(false);
    expect(supportsReasoning("gpt-4.1")).toBe(false);
    expect(openAIOptions("gpt-4o-mini").reasoningEffort).toBeUndefined();
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
