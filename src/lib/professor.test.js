import { expect, test } from "bun:test";
import { parseProfessorAccess, professorInputSchema, professorFeedbackSchema, professorDocumentContext } from "./professor";

test("professor guidance requires a server-confirmed paid entitlement", () => {
  expect(parseProfessorAccess({ allowed: false, denial: null }).allowed).toBe(false);
  expect(parseProfessorAccess({ isAdmin: true, remaining: 2 }).allowed).toBe(false);
  expect(parseProfessorAccess({ allowed: "true" }).allowed).toBe(false);
  expect(parseProfessorAccess({ allowed: true, denial: null }).allowed).toBe(true);
});
test("provider access denial remains separate from paid permission", () => {
  expect(parseProfessorAccess({ allowed: true, denial: "Access blocked" })).toEqual({ allowed: true, denial: "Access blocked" });
});
test("professor accepts photos and PDFs but not arbitrary documents", () => {
  const input = { images: ["data:image/png;base64,YQ==", "data:application/pdf;base64,YQ=="], enonce: "Sujet", extraits: "", langue: "es" };
  expect(professorInputSchema.safeParse(input).success).toBe(true);
  expect(professorInputSchema.safeParse({ ...input, images: ["data:text/html;base64,YQ=="] }).success).toBe(false);
});
test("professor output cannot introduce exam grades or corrected text", () => {
  const result = professorFeedbackSchema.parse({ bilan: "Bilan", pointsForts: [], observations: [], priorites: [], exercice: "Exercice", cotes: { sujet: "A" }, texteCorrige: "Rewritten" });
  expect(result).not.toHaveProperty("cotes");
  expect(result).not.toHaveProperty("texteCorrige");
});

test("independent dissertation review does not impose an exam subject or its two texts", () => {
  const context = professorDocumentContext({ enonce: "", extraits: "" });
  expect(context).toContain("aucun sujet d'examen ni extrait officiel imposé");
  expect(context).not.toContain("SUJET FOURNI");
  expect(professorInputSchema.safeParse({ images: ["data:application/pdf;base64,YQ=="], enonce: "", extraits: "", langue: "es" }).success).toBe(true);
});