import { translate } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, PenLine, Target, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CRITERES, DATES_EPREUVE, REGLES, SUJETS } from "@/data/euf";
import { resultat, useTentatives } from "@/lib/euf-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Préparation à l'Épreuve uniforme de français | Montréal | EUF pro" },
      {
        name: "description",
        content:
          "Practica la dissertation critique de 900 palabras en 4 h 30 y evalúa tu progreso según los tres criterios oficiales de la épreuve uniforme de français.",
      },
      { property: "og:title", content: "Préparation à l'Épreuve uniforme de français | EUF pro" },
      {
        property: "og:description",
        content:
          "Entrenamiento cronometrado, autoevaluación con la grille officielle y seguimiento de progreso para la ÉUF.",
      },
    ],
  }),
  component: Index,
});

function prochaineDate() {
  const today = new Date().toISOString().slice(0, 10);
  return DATES_EPREUVE.find((d) => d >= today) ?? DATES_EPREUVE[DATES_EPREUVE.length - 1];
}

function Index() {
  const { t, locale, language } = useLanguage();
  const { tentatives } = useTentatives();
  const derniers = tentatives.slice(0, 3).map((t) => ({ t, r: resultat(t) }));
  const moyenne = (id: "argumentation" | "structure" | "langue") =>
    tentatives.length
      ? Math.round(
          tentatives.reduce((a, t) => a + resultat(t)[id], 0) / tentatives.length,
        )
      : 0;

  const date = prochaineDate();
  const jours = Math.max(
    0,
    Math.ceil((new Date(date).getTime() - Date.now()) / 86_400_000),
  );

  return (
    <AppShell>
      <section className="overflow-hidden rounded-3xl bg-hero p-8 text-primary-foreground shadow-lift sm:p-12">
        <Badge className="border-0 bg-accent-gradient text-accent-foreground">
          Épreuve uniforme de français · DEC
        </Badge>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">{t("Prepara tu dissertation critique con las reglas oficiales")}</h1>
        <p className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base">{t("900 palabras, 4 h 30, tres criterios que debes aprobar con cote C (60 %). Escribe con cronómetro, autoevalúate con la grille de correction y sigue tu progreso ensayo tras ensayo.")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to="/redaction" search={{ sujet: undefined }}>
              <PenLine />{t("Empezar una redacción")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link to="/sujets">{t("Ver los sujets")}</Link>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {REGLES.duree} {t("de examen")}
          </span>
          <span className="flex items-center gap-2">
            <Target className="h-4 w-4" /> {t("máx.")} {REGLES.erreursMax} {t("errores de lengua")}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> {t("próxima épreuve en {count} días", { count: jours })} (
            {new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" })})
          </span>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {CRITERES.map((c) => {
          const m = moyenne(c.id);
          return (
            <Card key={c.id} className="shadow-soft">
              <CardHeader>
                <CardDescription>{t(c.numero)}</CardDescription>
                <CardTitle className="text-lg">{t(c.titre)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t(c.resume)}</p>
                <Progress value={m} />
                <p className="text-sm font-medium">
                  {t("Promedio:")} {tentatives.length ? `${m} %` : t("sin datos")}{" "}
                  {tentatives.length ? (
                    <span className={m >= 60 ? "text-success" : "text-destructive"}>
                      {t(m >= 60 ? "· aprobado" : "· bajo el umbral")}
                    </span>
                  ) : null}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />{t("Últimos ensayos")}</CardTitle>
            <CardDescription>{t("Tus tres redacciones más recientes.")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {derniers.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("Todavía no hay ensayos. Empieza con un sujet y tu primera dissertation.")}</p>
            ) : (
              derniers.map(({ t, r }) => (
                <div
                  key={t.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.sujetEnonce}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(t.date).toLocaleDateString(locale)} · {t.mots} {translate(language, "palabras")} ·{" "}
                      {t.erreurs} {translate(language, "errores")}
                    </p>
                  </div>
                  <Badge variant={r.reussi ? "default" : "destructive"} className="shrink-0">
                    {r.global} %
                  </Badge>
                </div>
              ))
            )}
            <Button asChild variant="ghost" className="w-full">
              <Link to="/progres">{t("Ver todo el progreso")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">{t("Sujet sugerido")}</CardTitle>
            <CardDescription>{t("Elegido entre {count} sujets.", { count: SUJETS.length })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p dir="ltr" lang="fr" className="text-sm font-medium">{SUJETS[0].enonce}</p>
            <p className="text-xs text-muted-foreground">{SUJETS[0].corpus}</p>
            <Button asChild className="w-full">
              <Link to="/redaction" search={{ sujet: SUJETS[0].id }}>{t("Redactar este sujet")}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
