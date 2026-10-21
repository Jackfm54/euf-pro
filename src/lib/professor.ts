import { z } from "zod";

export type ProfessorAccess = { allowed: boolean; denial: string | null };
export function parseProfessorAccess(value: unknown): ProfessorAccess {
  if (!value || typeof value !== "object") return { allowed: false, denial: null };
  const access = value as Record<string, unknown>;
  return { allowed: access.allowed === true, denial: typeof access.denial === "string" ? access.denial : null };
}

export const professorFeedbackSchema = z.object({
  bilan: z.string(),
  pointsForts: z.array(z.string()),
  observations: z.array(z.object({ extrait: z.string(), domaine: z.string(), explication: z.string(), question: z.string() })),
  priorites: z.array(z.string()),
  exercice: z.string(),
});
export type ProfessorFeedback = z.infer<typeof professorFeedbackSchema>;
export const professorInputSchema = z.object({
  images: z.array(z.string().max(20_000_000).regex(/^data:(image\/(jpeg|png|webp)|application\/pdf);base64,[A-Za-z0-9+/]+={0,2}$/)).min(1).max(8),
  enonce: z.string().max(5000),
  extraits: z.string().max(20000),
  langue: z.enum(["es", "fr", "ar"]),
});
export type ProfessorInput = z.infer<typeof professorInputSchema>;

export function professorDocumentContext(input: Pick<ProfessorInput, "enonce" | "extraits">) {
  if (!input.enonce.trim() && !input.extraits.trim()) {
    return "DISSERTATION LIBRE : aucun sujet d'examen ni extrait officiel imposé. Analyse uniquement le travail fourni. N'invente aucun sujet ni texte source. Si le sujet ou les textes sources ne figurent pas dans le document, ne pénalise pas leur absence et indique les limites de vérification des citations et de la compréhension des sources.";
  }
  return `SUJET FOURNI :\n${input.enonce}\nTEXTES SOURCES FOURNIS :\n${input.extraits}`;
}