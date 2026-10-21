import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { setResponseStatus } from "@tanstack/react-start/server";

const coteSchema = z.enum(["A", "B", "C", "D", "E"]);

export const correctionSchema = z.object({
  cotes: z.object({
    sujet: coteSchema,
    arguments: coteSchema,
    comprehension: coteSchema,
    intro: coteSchema,
    developpement: coteSchema,
  }),
  fautes: z.object({
    vocabulaire: z.number().int(),
    syntaxe: z.number().int(),
    orthographe: z.number().int(),
  }),
  erreurs: z.array(
    z.object({ extrait: z.string(), type: z.string(), explication: z.string() }),
  ),
  recommandations: z.array(z.string()),
});

export type Correction = z.infer<typeof correctionSchema>;

const correctionImageSchema = correctionSchema.extend({
  texteTranscrit: z.string(),
});

export type CorrectionImage = z.infer<typeof correctionImageSchema>;

const LANGUES: Record<string, string> = { es: "espagnol", fr: "français", ar: "arabe" };

const INSTRUCTIONS = `Tu es correcteur officiel de l'Épreuve uniforme de français (ÉUF) du Québec. Évalue la dissertation critique avec rigueur, selon ses qualités réelles.

1. cotes (A excellent … C seuil de réussite … E très faible) :
- sujet : respect du sujet, thèse claire qui répond à la question.
- arguments : arguments pertinents, appuyés de citations et exemples précis des extraits.
- comprehension : compréhension des textes et connaissances littéraires (procédés, contexte, courants).
- intro : introduction (sujet amené, posé, divisé) et conclusion (synthèse, ouverture).
- developpement : paragraphes structurés, transitions, organisateurs.
Un texte très court, hors sujet ou sans citations ne peut dépasser D en argumentation et structure.
2. fautes : nombre total de fautes réelles par catégorie (vocabulaire ; syntaxe et ponctuation ; orthographe d'usage et grammaticale). Une faute identique répétée ne compte qu'une fois.
3. erreurs : chaque faute avec l'extrait fautif exact, le type et une courte explication de la règle enfreinte. NE DONNE JAMAIS la correction ni la forme correcte : l'élève doit la trouver lui-même, comme à l'épreuve réelle.
4. recommandations : 4 à 8 conseils concrets (langue, argumentation, structure), sans corriger le texte à la place de l'élève.`;

export const corrigerRedaction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ texte: z.string().max(20000), enonce: z.string().max(5000), extraits: z.string().max(20000), langue: z.enum(["es","fr","ar"]) }).parse(input))
  .handler(async ({ data, context }): Promise<{ correction: Correction | null; erreur: string | null; message?: string | null; evaluationId?: string }> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY manquante dans cet environnement");
      return { correction: null, erreur: "config" };
    }
    if (data.texte.trim().split(/\s+/).length < 50) return { correction: null, erreur: "court" };

    const { createEvaluationModel, evaluationErrorCode, evaluationErrorMessage, openAIOptions } = await import("./ai-provider.server");
    const { streamText, Output } = await import("ai");
    const model = createEvaluationModel(apiKey).model;
    const langue = LANGUES[data.langue?.split(/[-_]/)[0]] ?? "espagnol";

    const reservation = await context.supabase.rpc("reserve_evaluation");
    if (reservation.error || !reservation.data) {
      if (!/plan_required|evaluation_busy/.test(reservation.error?.message ?? "")) console.error("Réservation échouée", { message: reservation.error?.message ?? "sans identifiant" });
      return { correction: null, erreur: reservation.error?.message.includes("plan_required") ? "plan_required" : reservation.error?.message.includes("evaluation_busy") ? "evaluation_busy" : "reservation" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let success = false;
    try {
      const result = streamText({
        model,
        instructions: `${INSTRUCTIONS}\n\nRédige "type", "explication" et "recommandations" en ${langue}. "extrait" reste en français.`,
        messages: [
          {
            role: "user",
            content: `SUJET :\n${data.enonce}\n\nEXTRAITS :\n${data.extraits.slice(0, 20000)}\n\nDISSERTATION DE L'ÉLÈVE :\n${data.texte.slice(0, 20000)}`,
          },
        ],
        output: Output.object({ schema: correctionSchema }),
        maxRetries: 0,
        providerOptions: { openai: openAIOptions() },
      });
      const correction = await result.output;
      const completion = await supabaseAdmin.rpc("mark_evaluation_ready", { _id: reservation.data, _user_id: context.userId });
      if (completion.error) {
        console.error("Enregistrement du résultat échoué", { message: completion.error.message });
        return { correction: null, erreur: "serveur" };
      }
      success = true;
      return { correction, erreur: null, evaluationId: reservation.data };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("Correction IA échouée", { status, model: process.env.AI_MODEL ?? "gpt-4o-mini", message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) });
      if (status === 403) setResponseStatus(403);
      return { correction: null, erreur: evaluationErrorCode(e), message: evaluationErrorMessage(e) };
    } finally {
      if (!success) await supabaseAdmin.rpc("complete_evaluation", { _id: reservation.data, _user_id: context.userId, _success: false });
    }
  });

