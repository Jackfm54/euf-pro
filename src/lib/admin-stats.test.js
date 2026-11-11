import { describe, expect, test } from "bun:test";
import { dailySeries, planFor } from "./admin-stats.ts";

const now = Date.parse("2026-11-10T12:00:00Z");
const future = "2026-12-31T00:00:00Z";

describe("plan de cada usuario en el panel", () => {
  test("sin acceso pagado es Gratis a 0", () => {
    expect(planFor(undefined, now)).toMatchObject({ tier: "gratis", price: 0 });
  });
  test("acceso vencido vuelve a Gratis", () => {
    expect(planFor({ user_id: "u", plan: "monthly", status: "active", valid_until: "2026-11-01T00:00:00Z", tier: "premium" }, now).tier).toBe("gratis");
  });
  test("Avanzado mensual vale 50", () => {
    expect(planFor({ user_id: "u", plan: "monthly", status: "active", valid_until: future, tier: "avanzado" }, now)).toMatchObject({ tier: "avanzado", price: 50, monthlyValue: 50 });
  });
  test("Premium anual vale 1000 (83.33 al mes)", () => {
    expect(planFor({ user_id: "u", plan: "annual", status: "active", valid_until: future, tier: "premium" }, now)).toMatchObject({ price: 1000, monthlyValue: 83.33 });
  });
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
