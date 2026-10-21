import { describe, expect, test } from "bun:test";
import { fitsRequest, MAX_PDF_BYTES } from "./upload-compress.ts";
import { openAIOptions, supportsReasoning } from "./ai-provider.server.ts";

describe("límites de carga para Vercel", () => {
  test("PDF máximo de 3 MB", () => expect(MAX_PDF_BYTES).toBe(3 * 1024 * 1024));
  test("rechaza un envío total de más de 4 MB", () => expect(fitsRequest(["x".repeat(4_000_001)])).toBe(false));
  test("acepta ocho fotos reducidas de 400 KB", () => expect(fitsRequest(Array(8).fill("x".repeat(400_000)))).toBe(true));
});

describe("opciones de OpenAI según el modelo", () => {
  test("gpt-4o-mini no recibe razonamiento", () => expect(openAIOptions("gpt-4o-mini")).toEqual({ store: false }));
  test("gpt-5 sí recibe razonamiento", () => expect(supportsReasoning("gpt-5-mini")).toBe(true));
});
