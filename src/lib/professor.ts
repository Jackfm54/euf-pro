import { z } from "zod";
import { fusionnerListes } from "./correction-rules";

export const FREE_PROFESSOR_REVIEWS = 0;
export type ProfessorAccess = { allowed: boolean; denial: string | null; remaining: number; paid: boolean; busy: boolean };
export function parseProfessorAccess(value: unknown): ProfessorAccess {
  const access = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return { allowed: access.allowed === true && access.paid === true, denial: typeof access.denial === "string" ? access.denial : null,
    remaining: typeof access.remaining === "number" ? access.paid === true ? Math.max(0, access.remaining) : 0 : 0,
    paid: access.paid === true, busy: access.busy === true };
}

const critereAnalyseSchema = z.object({
  forces: z.string(),
  faiblesses: z.string(),
  conseil: z.string(),
});

const analyseCriteresSchema = z.object({
  sujet: critereAnalyseSchema,
  arguments: critereAnalyseSchema,
  comprehension: critereAnalyseSchema,
  intro: critereAnalyseSchema,
  developpement: critereAnalyseSchema,
});

const erreurIA = z.object({
  extrait: z.string(),
  type: z.string(),
  explication: z.string(),
});

const erreurLangueSchema = erreurIA.extend({
  categorie: z.enum(["vocabulaire", "syntaxe", "orthographe"]),
});

const fautesSchema = z.object({
  vocabulaire: z.number().int(),
  syntaxe: z.number().int(),
  orthographe: z.number().int(),
});

const observationSchema = z.object({
  extrait: z.string(),
  domaine: z.string(),
  explication: z.string(),
  question: z.string(),
});

export const professorFeedbackSchema = z.object({
  bilan: z.string(),
  pointsForts: z.array(z.string()),
  analyseCriteres: analyseCriteresSchema.optional(),
  fautes: fautesSchema.optional(),
  erreurs: z.array(erreurLangueSchema).optional(),
  observations: z.array(observationSchema),
  priorites: z.array(z.string()),
  exercice: z.string(),
});
export type ProfessorFeedback = z.infer<typeof professorFeedbackSchema>;

/** La IA rellena tres listas de lengua separadas (vocabulario primero) para no omitir ninguna categoría. */
export const professorAIOutputSchema = z.object({
  bilan: z.string(),
  pointsForts: z.array(z.string()),
  analyseCriteres: analyseCriteresSchema,
  erreursVocabulaire: z.array(erreurIA),
  erreursSyntaxe: z.array(erreurIA),
  erreursOrthographe: z.array(erreurIA),
  observations: z.array(observationSchema),
  priorites: z.array(z.string()),
  exercice: z.string(),
});
export type ProfessorAIOutput = z.infer<typeof professorAIOutputSchema>;

export function normaliserFeedbackProfesseur(raw: ProfessorAIOutput): ProfessorFeedback {
  return professorFeedbackSchema.parse(fusionnerListes(raw));
}

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
