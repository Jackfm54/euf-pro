import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Check, CheckCircle2, CreditCard, GraduationCap, Info, Mail } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { PRIVACY_CONTACT } from "@/lib/legal";
import { PLAN_TIERS, PLAN_CURRENCY } from "@/lib/plans";
import { createStripeCheckout } from "@/lib/stripe.functions";

type PlanSearch = {
  pago?: "exito" | "cancelado";
};

export const Route = createFileRoute("/planes")({
  validateSearch: (search: Record<string, unknown>): PlanSearch => ({
    ...(search["pago"] === "exito" || search["pago"] === "cancelado"
      ? { pago: search["pago"] }
      : {}),
  }),
  head: () => ({
    meta: [
      { title: "Forfaits en dollars canadiens | ÉUF pro" },
      {
        name: "description",
        content:
          "Une évaluation gratuite, Étudiant à 15 CAD par mois, Sprint ÉUF à 24,99 CAD pour 60 jours et licences institutionnelles.",
      },
      { property: "og:title", content: "Forfaits ÉUF | ÉUF pro" },
      {
        property: "og:description",
        content:
          "Une seule évaluation gratuite. Révision avec forfait payant. Abonnement Étudiant résiliable à tout moment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlansPage,
});

function PlansPage() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pago } = Route.useSearch();
  const [busyTier, setBusyTier] = useState<"etudiant" | "sprint" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (pago === "exito") {
      void queryClient.invalidateQueries({ queryKey: ["account"] });
    }
  }, [pago, queryClient]);

  const money = (value: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: PLAN_CURRENCY }).format(value);

  async function startCheckout(tier: "etudiant" | "sprint") {
    if (!user) {
      void navigate({ to: "/auth", search: { next: "/planes" } });
      return;
    }
    setBusyTier(tier);
    setErrorMessage("");
    try {
      const result = await createStripeCheckout({
        data: { tier, origin: window.location.origin },
      });
      window.location.assign(result.url);
    } catch {
      setErrorMessage("No se pudo iniciar el pago con Stripe. Inténtalo de nuevo en unos momentos.");
      setBusyTier(null);
    }
  }

  return (
    <AppShell>
      <section className="border-b pb-7">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary">
          <GraduationCap className="size-5" />
          ÉUF pro · CAD
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">{t("Planes")}</h1>
      </section>

      {pago === "exito" && (
        <div
          role="status"
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-success/40 bg-success/10 p-4 text-sm"
        >
          <p className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-5 shrink-0 text-success" />
            {t("¡Pago confirmado! Tu plan ya está activo o se activará en unos segundos.")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/redaction" search={{ sujet: undefined }}>
                {t("Empezar ahora")}
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/cuenta">{t("Mi cuenta")}</Link>
            </Button>
          </div>
        </div>
      )}

      {pago === "cancelado" && (
        <div
          role="status"
          className="mt-6 flex items-center gap-2 rounded-lg border bg-secondary/60 p-4 text-sm"
        >
          <Info className="size-5 shrink-0 text-muted-foreground" />
          <p>{t("Pago cancelado. No se ha realizado ningún cobro.")}</p>
        </div>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {t(errorMessage)}
        </p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PLAN_TIERS.map((plan) => {
          const features =
            plan.id === "gratuit"
              ? [
                  "Una evaluación gratis por cuenta, solo en Redactar",
                  "La revisión requiere un plan de pago",
                ]
              : plan.id === "etudiant"
                ? [
                    "30 consultas de IA al mes, entre evaluación y revisión",
                    "Progreso en tu cuenta",
                    "Cancela cuando quieras",
                  ]
                : plan.id === "sprint"
                  ? [
                      "60 consultas de IA durante 60 días, entre evaluación y revisión",
                      "Pago único, sin renovación automática",
                      "Progreso en tu cuenta",
                    ]
                  : ["Licencia para grupos", "Precio y cupos a convenir"];

          return (
            <article
              key={plan.id}
              className={`flex min-w-0 flex-col rounded-lg border bg-card p-6 shadow-soft ${plan.id === "etudiant" ? "border-primary ring-1 ring-primary" : "border-border"}`}
            >
              <h2 className="text-xl font-bold">{t(plan.labelKey)}</h2>
              <p className="mt-6 break-words font-display text-3xl font-bold">
                {plan.price === null ? t("A convenir") : money(plan.price)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  plan.period === "monthly"
                    ? "por mes"
                    : plan.period === "one_time"
                      ? "Pago único · 60 días"
                      : plan.period === "free"
                        ? "Una sola prueba"
                        : "Para instituciones",
                )}
              </p>
              <ul className="my-7 flex-1 space-y-3 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
              {plan.id === "gratuit" ? (
                <Button asChild variant="outline">
                  <Link to="/redaction" search={{ sujet: undefined }}>
                    {t("Empezar ahora")}
                  </Link>
                </Button>
              ) : plan.id === "institution" ? (
                <Button asChild variant="outline">
                  <a href={`mailto:${PRIVACY_CONTACT}?subject=Licence%20%C3%89UF%20pro`}>
                    <Mail />
                    {t("Contactar")}
                  </a>
                </Button>
              ) : (
                <Button
                  variant={plan.id === "etudiant" ? "default" : "outline"}
                  disabled={busyTier !== null}
                  onClick={() => void startCheckout(plan.id)}
                >
                  <CreditCard />
                  {busyTier === plan.id
                    ? t("Redirigiendo a Stripe…")
                    : user
                      ? t("Elegir este plan")
                      : t("Inicia sesión para elegir un plan")}
                </Button>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {t(
          "Pagos seguros con Stripe en dólares canadienses (CAD). Puedes cancelar el plan Étudiant en cualquier momento desde Mi cuenta.",
        )}
      </p>
    </AppShell>
  );
}
