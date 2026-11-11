import { PLAN_TIERS, type PlanTier } from "./plans";

export type Entitlement = { user_id: string; plan: string; status: string; valid_until: string; tier: string | null };

/** Plan visible para el administrador: gratis salvo acceso pagado activo y vigente. */
export function planFor(ent: Entitlement | undefined, now = Date.now()) {
  if (!ent || ent.status !== "active" || Date.parse(ent.valid_until) <= now) {
    return { tier: "gratis" as const, period: null, price: 0, monthlyValue: 0, validUntil: ent?.valid_until ?? null };
  }
  const tier: PlanTier = PLAN_TIERS.find((p) => p.id === ent.tier) ?? PLAN_TIERS[0];
  const annual = ent.plan === "annual";
  const price = annual ? tier.annualPrice : tier.monthlyPrice;
  return { tier: tier.id, period: annual ? ("annual" as const) : ("monthly" as const), price, monthlyValue: annual ? Math.round((price / 12) * 100) / 100 : price, validUntil: ent.valid_until };
}

/** Serie diaria de los últimos `days` días (UTC) para la gráfica de uso. */
export function dailySeries(
  rows: { evals: { created_at: string; status: string }[]; reviews: { created_at: string; status: string }[]; signups: { created_at: string }[] },
  days = 30,
  now = Date.now(),
) {
  const start = new Date(now); start.setUTCHours(0, 0, 0, 0); start.setUTCDate(start.getUTCDate() - (days - 1));
  const out = Array.from({ length: days }, (_, i) => {
    const d = new Date(start); d.setUTCDate(d.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10), evaluaciones: 0, fallas: 0, revisiones: 0, registros: 0 };
  });
  const idx = new Map(out.map((o, i) => [o.date, i]));
  const at = (iso: string) => idx.get(iso.slice(0, 10));
  for (const e of rows.evals) { const i = at(e.created_at); if (i === undefined) continue; if (e.status === "completed") out[i].evaluaciones++; else if (e.status === "failed") out[i].fallas++; }
  for (const r of rows.reviews) { const i = at(r.created_at); if (i !== undefined && r.status === "completed") out[i].revisiones++; }
  for (const s of rows.signups) { const i = at(s.created_at); if (i !== undefined) out[i].registros++; }
  return out;
}
