export const FREE_EVALUATIONS = 2;
export const PAYMENTS_ENABLED = false;

export type PlanTier = {
  id: "basico" | "avanzado" | "premium";
  labelKey: string;
  monthlyPrice: number;
  annualPrice: number;
  monthlyEvaluations: number;
  monthlyProfessorConsultations: number;
};

export const PLAN_TIERS: readonly PlanTier[] = [
  {
    id: "basico",
    labelKey: "Básico",
    monthlyPrice: 20,
    annualPrice: 200,
    monthlyEvaluations: 8,
    monthlyProfessorConsultations: 8,
  },
  {
    id: "avanzado",
    labelKey: "Avanzado",
    monthlyPrice: 50,
    annualPrice: 500,
    monthlyEvaluations: 25,
    monthlyProfessorConsultations: 25,
  },
  {
    id: "premium",
    labelKey: "Premium",
    monthlyPrice: 100,
    annualPrice: 1000,
    monthlyEvaluations: 70,
    monthlyProfessorConsultations: 70,
  },
];

export function freeEvaluationsRemaining(completed: number, totalLimit = FREE_EVALUATIONS) {
  return Math.max(0, totalLimit - completed);
}
export function recordKey(kind: "tentatives" | "brouillon", userId?: string) {
  return userId ? `euf.${kind}.v1.account.${userId}` : `euf.${kind}.v1`;
}
