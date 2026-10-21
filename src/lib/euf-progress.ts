import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CRITERES, REGLES, VALEUR_COTE, type Cote, type CritereId } from "@/data/euf";
import { useAuth } from "@/components/AuthProvider";
import { recordKey } from "./plans";
import type { Correction } from "./correction.functions";
import { listProgress, saveProgress, importProgress, deleteProgress } from "./progress.functions";

export interface Tentative {
  texte?: string;
  feedback?: { erreurs: { extrait: string; type: string; explication: string }[]; recommandations: string[] };
  id: string;
  date: string;
  sujetId: string;
  sujetEnonce: string;
  mots: number;
  secondes: number;
  erreurs: number;
  /** Cotes a/b/c/d/e des sous-critères 1 à 5. */
  cotes?: Record<string, Cote>;
  /** Nombre de fautes des sous-critères 6, 7 et 8. */
  fautes?: Record<string, number>;
  /** Ancien format (0..4). Conservé pour les tentatives déjà enregistrées. */
  scores: Record<string, number>;
  notes: string;
}

export interface Brouillon {
  notes?: string;
  cotes?: Record<string, Cote>;
  fautes?: Record<string, number>;
  correction?: Correction;
  evaluationId?: string;
  sujetId: string;
  texte: string;
  secondes: number;
  maj: string;
}

const EVENT = "euf-storage";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(EVENT));
}

