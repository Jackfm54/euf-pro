export const FREE_EVALUATIONS = 1;
export const PAYMENTS_ENABLED = false;
export const PLAN_CURRENCY = "CAD";
export const PLAN_TIERS = [
  { id: "gratuit", labelKey: "Gratis", price: 0, period: "free", corrections: 1, cancellable: false },
  { id: "etudiant", labelKey: "Étudiant", price: 15, period: "monthly", corrections: 30, cancellable: true },
  { id: "sprint", labelKey: "Sprint ÉUF", price: 24.99, period: "one_time", corrections: 60, days: 60, cancellable: false },
  { id: "institution", labelKey: "Cégep / Institution", price: null, period: "custom", corrections: null, cancellable: false },
] as const;
export function freeEvaluationsRemaining(completed: number, totalLimit = FREE_EVALUATIONS) {
  return Math.max(0, Math.min(FREE_EVALUATIONS, totalLimit) - completed);
}
export function recordKey(kind: "tentatives" | "brouillon", userId?: string) {
  return userId ? `euf.${kind}.v1.account.${userId}` : `euf.${kind}.v1`;
}
export function activeEntitlement(status: string, validUntil: string, now = Date.now()) {
  return ["active", "cancelled"].includes(status) && Number.isFinite(Date.parse(validUntil)) && Date.parse(validUntil) > now;
}