export const corrigerRedactionImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ images: z.array(z.string().max(20000000)).min(1).max(8), enonce: z.string().max(5000), extraits: z.string().max(20000), langue: z.enum(["es","fr","ar"]) }).parse(input))
  .handler(async ({ data, context }): Promise<{ correction: CorrectionImage | null; erreur: string | null; message?: string | null; evaluationId?: string }> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY manquante dans cet environnement");
      return { correction: null, erreur: "config" };
    }
    const images = (data.images ?? []).slice(0, 8);
    if (images.length === 0) return { correction: null, erreur: "image" };
    for (const img of images) {
      if (!img.startsWith("data:image/") && !img.startsWith("data:application/pdf"))
        return { correction: null, erreur: "image" };
      if (img.length > 20_000_000) return { correction: null, erreur: "grande" };
    }

    const { createEvaluationModel, evaluationErrorCode, evaluationErrorMessage, openAIOptions } = await import("./ai-provider.server");
    const { streamText, Output } = await import("ai");
    const model = createEvaluationModel(apiKey).model;
    const langue = LANGUES[data.langue?.split(/[-_]/)[0]] ?? "espagnol";

    const reservation = await context.supabase.rpc("reserve_evaluation");
    if (reservation.error || !reservation.data) {
      if (!/plan_required|evaluation_busy/.test(reservation.error?.message ?? "")) console.error("Réservation échouée", { message: reservation.error?.message ?? "sans identifiant" });
      return { correction: null, erreur: reservation.error?.message.includes("plan_required") ? "plan_required" : reservation.error?.message.includes("evaluation_busy") ? "evaluation_busy" : "reservation" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let success = false;
    try {
      const result = streamText({
        model,
        instructions: `${INSTRUCTIONS}
La dissertation de l'élève est fournie en PHOTOS ou en PDF (texte manuscrit ou imprimé), une page par fichier, dans l'ordre. Lis chaque page avec le plus grand soin, ligne par ligne, avant de transcrire.
6. texteTranscrit : la transcription fidèle et complète du texte lu dans TOUTES les images, en français, sans le corriger, en respectant les paragraphes. Si aucune image ne contient de dissertation lisible, réponds avec texteTranscrit vide.

Rédige "type", "explication" et "recommandations" en ${langue}. "extrait" et "texteTranscrit" restent en français.`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text" as const,
                text: `SUJET :\n${data.enonce}\n\nEXTRAITS :\n${data.extraits.slice(0, 20000)}\n\nFICHIERS DE LA DISSERTATION DE L'ÉLÈVE (${images.length} page(s), dans l'ordre) :`,
              },
              ...images.map((img, i) =>
                img.startsWith("data:application/pdf")
                  ? {
                      type: "file" as const,
                      filename: `page-${i + 1}.pdf`,
                      data: img.split(",")[1] ?? img,
                      mediaType: "application/pdf" as const,
                    }
                  : { type: "image" as const, image: img },
              ),
            ],
          },
        ],
        output: Output.object({ schema: correctionImageSchema }),
        maxRetries: 0,
        providerOptions: { openai: openAIOptions() },
      });
      const correction = await result.output;
      if (!correction.texteTranscrit.trim()) return { correction: null, erreur: "illisible" };
      const completion = await supabaseAdmin.rpc("mark_evaluation_ready", { _id: reservation.data, _user_id: context.userId });
      if (completion.error) {
        console.error("Enregistrement du résultat échoué", { message: completion.error.message });
        return { correction: null, erreur: "serveur" };
      }
      success = true;
      return { correction, erreur: null, evaluationId: reservation.data };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("Correction IA (image) échouée", { status, model: process.env.AI_MODEL ?? "gpt-4o-mini", message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) });
      if (status === 403) setResponseStatus(403);
      return { correction: null, erreur: evaluationErrorCode(e), message: evaluationErrorMessage(e) };
    } finally {
      if (!success) await supabaseAdmin.rpc("complete_evaluation", { _id: reservation.data, _user_id: context.userId, _success: false });
    }
  });
