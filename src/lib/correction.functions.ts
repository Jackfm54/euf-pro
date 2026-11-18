import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { setResponseStatus } from "@tanstack/react-start/server";
import { compterMotsTexte, contexteRegles, fusionnerListes } from "./correction-rules";

const coteSchema = z.enum(["A", "B", "C", "D", "E"]);

const justificationSchema = z.object({
  forces: z.string(),
  faiblesses: z.string(),
  conseil: z.string(),
});

export const correctionSchema = z.object({
  cotes: z.object({
    sujet: coteSchema,
    arguments: coteSchema,
    comprehension: coteSchema,
    intro: coteSchema,
    developpement: coteSchema,
  }),
  justifications: z.object({
    sujet: justificationSchema,
    arguments: justificationSchema,
    comprehension: justificationSchema,
    intro: justificationSchema,
    developpement: justificationSchema,
  }),
  fautes: z.object({
    vocabulaire: z.number().int(),
    syntaxe: z.number().int(),
    orthographe: z.number().int(),
  }),
  erreurs: z.array(
    z.object({
      extrait: z.string(),
      categorie: z.enum(["vocabulaire", "syntaxe", "orthographe"]),
      type: z.string(),
      explication: z.string(),
    }),
  ),
  pointsForts: z.array(z.string()),
  priorites: z.array(z.string()),
  recommandations: z.array(z.string()),
});

export type Correction = z.infer<typeof correctionSchema>;

const erreurIA = z.object({ extrait: z.string(), type: z.string(), explication: z.string() });

/** La IA rellena tres listas separadas (vocabulario primero) para que no omita ninguna categoría. */
const sortieIASchema = correctionSchema.omit({ erreurs: true, fautes: true }).extend({
  erreursVocabulaire: z.array(erreurIA),
  erreursSyntaxe: z.array(erreurIA),
  erreursOrthographe: z.array(erreurIA),
});

const sortieIAImageSchema = sortieIASchema.extend({ texteTranscrit: z.string() });

const correctionImageSchema = correctionSchema.extend({
  texteTranscrit: z.string(),
});

export type CorrectionImage = z.infer<typeof correctionImageSchema>;

const LANGUES: Record<string, string> = { es: "espagnol", fr: "français", ar: "arabe" };

