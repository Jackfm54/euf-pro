import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, GraduationCap, LockKeyhole } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { PLAN_TIERS, PLAN_CURRENCY } from "@/lib/plans";
export const Route = createFileRoute("/planes")({
  head: () => ({ meta: [{ title: "Forfaits en dollars canadiens | ÉUF pro" }, { name: "description", content: "Une évaluation gratuite, Étudiant à 15 CAD par mois, Sprint ÉUF à 24,99 CAD pour 60 jours et licences institutionnelles." }, { property: "og:title", content: "Forfaits ÉUF | ÉUF pro" }, { property: "og:description", content: "Une seule évaluation gratuite. Révision avec forfait payant. Abonnement Étudiant résiliable à tout moment." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: PlansPage,
});
function PlansPage() {
  const { t, locale } = useLanguage();
  const money = (value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: PLAN_CURRENCY }).format(value);
  return <AppShell>
    <section className="border-b pb-7"><p className="flex items-center gap-2 text-sm font-semibold text-primary"><GraduationCap className="size-5" />ÉUF pro · CAD</p><h1 className="mt-3 font-display text-4xl font-bold">{t("Planes")}</h1></section>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{PLAN_TIERS.map(plan => {
      const features = plan.id === "gratuit" ? ["Una evaluación gratis por cuenta, solo en Redactar", "La revisión requiere un plan de pago"] : plan.id === "etudiant" ? ["30 consultas de IA al mes, entre evaluación y revisión", "Progreso en tu cuenta", "Cancela cuando quieras"] : plan.id === "sprint" ? ["60 consultas de IA durante 60 días, entre evaluación y revisión", "Pago único, sin renovación automática", "Progreso en tu cuenta"] : ["Licencia para grupos", "Precio y cupos a convenir"];
      return <article key={plan.id} className={`flex min-w-0 flex-col rounded-lg border bg-card p-6 shadow-soft ${plan.id === "etudiant" ? "border-primary ring-1 ring-primary" : "border-border"}`}>
        <h2 className="text-xl font-bold">{t(plan.labelKey)}</h2><p className="mt-6 break-words font-display text-3xl font-bold">{plan.price === null ? t("A convenir") : money(plan.price)}</p><p className="mt-2 text-sm text-muted-foreground">{t(plan.period === "monthly" ? "por mes" : plan.period === "one_time" ? "Pago único · 60 días" : plan.period === "free" ? "Una sola prueba" : "Para instituciones")}</p>
        <ul className="my-7 flex-1 space-y-3 text-sm">{features.map(f => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{t(f)}</span></li>)}</ul>
        {plan.id === "gratuit" ? <Button asChild variant="outline"><Link to="/redaction" search={{ sujet: undefined }}>{t("Empezar ahora")}</Link></Button> : <Button disabled variant={plan.id === "etudiant" ? "default" : "outline"}><LockKeyhole />{t("Próximamente")}</Button>}
      </article>;
    })}</div><p className="mt-6 text-sm text-muted-foreground">{t("Los pagos todavía no están disponibles.")}</p>
  </AppShell>;
}
