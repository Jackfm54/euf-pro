// Reglas de la ÉUF usadas por la corrección automática (sin dependencias de servidor).

export type CategorieFaute = "vocabulaire" | "syntaxe" | "orthographe";

export function compterMotsTexte(texte: string): number {
  const t = texte.trim();
  return t ? t.split(/\s+/).length : 0;
}

/**
 * Recalcula el número de faltas a partir de la lista de errores, para que
 * el total coincida siempre con los errores mostrados al alumno.
 */
export function compterFautes(erreurs: { categorie: CategorieFaute }[]) {
  const fautes = { vocabulaire: 0, syntaxe: 0, orthographe: 0 };
  for (const e of erreurs) fautes[e.categorie] += 1;
  return fautes;
}

/** Tolerancia oficial: 1 falta por cada 30 palabras (30 faltas para 900 palabras). */
export function fautesPermises(mots: number): number {
  return Math.max(1, Math.round((mots || 900) / 30));
}

/** Contexto factual que se da a la IA para que aplique las reglas de la prueba. */
export function contexteRegles(mots: number): string {
  const lignes = [`NOMBRE DE MOTS (compté par le système) : ${mots}. Longueur exigée : environ 900 mots.`];
  if (mots < 600) lignes.push("ATTENTION : moins de 600 mots, la copie est en échec selon les règles de l'ÉUF ; évalue quand même pour aider l'élève, sans dépasser D aux critères I et II.");
  else if (mots < 800) lignes.push("ATTENTION : texte nettement plus court que les 900 mots exigés ; le développement est forcément incomplet, ne dépasse pas C en structure.");
  lignes.push(`Seuil de réussite en langue pour cette longueur : au plus ${fautesPermises(mots)} fautes.`);
  return lignes.join("\n");
}

export type ErreurIA = { extrait: string; type: string; explication: string };

/** Les trois listes que la IA doit remplir séparément (vocabulaire en premier). */
export type ListesErreurs = {
  erreursVocabulaire: ErreurIA[];
  erreursSyntaxe: ErreurIA[];
  erreursOrthographe: ErreurIA[];
};

/**
 * Réunit les trois listes remplissées par la IA en une seule liste d'erreurs
 * avec leur catégorie, puis recompte les fautes pour que le total corresponde
 * toujours aux erreurs affichées à l'élève.
 */
export function fusionnerListes<T extends ListesErreurs>(o: T) {
  const { erreursVocabulaire, erreursSyntaxe, erreursOrthographe, ...reste } = o;
  const erreurs = [
    ...erreursOrthographe.map((e) => ({ ...e, categorie: "orthographe" as const })),
    ...erreursSyntaxe.map((e) => ({ ...e, categorie: "syntaxe" as const })),
    ...erreursVocabulaire.map((e) => ({ ...e, categorie: "vocabulaire" as const })),
  ];
  return { ...reste, erreurs, fautes: compterFautes(erreurs) };
}