const INSTRUCTIONS = `Tu es correcteur officiel de l'Épreuve uniforme de français (ÉUF) du Québec. Tu appliques la grille officielle de correction de la dissertation critique, avec rigueur et bienveillance, selon les qualités réelles du texte, sans indulgence ni sévérité excessive.

RAPPEL DE L'ÉPREUVE : 4 h 30 ; dissertation critique d'environ 900 mots ; l'élève répond à la question en prenant position (thèse) et la défend en s'appuyant sur les extraits fournis (tous les extraits doivent être exploités) et sur ses connaissances littéraires. Réussite = au moins C à chacun des trois critères. Moins de 600 mots = échec.

ÉCHELLE : A = très bien maîtrisé ; B = bien maîtrisé ; C = suffisant (seuil de réussite) ; D = insuffisant ; E = très insuffisant.

1. cotes (critère I – compréhension et qualité de l'argumentation ; critère II – structure) :
- sujet : la thèse répond clairement et explicitement à la question posée, sans la déformer ; la prise de position est maintenue jusqu'à la fin. Hors sujet ou sans prise de position = E.
- arguments : arguments pertinents, suffisants et développés ; chaque argument est appuyé par des citations exactes ou des exemples précis tirés des extraits, puis expliqué. Si un des extraits n'est pas exploité : au plus D. Aucune citation : au plus D.
- comprehension : compréhension juste des extraits (pas de contresens) et connaissances littéraires pertinentes (procédés, genre, courant, contexte).
- intro : introduction avec sujet amené, sujet posé (auteurs, œuvres, question) et sujet divisé ; conclusion avec synthèse et ouverture. Un élément manquant baisse la cote.
- developpement : paragraphes distincts et complets (idée principale, preuves, explication, mini-conclusion), transitions et organisateurs logiques, progression cohérente.
Ne te laisse pas influencer par la qualité de la langue pour les critères I et II.

2. erreurs (critère III – maîtrise de la langue) : relève CHAQUE faute réelle, sans en inventer, avec l'extrait fautif exact copié du texte (quelques mots), sa categorie :
- vocabulaire : impropriété, anglicisme, barbarisme, registre familier, répétition abusive ;
- syntaxe : construction de phrase, phrase incomplète, subordination, ponctuation ;
- orthographe : orthographe d'usage et grammaticale (accords, conjugaison, homophones).
SOIS TRÈS STRICT, comme un correcteur officiel exigeant : lis le texte phrase par phrase, mot par mot, et vérifie systématiquement :
- ponctuation : virgule manquante ou fautive (avant « mais », après un complément circonstanciel en tête de phrase, autour d'une incise, entre sujet et verbe interdite), point-virgule, deux-points, majuscule après un point, phrase non terminée ;
- citations : guillemets français « » absents ou mal fermés, citation mal intégrée à la phrase (syntaxe incompatible), crochets [ ] ou points de suspension […] manquants pour une modification ou une coupure, référence (auteur, extrait, ligne) absente, citation trop longue non justifiée ; ces fautes comptent en syntaxe ;
- syntaxe : accord sujet-verbe, phrases trop longues ou boiteuses, subordonnées sans principale, pronoms relatifs (dont, que, lequel), négation incomplète, concordance des temps, ruptures de construction ;
- orthographe : chaque accent, accord du participe passé, pluriel, homophones (a/à, ou/où, ces/ses, leur/leurs, quel/qu'elle), majuscules des titres d'œuvres et noms propres, traits d'union, élisions ;
- vocabulaire (catégorie à vérifier avec autant de soin que l'orthographe, ne la néglige jamais) : anglicismes (« réaliser » pour « se rendre compte », « supporter » pour « soutenir », « adresser un problème »), impropriétés (mot qui n'a pas le sens voulu), confusion de paronymes (« éminent/imminent », « conjecture/conjoncture »), pléonasmes (« monter en haut »), registre familier ou oral (« ça », « genre », « super », « plein de »), mots vagues ou passe-partout répétés (« chose », « faire », « il y a », « aspect »), répétition abusive d'un même mot dans des phrases proches, expressions figées déformées, mauvais connecteur logique (« donc » sans conséquence).

CLASSEMENT : une faute de sens ou de choix de mot va en vocabulaire, PAS en orthographe. L'orthographe ne concerne que la façon d'écrire un mot correct (lettres, accents, accords, conjugaison). Avant de répondre, relis tes erreurs et reclasse celles qui sont mal catégorisées. Une copie d'élève contient presque toujours des fautes de vocabulaire (répétitions, mots imprécis, registre familier) : si tu n'en trouves aucune, relis le texte une seconde fois uniquement pour le vocabulaire.
En cas de doute raisonnable, relève la faute. N'oublie aucune faute : une copie de 900 mots typique d'un élève de cégep contient souvent 15 à 40 fautes.
Une même faute d'orthographe d'usage répétée sur le même mot ne compte qu'une fois ; les autres fautes comptent à chaque occurrence. Ne compte pas les choix de style acceptables. Les citations des extraits ne sont pas corrigées.
Donne le type précis et une explication courte de la règle enfreinte. NE DONNE JAMAIS la correction ni la forme correcte : l'élève doit la trouver, comme à l'épreuve.
Remplis TROIS listes séparées : erreursVocabulaire (remplis-la EN PREMIER, après une lecture consacrée uniquement au vocabulaire ; une copie d'élève en contient presque toujours plusieurs), erreursSyntaxe (syntaxe, ponctuation, citations) et erreursOrthographe.

3. justifications : pour chacun des 5 sous-critères, forces (ce qui est réussi, avec un exemple du texte), faiblesses (ce qui fait perdre des points) et conseil (une action précise pour monter d'une cote).
4. pointsForts : 2 à 4 qualités réelles du texte.
5. priorites : les 3 actions qui feraient le plus progresser l'élève vers la réussite, de la plus importante à la moins importante.
6. recommandations : 4 à 8 conseils concrets de méthode (langue, argumentation, structure, gestion du temps), sans réécrire le texte à la place de l'élève.`;

const LANGUE_NOTE = (langue: string) =>
  `\n\nRédige "type", "explication", "justifications", "pointsForts", "priorites" et "recommandations" en ${langue}. "extrait" reste en français.`;

