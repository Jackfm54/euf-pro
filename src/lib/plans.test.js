import { expect, test } from "bun:test";
import { FREE_EVALUATIONS, PLAN_TIERS, PAYMENTS_ENABLED, freeEvaluationsRemaining, recordKey } from "./plans";
test("each account receives exactly two free evaluations", () => {
  expect(FREE_EVALUATIONS).toBe(2);
  expect(freeEvaluationsRemaining(0)).toBe(2);
  expect(freeEvaluationsRemaining(1)).toBe(1);
  expect(freeEvaluationsRemaining(2)).toBe(0);
  expect(freeEvaluationsRemaining(3)).toBe(0);
});
test("the three tiers cost twenty, fifty and one hundred US dollars per month", () => {
  expect(PLAN_TIERS.map((tier) => tier.monthlyPrice)).toEqual([20, 50, 100]);
});
test("Larry's restored allowance gives three remaining attempts without resetting completed usage", () => {
  expect(freeEvaluationsRemaining(2, 5)).toBe(3);
  expect(freeEvaluationsRemaining(3, 5)).toBe(2);
  expect(freeEvaluationsRemaining(5, 5)).toBe(0);
  expect(freeEvaluationsRemaining(2)).toBe(0);
});
test("the annual price equals ten monthly payments for every tier", () => {
  for (const tier of PLAN_TIERS) {
    expect(tier.annualPrice).toBe(tier.monthlyPrice * 10);
  }
});
test("each tier includes monthly exam evaluations and professor consultations", () => {
  expect(PLAN_TIERS.map((tier) => tier.monthlyEvaluations)).toEqual([8, 25, 70]);
  expect(PLAN_TIERS.map((tier) => tier.monthlyProfessorConsultations)).toEqual([8, 25, 70]);
});
test("payments remain disabled until approved", () => {
  expect(PAYMENTS_ENABLED).toBe(false);
});
test("different accounts never share a local record key", () => {
  expect(recordKey("tentatives", "user-a")).not.toBe(recordKey("tentatives", "user-b"));
  expect(recordKey("brouillon", "user-a")).not.toBe(recordKey("tentatives", "user-a"));
});
