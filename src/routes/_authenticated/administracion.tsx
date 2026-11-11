import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getAdministration } from "@/lib/account.functions";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";

const options = queryOptions({ queryKey: ["administration"], queryFn: () => getAdministration() });

export const Route = createFileRoute("/_authenticated/administracion")({
  loader: ({ context }) => context.queryClient.ensureQueryData(options),
  head: () => ({ meta: [{ title: "Administración | ÉUF" }, { name: "description", content: "Administración segura de las cuentas de ÉUF." }, { property: "og:title", content: "Administración ÉUF" }, { property: "og:description", content: "Acceso exclusivo para administradores autorizados." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  errorComponent: () => { const { t } = useLanguage(); return <AppShell><h1 className="text-2xl font-bold">{t("Acceso no autorizado")}</h1></AppShell>; },
  component: AdminPage,
});

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border p-4"><div className="text-sm text-muted-foreground">{label}</div><div className="mt-1 text-3xl font-bold">{value}</div></div>;
}

function AdminPage() {
  const { data } = useSuspenseQuery(options);
  const { t, locale } = useLanguage();
  const d = (v: string) => new Date(v).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" });
  return <AppShell>
    <h1 className="text-3xl font-bold">{t("Administración")}</h1>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
      <Stat label={t("Usuarios")} value={data.stats.users} />
      <Stat label={t("Evaluaciones hoy")} value={data.stats.today} />
      <Stat label={t("Evaluaciones 7 días")} value={data.stats.week} />
      <Stat label={t("Evaluaciones totales")} value={data.stats.total} />
      <Stat label={t("Fallas 7 días")} value={data.stats.failedWeek} />
    </div>
    <h2 className="mt-10 text-xl font-bold">{t("Usuarios")}</h2>
    <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b">
      <th className="py-3 text-start">{t("Nombre")}</th><th className="text-start">{t("Correo")}</th><th className="text-start">{t("Fecha")}</th><th className="text-end">{t("Usadas")}</th><th className="text-end">{t("Restantes")}</th><th className="text-end">{t("Fallidas")}</th>
    </tr></thead><tbody>{data.users.map((u) => <tr key={u.id} className="border-b">
      <td className="py-3">{u.name || "—"}</td><td dir="ltr" className="text-start">{u.email || "—"}</td><td>{new Date(u.createdAt).toLocaleDateString(locale)}</td><td className="text-end">{u.used}</td><td className="text-end">{u.remaining}</td><td className="text-end">{u.failed}</td>
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