export function compterMots(texte: string) {
  const t = texte.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

/** Équivalence en pourcentage d'une cote (pour les graphiques de progression). */
export const POURCENTAGE_COTE: Record<Cote, number> = { A: 90, B: 75, C: 62, D: 45, E: 25 };

function coteSousCritere(t: Tentative, id: string): Cote {
  const c = t.cotes?.[id];
  if (c) return c;
  const ancien = t.scores?.[id];
  if (typeof ancien === "number") return (["E", "D", "C", "B", "A"] as Cote[])[Math.max(0, Math.min(4, ancien))];
  return "E";
}

/** Cote globale des critères I et II : addition de la valeur des cotes. */
function coteParAddition(somme: number, nb: number): Cote {
  const max = nb * 4;
  const ratio = somme / max;
  if (ratio >= 0.9) return "A";
  if (ratio >= 0.75) return "B";
  if (ratio >= 0.55) return "C";
  if (ratio >= 0.3) return "D";
  return "E";
}

/**
 * Seuils du critère III : la tolérance officielle est de 1 faute par tranche
 * de 30 mots (30 fautes pour 900 mots) pour atteindre la cote C.
 */
export function seuilsFautes(mots: number) {
  const base = Math.max(1, Math.round((mots || REGLES.mots) / 30));
  return {
    A: Math.round(base * 0.4),
    B: Math.round(base * 0.7),
    C: base,
    D: Math.round(base * 1.4),
  };
}

export function coteFautes(totalFautes: number, mots: number): Cote {
  const s = seuilsFautes(mots);
  if (totalFautes <= s.A) return "A";
  if (totalFautes <= s.B) return "B";
  if (totalFautes <= s.C) return "C";
  if (totalFautes <= s.D) return "D";
  return "E";
}

export function totalFautes(t: Tentative) {
  if (t.fautes) return Object.values(t.fautes).reduce((a, b) => a + (b || 0), 0);
  return t.erreurs || 0;
}

/** Cote globale d'un critère selon la grille officielle du relevé des résultats. */
export function coteCritere(t: Tentative, critere: CritereId): Cote {
  if (critere === "langue") return coteFautes(totalFautes(t), t.mots);
  const def = CRITERES.find((c) => c.id === critere);
  if (!def) return "E";
  const somme = def.sousCriteres.reduce((a, sc) => a + VALEUR_COTE[coteSousCritere(t, sc.id)], 0);
  return coteParAddition(somme, def.sousCriteres.length);
}

/** Pourcentage indicatif d'un critère (0-100), dérivé de la cote officielle. */
export function noteCritere(t: Tentative, critere: CritereId): number {
  return POURCENTAGE_COTE[coteCritere(t, critere)];
}

const ORDRE: Cote[] = ["A", "B", "C", "D", "E"];
export function coteSuffisante(c: Cote) {
  return ORDRE.indexOf(c) <= ORDRE.indexOf("C");
}

export function resultat(t: Tentative) {
  const coteI = coteCritere(t, "argumentation");
  const coteII = coteCritere(t, "structure");
  const coteIII = coteCritere(t, "langue");
  const argumentation = POURCENTAGE_COTE[coteI];
  const structure = POURCENTAGE_COTE[coteII];
  const langue = POURCENTAGE_COTE[coteIII];
  const global = Math.round((argumentation + structure + langue) / 3);
  /** Moins de 600 mots : aucune cote, échec automatique. */
  const invalide = t.mots > 0 && t.mots < 600;
  const reussi =
    !invalide && coteSuffisante(coteI) && coteSuffisante(coteII) && coteSuffisante(coteIII);
  const longueurOk = t.mots >= REGLES.motsMin;
  return {
    coteI,
    coteII,
    coteIII,
    fautes: totalFautes(t),
    invalide,
    argumentation,
    structure,
    langue,
    global,
    reussi,
    verdict: reussi ? ("Réussite" as const) : ("Échec" as const),
    longueurOk,
  };
}


export function useTentatives() {
  const { user } = useAuth();
  const key = user ? recordKey("tentatives", user.id) : null;
  const queryClient = useQueryClient();
  const listFn = useServerFn(listProgress);
  const saveFn = useServerFn(saveProgress);
  const importFn = useServerFn(importProgress);
  const deleteFn = useServerFn(deleteProgress);
  const queryKey = ["progress", user?.id, "exam"];
  const query = useQuery({ queryKey, enabled: Boolean(user), queryFn: async () => {
    if (!key) return [];
    if (!read(`${key}.cloud-imported`, false)) {
      const records = read<Tentative[]>(key, []);
      for (let offset = 0; offset < records.length; offset += 100) {
        await importFn({ data: records.slice(offset, offset + 100).map(t => ({ kind: "exam" as const, id: t.id, payload: { ...t } })) });
      }
      try { write(`${key}.cloud-imported`, true); } catch { /* Cloud remains authoritative. */ }
    }
    return (await listFn({ data: { kind: "exam" } })).map(row => row.payload as unknown as Tentative)
      .sort((a, b) => b.date.localeCompare(a.date));
  } });
  const ajouter = useCallback(async (t: Tentative) => {
    if (!key) return;
    await saveFn({ data: { kind: "exam", id: t.id, payload: { ...t } } });
    await queryClient.invalidateQueries({ queryKey: ["progress", user?.id, "exam"] });
  }, [key, saveFn, queryClient, user?.id]);
  const supprimer = useCallback(async (id: string) => {
    if (!key) return;
    await deleteFn({ data: { kind: "exam", id } });
    try { write(key, read<Tentative[]>(key, []).filter(item => item.id !== id)); } catch { /* Cloud deletion succeeded. */ }
    await queryClient.invalidateQueries({ queryKey: ["progress", user?.id, "exam"] });
  }, [key, deleteFn, queryClient, user?.id]);
  const vider = useCallback(async () => {
    if (!key) return;
    await deleteFn({ data: { kind: "exam" } });
    try { write(key, []); } catch { /* Cloud deletion succeeded. */ }
    await queryClient.invalidateQueries({ queryKey: ["progress", user?.id, "exam"] });
  }, [key, deleteFn, queryClient, user?.id]);
  return { tentatives: user ? query.data ?? [] : [], ajouter, supprimer, vider, loading: query.isLoading, error: query.isError, retry: query.refetch };
}

export async function lireBrouillon(userId: string): Promise<Brouillon | null> {
  const key = recordKey("brouillon", userId);
  if (!read(`${key}.cloud-imported`, false)) {
    const local = read<Brouillon | null>(key, null);
    if (local) await importProgress({ data: [{ kind: "draft", id: "current", payload: { ...local } }] });
    try { write(`${key}.cloud-imported`, true); } catch { /* Nonessential migration marker. */ }
  }
  const rows = await listProgress({ data: { kind: "draft" } });
  return (rows.find(row => row.record_id === "current")?.payload as unknown as Brouillon) ?? null;
}

export async function ecrireBrouillon(b: Brouillon, userId: string) {
  await saveProgress({ data: { kind: "draft", id: "current", payload: { ...b } } });
  try { write(recordKey("brouillon", userId), b); } catch { /* Cloud save already succeeded. */ }
}

export async function effacerBrouillon(userId: string) {
  await deleteProgress({ data: { kind: "draft", id: "current" } });
  try { write(recordKey("brouillon", userId), null); } catch { /* Cloud deletion already succeeded. */ }
}

export function formatDuree(secondes: number) {
  const h = Math.floor(secondes / 3600);
  const m = Math.floor((secondes % 3600) / 60);
  const s = secondes % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
