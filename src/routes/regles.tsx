import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  CRITERES,
  DATES_EPREUVE,
  OUVRAGES_INTERDITS,
  OUVRAGES_PERMIS,
  REGLES,
} from "@/data/euf";

export const Route = createFileRoute("/regles")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Reglas oficiales de la Épreuve uniforme de français | EUF pro" },
      {
        name: "description",
        content:
          "Duración, número de palabras, criterios de corrección, obras de referencia permitidas y fechas oficiales de la épreuve uniforme de français del MES.",
      },
      { property: "og:title", content: "Reglas oficiales de la ÉUF | EUF pro" },
      {
        property: "og:description",
        content:
          "Todo lo que debes saber antes del examen: 4 h 30, 900 palabras, tres criterios y material autorizado.",
      },
    ],
  }),
  component: ReglesPage,
});

function ReglesPage() {
  const { t, locale, direction } = useLanguage();
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">{t("Reglas de la épreuve")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("Resumen basado en la página oficial del gouvernement du Québec sobre la épreuve uniforme de français, obligatoria para obtener el DEC.")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Duración", v: REGLES.duree },
          { k: "Extensión", v: `${REGLES.mots} ${t("palabras")}` },
          { k: "Errores máximos", v: `${REGLES.erreursMax} (1 / 30 palabras)` },
          { k: "Umbral", v: "Cote C en los 3 criterios" },
        ].map((i) => (
          <Card key={t(i.k)} className="shadow-soft">
            <CardHeader className="pb-2">
              <CardDescription>{t(i.k)}</CardDescription>
              <CardTitle className="text-xl">{t(i.v)}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CRITERES.map((c) => (
          <Card key={c.id} className="shadow-soft">
            <CardHeader>
              <CardDescription>{t(c.numero)}</CardDescription>
              <CardTitle className="text-lg">{t(c.titre)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.sousCriteres.map((sc) => (
                  <li key={sc.id}>
                    <span className="font-medium text-foreground">{t(sc.label)}.</span> {t(sc.aide)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">{t("Material permitido (máx. 3 obras)")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul lang="fr" dir="ltr" className="space-y-2 text-sm">
              {OUVRAGES_PERMIS.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {o}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">{t("Prohibido")}</CardTitle>
            <CardDescription>{t("Su uso puede considerarse plagio o fraude.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul lang="fr" dir="ltr" className="space-y-2 text-sm">
              {OUVRAGES_INTERDITS.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  {o}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">{t("Próximas fechas oficiales")}</CardTitle>
          <CardDescription>{t("La épreuve se realiza tres veces al año.")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {DATES_EPREUVE.map((d) => (
            <Badge key={d} variant="secondary">
              {new Date(`${d}T12:00:00Z`).toLocaleDateString(locale, {
                timeZone: "UTC", day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        {t("Fuente:")}{" "}
        <a
          className="underline"
          href="https://www.quebec.ca/education/cegeps-colleges-prives/epreuve-langue/francais"
          target="_blank"
          rel="noreferrer"
        >
          quebec.ca — Épreuve uniforme de français
        </a>{t(". La inscripción se hace en tu collège.")}</p>
    </AppShell>
  );
}
