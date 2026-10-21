import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SUJETS } from "@/data/euf";

export const Route = createFileRoute("/sujets")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Sujets de dissertation critique | Entraînement ÉUF | EUF pro" },
      {
        name: "description",
        content:
          "Sujets de rédaction inspirados en épreuves anteriores: comparación, discusión y análisis, con corpus literario y pistas de reflexión.",
      },
      { property: "og:title", content: "Sujets de dissertation critique — ÉUF | EUF pro" },
      {
        property: "og:description",
        content: "Elige un sujet, revisa el corpus y empieza tu dissertation cronometrada.",
      },
    ],
  }),
  component: SujetsPage,
});

function SujetsPage() {
  const { t, direction } = useLanguage();
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">{t("Sujets de rédaction")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("Los tres sujets del cahier oficial del 14 de diciembre de 2022, con sus textos completos. Elige uno y redacta 900 palabras en 4 h 30.")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {SUJETS.map((s) => (
          <Card key={s.id} className="flex flex-col shadow-soft">
            <CardHeader>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <CardDescription className="min-w-0">
                  {t(s.rang)} · {t(s.epoque)}
                </CardDescription>
                <Badge variant="secondary" className="shrink-0">
                  {t(s.type)}
                </Badge>
              </div>
              <CardTitle lang="fr" dir="ltr" className="text-base leading-snug">{s.enonce}</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto space-y-4">
              <p lang="fr" dir="ltr" className="text-xs italic text-muted-foreground">{s.corpus}</p>
              <p className="text-xs text-muted-foreground">{t(s.cahier)}</p>

              <ul className="space-y-1 text-sm text-muted-foreground">
                {s.pistes.map((p) => (
                  <li dir={direction} key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/redaction" search={{ sujet: s.id }}>{t("Redactar este sujet")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
