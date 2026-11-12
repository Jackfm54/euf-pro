// Constantes légales partagées (web et mobile).
export const LEGAL_VERSION = "2026-11-12";
export const PRIVACY_CONTACT = "jack.fm.54@hotmail.com"; // À remplacer par l'adresse officielle du responsable.
export const DELETE_CONFIRMATION_WORD = "SUPPRIMER";
export function isDeleteConfirmed(value: string) {
  return value.trim().toUpperCase() === DELETE_CONFIRMATION_WORD;
}
export const DEFAULT_LANGUAGE = "fr" as const;
