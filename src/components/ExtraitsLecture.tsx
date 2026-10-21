import { useLanguage } from "@/components/LanguageProvider";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Extrait } from "@/data/euf";

interface Props {
  extraits: readonly Extrait[];
  /** Altura del área de lectura. */
  hauteur?: string;
}

export function ExtraitsLecture({ extraits, hauteur = "h-[420px]" }: Props) {
  const { t, direction } = useLanguage();
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpen className="size-4 text-accent" />{t("Textes du cahier")}</CardTitle>
        <CardDescription>
          {extraits.length > 1
            ? t("Los dos textos del dossier. Es obligatorio tener en cuenta ambos en tu dissertation.")
            : t("El texto del dossier. Léelo y marca las citas antes de redactar.")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs dir={direction} defaultValue={extraits[0].etiquette}>
          <TabsList
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${extraits.length}, minmax(0, 1fr))` }}
          >
            {extraits.map((e) => (
              <TabsTrigger key={t(e.etiquette)} value={t(e.etiquette)}>
                {t(e.etiquette)}
              </TabsTrigger>
            ))}
          </TabsList>
          {extraits.map((e) => (
            <TabsContent lang="fr" dir="ltr" key={t(e.etiquette)} value={t(e.etiquette)} className="mt-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{e.auteur}</p>
                  <p className="text-sm italic text-muted-foreground">
                    {e.titre}, {e.annee}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.noticeAuteur}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[11px]">{t("Épreuve officielle")}</Badge>
              </div>

              <div className="mt-3 rounded-md border border-dashed bg-secondary/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("Présentation")}</p>
                <p className="mt-1 text-sm text-foreground/90">{e.presentation}</p>
              </div>

              <ScrollArea className={`${hauteur} mt-4 rounded-md border bg-muted/30 p-4`}>
                <div className="space-y-4 pr-3">
                  {e.paragraphes.map((p, i) => (
                    <p
                      key={i}
                      className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/90"
                    >
                      {p}
                    </p>
                  ))}
                  {e.notes?.length ? (
                    <div className="border-t pt-3 text-xs text-muted-foreground">
                      {e.notes.map((n, i) => (
                        <p key={i}>
                          {i + 1}. {n}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <p className="border-t pt-3 text-xs italic text-muted-foreground">
                    {e.reference}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
