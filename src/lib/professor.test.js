import { expect, test } from "bun:test";
import { FREE_PROFESSOR_REVIEWS, parseProfessorAccess, professorInputSchema, professorFeedbackSchema, professorDocumentContext } from "./professor";
import { deliverProfessorReview } from "./professor-delivery";

test("professor guidance requires a server-confirmed paid entitlement", () => {
  expect(parseProfessorAccess({ allowed: false, denial: null }).allowed).toBe(false);
  expect(parseProfessorAccess({ isAdmin: true, remaining: 2 }).allowed).toBe(false);
  expect(parseProfessorAccess({ allowed: "true" }).allowed).toBe(false);
  expect(parseProfessorAccess({ allowed: true, denial: null }).allowed).toBe(true);
});
test("provider access denial remains separate from paid permission", () => {
  expect(parseProfessorAccess({ allowed: true, denial: "Access blocked" }).denial).toBe("Access blocked");
});

test("Revisión has exactly one free consultations independent of exam usage", () => {
  expect(FREE_PROFESSOR_REVIEWS).toBe(1);
  expect(parseProfessorAccess({ allowed: true, remaining: 1 }).remaining).toBe(2);
  expect(parseProfessorAccess({ allowed: false, remaining: 0 }).allowed).toBe(false);
  expect(parseProfessorAccess({ remaining: 999 }).remaining).toBe(1);
});
test("failed AI reviews do not consume a consultation", async () => {
  let released = false; let saved = false;
  await expect(deliverProfessorReview(async () => { throw new Error("AI failed"); }, async () => { saved = true; }, async () => { released = true; })).rejects.toThrow("AI failed");
  expect(released).toBe(true); expect(saved).toBe(false);
});
test("failed saves release the consultation and never deliver an unsaved success", async () => {
  let released = false;
  await expect(deliverProfessorReview(async () => "feedback", async () => { throw new Error("save failed"); }, async () => { released = true; })).rejects.toThrow("save failed");
  expect(released).toBe(true);
});
test("successful guidance is durably saved before delivery", async () => {
  const events = [];
  const result = await deliverProfessorReview(async () => "feedback", async value => { events.push(value); }, async () => { events.push("released"); });
  expect(result).toBe("feedback"); expect(events).toEqual(["feedback"]);
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
