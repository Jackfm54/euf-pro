import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { resultat, formatDuree, useTentatives } from "@/lib/euf-progress";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/progres")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Mi progreso en la dissertation critique | ÉUF | EUF pro" },
      {
        name: "description",
        content:
          "Historial de ensayos, evolución por criterio, palabras escritas y errores de lengua para medir tu preparación a la épreuve uniforme de français.",
      },
      { property: "og:title", content: "Mi progreso — ÉUF | EUF pro" },
      {
        property: "og:description",
        content: "Gráficas de evolución por criterio y detalle de cada dissertation.",
      },
    ],
  }),
  component: ProgresPage,
});

function ProgresPage() {
  const { t: tr, locale, language } = useLanguage();
  const { tentatives, supprimer, vider, loading, error, retry } = useTentatives();
  const remove = (id?: string) => { void (id ? supprimer(id) : vider()).catch(() => toast.error(tr("No se pudo guardar."))); };
  const series = [...tentatives]
    .reverse()
    .map((t, i) => ({ nom: `#${i + 1}`, ...resultat(t) }));

  const moy = (k: "argumentation" | "structure" | "langue" | "global") =>
    series.length ? Math.round(series.reduce((a, s) => a + s[k], 0) / series.length) : 0;

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">{tr("Mi progreso")}</h1>
          <p className="text-sm text-muted-foreground">
            {tr("{count} ensayos guardados en tu cuenta.", { count: tentatives.length })}
          </p>
        </div>
        {tentatives.length > 0 && (
          <Button variant="ghost" className="shrink-0" onClick={() => remove()}>
            <Trash2 />{tr("Borrar todo")}</Button>
        )}
      </div>

      {loading ? <p role="status" className="mt-8 text-sm text-muted-foreground">{tr("Procesando…")}</p> : error ? <div role="alert" className="mt-8"><p>{tr("No se pudo cargar el progreso. Inténtalo de nuevo.")}</p><Button variant="outline" className="mt-3" onClick={() => void retry()}>{tr("Reintentar")}</Button></div> : tentatives.length === 0 ? (
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">{tr("Aún no hay datos")}</CardTitle>
            <CardDescription>{tr("Escribe tu primera dissertation critique para empezar a medir tu evolución.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/redaction" search={{ sujet: undefined }}>{tr("Empezar ahora")}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Global", "global"],
                ["Argumentación", "argumentation"],
                ["Estructura", "structure"],
                ["Lengua", "langue"],
              ] as const
            ).map(([label, key]) => (
              <Card key={key} className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardDescription>{tr(label)}</CardDescription>
                  <CardTitle className="text-3xl">{moy(key)} %</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={moy(key)} />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">{tr("Evolución por criterio")}</CardTitle>
              <CardDescription>{tr("La línea punteada marca el umbral de 60 % (cote C).")}</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="nom" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--popover-foreground)",
                    }}
                  />
                  <ReferenceLine y={60} stroke="var(--destructive)" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="argumentation" stroke="var(--chart-1)" strokeWidth={2} />
                  <Line type="monotone" dataKey="structure" stroke="var(--chart-2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="langue" stroke="var(--chart-3)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-3">
            {tentatives.map((t) => {
              const r = resultat(t);
              return (
                <Card key={t.id} className="shadow-soft">
                  <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{t.sujetEnonce}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.date).toLocaleString(locale)} · {t.mots} {tr("palabras")} ·{" "}
                        {formatDuree(t.secondes)} · {r.fautes} {tr("errores")}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Critère I : <strong>{r.coteI}</strong> · Critère II :{" "}
                        <strong>{r.coteII}</strong> · Critère III : <strong>{r.coteIII}</strong>
                      </p>
                      {t.notes && <p className="mt-1 text-xs italic">{t.notes}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant={r.reussi ? "default" : "destructive"}>{tr(r.verdict)}</Badge>

                      <Button aria-label={tr("Eliminar ensayo")} variant="ghost" size="icon" onClick={() => remove(t.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </AppShell>
  );
}
