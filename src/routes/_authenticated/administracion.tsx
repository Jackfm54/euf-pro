import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getAdministration } from "@/lib/account.functions";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const options = queryOptions({ queryKey: ["administration"], queryFn: () => getAdministration() });

export const Route = createFileRoute("/_authenticated/administracion")({
  loader: ({ context }) => context.queryClient.ensureQueryData(options),
  head: () => ({ meta: [{ title: "Administración | ÉUF" }, { name: "description", content: "Administración segura de las cuentas de ÉUF." }, { property: "og:title", content: "Administración ÉUF" }, { property: "og:description", content: "Acceso exclusivo para administradores autorizados." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  errorComponent: () => { const { t } = useLanguage(); return <AppShell><h1 className="text-2xl font-bold">{t("Acceso no autorizado")}</h1></AppShell>; },
  component: AdminPage,
});

function Stat({ label, value }: { label: string; value: number | string }) {
  return <div className="rounded-lg border p-4"><div className="text-sm text-muted-foreground">{label}</div><div className="mt-1 text-3xl font-bold">{value}</div></div>;
}

function AdminPage() {
  const { data } = useSuspenseQuery(options);
  const { t, locale } = useLanguage();
  const d = (v: string) => new Date(v).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" });
  const money = (v: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "CAD" }).format(v);
  const tierLabel: Record<string, string> = { gratis: "Gratis", etudiant: "Étudiant", sprint: "Sprint ÉUF", institution: "Cégep / Institution", legacy: "Plan anterior" };
  const series = data.series.map((s) => ({ ...s, dia: new Date(s.date + "T12:00:00Z").toLocaleDateString(locale, { day: "numeric", month: "short" }) }));
  return <AppShell>
    <h1 className="text-3xl font-bold">{t("Administración")}</h1>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
      <Stat label={t("Usuarios")} value={data.stats.users} />
      <Stat label={t("Evaluaciones hoy")} value={data.stats.today} />
      <Stat label={t("Evaluaciones 7 días")} value={data.stats.week} />
      <Stat label={t("Evaluaciones totales")} value={data.stats.total} />
      <Stat label={t("Fallas 7 días")} value={data.stats.failedWeek} />
    </div>

    <h2 className="mt-10 text-xl font-bold">{t("Uso de la aplicación (30 días)")}</h2>
    <div className="mt-3 h-72 rounded-lg border p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={series} margin={{ left: -20, right: 8, top: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dia" stroke="var(--muted-foreground)" fontSize={11} interval="preserveStartEnd" />
          <YAxis allowDecimals={false} stroke="var(--muted-foreground)" fontSize={11} />
          <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--popover-foreground)" }} />
          <Legend />
          <Bar dataKey="evaluaciones" name={t("Evaluaciones")} stackId="a" fill="var(--chart-1)" />
          <Bar dataKey="fallas" name={t("Fallas")} stackId="a" fill="var(--destructive)" />
          <Bar dataKey="revisiones" name={t("Revisiones")} fill="var(--chart-2)" />
          <Bar dataKey="registros" name={t("Registros")} fill="var(--chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <h2 className="mt-10 text-xl font-bold">{t("Inteligencia artificial y revisiones")}</h2>
    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat label={t("Evaluaciones con IA")} value={data.ai.evaluations} />
      <Stat label={t("Evaluaciones fallidas")} value={data.ai.failed} />
      <Stat label={t("Tasa de éxito")} value={`${data.ai.successRate} %`} />
      <Stat label={t("Fallas con fotos (30 días)")} value={data.ai.imageErrors} />
      <Stat label={t("Fallas con texto (30 días)")} value={data.ai.textErrors} />
      <Stat label={t("Revisiones del profesor")} value={data.ai.reviews} />
      <Stat label={t("Revisiones 7 días")} value={data.ai.reviewsWeek} />
      <Stat label={t("Revisiones fallidas")} value={data.ai.reviewsFailed} />
    </div>

    <h2 className="mt-10 text-xl font-bold">{t("Planes e ingresos")}</h2>
    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
      <Stat label={t("Usuarios de pago")} value={data.revenue.paying} />
      <Stat label={t("Usuarios gratis")} value={data.revenue.free} />
      <Stat label={t("Ingreso mensual estimado")} value={money(data.revenue.monthly)} />
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{t("Los pagos aún no están activos: los planes de pago se asignan a mano.")}</p>

    <h2 className="mt-10 text-xl font-bold">{t("Usuarios")}</h2>
    <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b">
      <th className="py-3 text-start">{t("Nombre")}</th><th className="text-start">{t("Correo")}</th><th className="text-start">{t("Plan")}</th><th className="text-end">{t("Valor")}</th><th className="text-start">{t("Fecha")}</th><th className="text-start">{t("Último acceso")}</th><th className="text-end">{t("Usadas")}</th><th className="text-end">{t("Restantes")}</th><th className="text-end">{t("Fallidas")}</th><th className="text-end">{t("Revisiones")}</th>
    </tr></thead><tbody>{data.users.map((u) => <tr key={u.id} className="border-b">
      <td className="py-3">{u.name || "—"}</td><td dir="ltr" className="text-start">{u.email || "—"}</td>
      <td className="whitespace-nowrap">{t(tierLabel[u.plan.tier])}{u.plan.period ? ` · ${t(u.plan.period === "monthly" ? "Mensual" : u.plan.period === "one_time" ? "Pago único · 60 días" : "A convenir")}` : ""}</td>
      <td className="text-end whitespace-nowrap">{u.plan.price === null ? t("A convenir") : money(u.plan.price)}</td>
      <td>{new Date(u.createdAt).toLocaleDateString(locale)}</td><td>{u.lastSeen ? d(u.lastSeen) : "—"}</td>
      <td className="text-end">{u.used}</td><td className="text-end">{u.remaining}</td><td className="text-end">{u.failed}</td><td className="text-end">{u.reviews}</td>
    </tr>)}</tbody></table></div>

    <h2 className="mt-10 text-xl font-bold">{t("Fallas recientes (30 días)")}</h2>
    {data.errors.length === 0 ? <p className="mt-3 text-muted-foreground">{t("Sin fallas registradas.")}</p> :
    <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b">
      <th className="py-3 text-start">{t("Fecha")}</th><th className="text-start">{t("Correo")}</th><th className="text-start">{t("Tipo")}</th><th className="text-start">{t("Detalle")}</th>
    </tr></thead><tbody>{data.errors.map((e) => <tr key={e.id} className="border-b align-top">
      <td className="py-3 whitespace-nowrap">{d(e.created_at)}</td><td dir="ltr" className="text-start">{e.email || "—"}</td><td>{e.source}{e.status ? ` (${e.status})` : ""}</td><td dir="ltr" className="text-start break-words">{e.message}</td>
    </tr>)}</tbody></table></div>}
  </AppShell>;
}
