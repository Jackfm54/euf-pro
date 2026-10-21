import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText, Check, Crown, FileCheck2, GraduationCap, LockKeyhole, Sparkles, Sprout, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { PLAN_TIERS, FREE_EVALUATIONS } from "@/lib/plans";
export const Route = createFileRoute("/planes")({
  head: () => ({ meta: [{ title: "Planes de práctica | ÉUF | EUF pro" }, { name: "description", content: "Dos evaluaciones gratuitas y planes de 20, 50 o 100 USD al mes con descuento anual." }, { property: "og:title", content: "Planes ÉUF | EUF pro" }, { property: "og:description", content: "Práctica gratuita y planes de 20, 50 o 100 USD al mes de ÉUF." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: PlansPage,
});
function PlansPage() {
  const {t}=useLanguage();
  return (
    <AppShell>
      <section className="border-b pb-7">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><GraduationCap className="size-5" />ÉUF · {t("Dissertation critique · Montréal")}</p>
        <h1 className="font-display text-4xl font-bold tracking-normal sm:text-5xl">{t("Planes")}</h1>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {PLAN_TIERS.map((tier) => {
          const featured = tier.id === "avanzado";
          const premium = tier.id === "premium";
          const Icon = featured ? TrendingUp : premium ? Crown : Sprout;
          const tone = featured ? "bg-primary text-primary-foreground" : premium ? "bg-accent text-accent-foreground" : "bg-success/15 text-success";
          return <article key={tier.id} className={`relative flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card shadow-soft transition-shadow motion-safe:duration-300 hover:shadow-lift ${featured ? "border-primary ring-1 ring-primary" : "border-border"}`}>
            <div className={`flex min-h-11 items-center justify-between gap-2 px-6 py-3 text-xs font-semibold ${tone}`}><span>{t(featured ? "Práctica constante" : premium ? "Preparación intensiva" : "Primeros pasos")}</span><Icon className="size-4 shrink-0" /></div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3"><h2 className="text-2xl font-bold tracking-normal">{t(tier.labelKey)}</h2><Icon className={`size-6 ${featured ? "text-primary" : premium ? "text-accent-foreground" : "text-success"}`} /></div>
              <div className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1"><p className="flex items-baseline gap-1 font-display font-bold" dir="ltr"><span className="text-sm text-muted-foreground">US$</span><span className="text-5xl">{tier.monthlyPrice}</span></p><span className="text-sm text-muted-foreground">/ {t("por mes")}</span></div>
              <p className="mt-3 flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground"><span>{t("o")}</span><span className="font-semibold text-foreground" dir="ltr">US${tier.annualPrice.toLocaleString("en-US")}</span><span>{t("por año")}</span></p>
              <div className="mt-7 space-y-5 border-y py-6">
                <div className="flex items-start gap-3"><FileCheck2 className="mt-1 size-5 shrink-0 text-primary" /><div><span className="text-3xl font-bold">{tier.monthlyEvaluations}</span><p className="mt-1 text-sm text-muted-foreground">{t("evaluaciones de examen por mes")}</p></div></div>
                <div className="flex items-start gap-3"><GraduationCap className="mt-1 size-5 shrink-0 text-primary" /><div><span className="text-3xl font-bold">{tier.monthlyProfessorConsultations}</span><p className="mt-1 text-sm text-muted-foreground">{t("consultas al profesor por mes")}</p></div></div>
              </div>
              <ul className="mt-6 space-y-3 text-sm">{["Progreso en tu cuenta", "Ortografía y sintaxis"].map(label => <li key={label} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-success" />{t(label)}</li>)}</ul>
              <Button disabled variant={featured ? "default" : "outline"} size="lg" className="mt-7 w-full disabled:opacity-80"><LockKeyhole />{t("Próximamente")}</Button>
            </div>
          </article>;
        })}
      </div>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y py-6">
        <div className="flex min-w-0 items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-primary"><BookOpenText className="size-6" /></span><div><h2 className="text-lg font-bold tracking-normal">{t("Gratis")}</h2><p className="mt-1 text-sm text-muted-foreground"><span className="font-bold text-foreground">{FREE_EVALUATIONS}</span> {t("evaluaciones por cuenta")}</p></div></div>
        <Button asChild size="lg"><Link to="/redaction" search={{sujet:undefined}}>{t("Empezar ahora")}<ArrowRight /></Link></Button>
      </section>
      <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="size-4 shrink-0" />{t("Los pagos todavía no están disponibles.")}</p>
    </AppShell>
  );
}
