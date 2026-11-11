import { describe, expect, test } from "bun:test";
import { dailySeries, planFor } from "./admin-stats.ts";

const now = Date.parse("2026-11-10T12:00:00Z");
const future = "2026-12-31T00:00:00Z";

describe("plan de cada usuario en el panel", () => {
  test("sin acceso pagado es Gratis a 0", () => {
    expect(planFor(undefined, now)).toMatchObject({ tier: "gratis", price: 0 });
  });
  test("acceso vencido vuelve a Gratis", () => {
    expect(planFor({ user_id: "u", plan: "monthly", status: "active", valid_until: "2026-11-01T00:00:00Z", tier: "sprint" }, now).tier).toBe("gratis");
  });
  test("Étudiant monthly is 15 CAD", () => { expect(planFor({ user_id: "u", plan: "monthly", status: "active", valid_until: future, tier: "etudiant" }, now)).toMatchObject({ price: 15, monthlyValue: 15 }); });
  test("Sprint one-time is 24.99, not monthly revenue", () => { expect(planFor({ user_id: "u", plan: "one_time", status: "active", valid_until: future, tier: "sprint" }, now)).toMatchObject({ price: 24.99, monthlyValue: 0 }); });
  test("institution price is on request", () => { expect(planFor({ user_id: "u", plan: "custom", status: "active", valid_until: future, tier: "institution" }, now).price).toBe(null); });

});

test("la gráfica cuenta evaluaciones, fallas, revisiones y registros por día", () => {
  const s = dailySeries({
    evals: [{ created_at: "2026-11-10T08:00:00Z", status: "completed" }, { created_at: "2026-11-10T09:00:00Z", status: "failed" }, { created_at: "2026-01-01T00:00:00Z", status: "completed" }],
    reviews: [{ created_at: "2026-11-09T10:00:00Z", status: "completed" }],
    signups: [{ created_at: "2026-11-10T01:00:00Z" }],
  }, 30, now);
  expect(s).toHaveLength(30);
  expect(s[29]).toEqual({ date: "2026-11-10", evaluaciones: 1, fallas: 1, revisiones: 0, registros: 1 });
  expect(s[28].revisiones).toBe(1);
});