export const corrigerRedaction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ texte: z.string().max(20000), enonce: z.string().max(5000), extraits: z.string().max(20000), langue: z.enum(["es","fr","ar"]) }).parse(input))
  .handler(async ({ data, context }): Promise<{ correction: Correction | null; erreur: string | null; message?: string | null; evaluationId?: string }> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY manquante dans cet environnement");
      return { correction: null, erreur: "config" };
    }
    if (compterMotsTexte(data.texte) < 50) return { correction: null, erreur: "court" };

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
    // streamText oculta el error real de OpenAI tras "No output generated": lo guardamos aquí.
    let streamError: unknown = null;
    try {
      const result = streamText({
        onError: ({ error }) => { streamError = error; },
        model,
        instructions: `${INSTRUCTIONS}${LANGUE_NOTE(langue)}`,
        messages: [
          {
            role: "user",
            content: `${contexteRegles(compterMotsTexte(data.texte))}\n\nSUJET :\n${data.enonce}\n\nEXTRAITS :\n${data.extraits.slice(0, 20000)}\n\nDISSERTATION DE L'ÉLÈVE :\n${data.texte.slice(0, 20000)}`,
          },
        ],
        output: Output.object({ schema: sortieIASchema }),
        maxRetries: 0,
        providerOptions: { openai: openAIOptions() },
      });
      const correction = fusionnerListes(await result.output);
      const completion = await supabaseAdmin.rpc("mark_evaluation_ready", { _id: reservation.data, _user_id: context.userId });
      if (completion.error) {
        console.error("Enregistrement du résultat échoué", { message: completion.error.message });
        return { correction: null, erreur: "serveur" };
      }
      success = true;
      return { correction, erreur: null, evaluationId: reservation.data };
    } catch (caught) {
      const e = streamError ?? caught;
      const status = (e as { statusCode?: number }).statusCode;
      console.error("Correction IA échouée", { status, model: process.env.AI_MODEL ?? "gpt-4o-mini", message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) });
      await supabaseAdmin.from("app_errors").insert({ user_id: context.userId, source: "correction-texte", status: status ?? null, message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) }).then(() => undefined, () => undefined);
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
    // streamText oculta el error real de OpenAI tras "No output generated": lo guardamos aquí.
    let streamError: unknown = null;
    try {
      const result = streamText({
        onError: ({ error }) => { streamError = error; },
        model,
        instructions: `${INSTRUCTIONS}
La dissertation de l'élève est fournie en PHOTOS ou en PDF (texte manuscrit ou imprimé), une page par fichier, dans l'ordre. Lis chaque page avec le plus grand soin, ligne par ligne, avant de transcrire.
7. texteTranscrit : la transcription fidèle et complète du texte lu dans TOUTES les images, en français, sans le corriger, en respectant les paragraphes. Compte toi-même les mots transcrits et applique les règles de longueur (moins de 600 mots = échec ; environ 900 exigés). Si aucune image ne contient de dissertation lisible, réponds avec texteTranscrit vide.
${LANGUE_NOTE(langue)} "texteTranscrit" reste en français.`,
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
        output: Output.object({ schema: sortieIAImageSchema }),
        maxRetries: 0,
        providerOptions: { openai: openAIOptions() },
      });
      const correction = fusionnerListes(await result.output);
      if (!correction.texteTranscrit.trim()) return { correction: null, erreur: "illisible" };
      const completion = await supabaseAdmin.rpc("mark_evaluation_ready", { _id: reservation.data, _user_id: context.userId });
      if (completion.error) {
        console.error("Enregistrement du résultat échoué", { message: completion.error.message });
        return { correction: null, erreur: "serveur" };
      }
      success = true;
      return { correction, erreur: null, evaluationId: reservation.data };
    } catch (caught) {
      const e = streamError ?? caught;
      const status = (e as { statusCode?: number }).statusCode;
      console.error("Correction IA (image) échouée", { status, model: process.env.AI_MODEL ?? "gpt-4o-mini", message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) });
      await supabaseAdmin.from("app_errors").insert({ user_id: context.userId, source: "correction-image", status: status ?? null, message: e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300) }).then(() => undefined, () => undefined);
      if (status === 403) setResponseStatus(403);
      return { correction: null, erreur: evaluationErrorCode(e), message: evaluationErrorMessage(e) };
    } finally {
      if (!success) await supabaseAdmin.rpc("complete_evaluation", { _id: reservation.data, _user_id: context.userId, _success: false });
    }
  });
