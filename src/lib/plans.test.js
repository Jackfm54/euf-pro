import { expect, test } from "bun:test";
import { FREE_EVALUATIONS, PLAN_TIERS, PLAN_CURRENCY, PAYMENTS_ENABLED, freeEvaluationsRemaining, activeEntitlement, recordKey } from "./plans";
test("exactly one free essay evaluation per account", () => { expect(FREE_EVALUATIONS).toBe(1); expect(freeEvaluationsRemaining(0)).toBe(1); expect(freeEvaluationsRemaining(1)).toBe(0); expect(freeEvaluationsRemaining(2,5)).toBe(0); });
test("CAD prices are 0, 15 monthly, 24.99 one-time and on request", () => { expect(PLAN_CURRENCY).toBe("CAD"); expect(PLAN_TIERS.map(p=>p.price)).toEqual([0,15,24.99,null]); expect(PLAN_TIERS[1].period).toBe("monthly"); expect(PLAN_TIERS[2].period).toBe("one_time"); });
test("student subscription cancellable anytime", () => { expect(PLAN_TIERS[1].cancellable).toBe(true); expect(activeEntitlement("cancelled","2027-01-01",Date.parse("2026-11-11"))).toBe(true); expect(activeEntitlement("cancelled","2026-11-01",Date.parse("2026-11-11"))).toBe(false); });
test("sprint lasts 60 days without recurring billing", () => { expect(PLAN_TIERS[2].days).toBe(60); expect(PLAN_TIERS[2].cancellable).toBe(false); });
test("quotas remain 30 student and 60 sprint", () => { expect(PLAN_TIERS[1].corrections).toBe(30); expect(PLAN_TIERS[2].corrections).toBe(60); });
test("payments are not activated by this package",()=>expect(PAYMENTS_ENABLED).toBe(false));
test("accounts have separate record keys",()=>expect(recordKey("tentatives","a")).not.toBe(recordKey("tentatives","b")));
