import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { acknowledgeEvaluation, getAccount } from "@/lib/account.functions";
import { deliverEvaluation } from "@/lib/evaluation-delivery";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Camera, FileText, Loader2, Pause, Play, RotateCcw, Save, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { corrigerRedaction, corrigerRedactionImage, type Correction } from "@/lib/correction.functions";
import { AppShell } from "@/components/AppShell";
import { ProfessorReview } from "@/components/ProfessorReview";
import { fitsRequest, prepareUpload, UploadError } from "@/lib/upload-compress";
import { ExtraitsLecture } from "@/components/ExtraitsLecture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  CONSIGNE_SUJET,
  COTES,
  CRITERES,
  NOTES_RELEVE,
  REGLES,
  SUJETS,
  type Cote,
} from "@/data/euf";
import {
  compterMots,
  ecrireBrouillon,
  effacerBrouillon,
  formatDuree,
  lireBrouillon,
  coteSuffisante,
  resultat,
  seuilsFautes,
  useTentatives,
  type Tentative,
} from "@/lib/euf-progress";

const DUREE_TOTALE = 4 * 3600 + 30 * 60;

export const Route = createFileRoute("/_authenticated/redaction")({
  validateSearch: (search: Record<string, unknown>) => ({
    sujet: typeof search.sujet === "string" ? search.sujet : undefined,
  }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Redactar y revisión de disertaciones | Entraînement ÉUF | EUF pro" },
      {
        name: "description",
        content:
          "Evalúa tu redacción en foto o PDF según el tema y los dos textos de práctica ÉUF, o solicita orientación independiente sobre una disertación.",
      },
      { property: "og:title", content: "Redactar y revisión de disertaciones — ÉUF | EUF pro" },
      {
        property: "og:description",
        content: "Evaluación ÉUF vinculada al tema y los textos, y orientación de literatura independiente para planes activos.",
      },
    ],
  }),
  component: RedactionPage,
});

function RedactionPage() {
  const { user } = useAuth();
  return <RedactionContent key={user?.id ?? "signed-out"} />;
}

function RedactionContent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const accountFn = useServerFn(getAccount);
  const { data: account } = useQuery({ queryKey: ["account",user?.id], queryFn: () => accountFn(), enabled: Boolean(user) });
  const { t, language, locale, direction } = useLanguage();
  const { sujet: sujetParam } = Route.useSearch();
  const { ajouter } = useTentatives();

  const [sujetId, setSujetId] = useState(sujetParam ?? SUJETS[0].id);
  const [texte, setTexte] = useState("");
  const [secondes, setSecondes] = useState(0);
  const [enMarche, setEnMarche] = useState(false);
  const [etape, setEtape] = useState<"redaction" | "evaluation">("redaction");
  const [view, setView] = useState<"exam" | "review">("exam");
  const [notes, setNotes] = useState("");
  const [cotes, setCotes] = useState<Record<string, Cote>>({});
  const [fautes, setFautes] = useState<Record<string, number>>({
    vocabulaire: 0,
    syntaxe: 0,
    orthographe: 0,
  });
  const charge = useRef(false);
  const [draftReady, setDraftReady] = useState(false);
  const corrigerFn = useServerFn(corrigerRedaction);
  const corrigerImageFn = useServerFn(corrigerRedactionImage);
  const acknowledgeFn = useServerFn(acknowledgeEvaluation);
  const [evaluationId, setEvaluationId] = useState<string>();
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [enCorrection, setEnCorrection] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const archivoRef = useRef<HTMLInputElement>(null);

  const sujet = useMemo(() => SUJETS.find((s) => s.id === sujetId) ?? SUJETS[0], [sujetId]);
  const mots = compterMots(texte);
  const erreurs = (fautes.vocabulaire || 0) + (fautes.syntaxe || 0) + (fautes.orthographe || 0);

  useEffect(() => {
    if (charge.current || !user) return;
    let active = true;
    void lireBrouillon(user.id).then(b => {
    if (!active) return;
    if (b && b.texte) {
      setSujetId(sujetParam ?? b.sujetId);
      setTexte(b.texte);
      setSecondes(b.secondes);
      setNotes(b.notes ?? "");
      if (b.cotes) setCotes(b.cotes);
      if (b.fautes) setFautes(b.fautes);
      if (b.correction) {
        setCorrection(b.correction);
        setCotes(b.correction.cotes);
        setFautes(b.correction.fautes);
        setEvaluationId(b.evaluationId);
        setEtape("evaluation");
      }
      toast(t("Borrador recuperado"), { description: t("Continúa donde lo dejaste.") });
    }
    charge.current = true;
    setDraftReady(true);
    }).catch(() => { if (active) toast.error(t("No se pudo cargar el progreso. Inténtalo de nuevo.")); });
    return () => { active = false; };
  }, [sujetParam, t, user]);

  useEffect(() => {
    if (!enMarche) return;
    const id = window.setInterval(() => setSecondes((s) => Math.min(DUREE_TOTALE, s + 1)), 1000);
    return () => window.clearInterval(id);
  }, [enMarche]);

  useEffect(() => {
    if (!draftReady || !user) return;
    const id = window.setTimeout(
      () => { void ecrireBrouillon({ sujetId, texte, secondes, notes, cotes, fautes, correction: correction ?? undefined, evaluationId, maj: new Date().toISOString() },user.id).catch(() => toast.error(t("No se pudo guardar."))); },
      800,
    );
    return () => window.clearTimeout(id);
  }, [sujetId, texte, secondes,user,correction,evaluationId,draftReady,t,notes,cotes,fautes]);

  const restant = DUREE_TOTALE - secondes;

  const enregistrer = useCallback(async () => {
    if (!user) return;
    const tentative: Tentative = {
      id: evaluationId ?? crypto.randomUUID(),
      date: new Date().toISOString(),
      sujetId: sujet.id,
      sujetEnonce: sujet.enonce,
      mots,
      secondes,
      erreurs,
      cotes,
      fautes,
      scores: {},
      notes,
      texte,
      feedback: correction ? { erreurs: correction.erreurs, recommandations: correction.recommandations } : undefined,
    };
    try {
      await ajouter(tentative);
      await effacerBrouillon(user.id);
    } catch { toast.error(t("No se pudo guardar.")); return; }
    setTexte("");
    setImagenes([]);
    setSecondes(0);
    setEnMarche(false);
    setFautes({ vocabulaire: 0, syntaxe: 0, orthographe: 0 });
    setNotes("");
    setCotes({});
    setCorrection(null);
    setEvaluationId(undefined);
    setEtape("redaction");
    const r = resultat(tentative);
    toast.success(`${t("Relevé enregistré")} · ${t(r.verdict)}`, {
      description: `Critère I : ${r.coteI} · Critère II : ${r.coteII} · Critère III : ${r.coteIII}`,
    });
  }, [ajouter, cotes, erreurs, fautes, mots, notes, secondes, sujet, t,user,texte,correction,evaluationId]);

  const acceptEvaluation = useCallback(async (corr: Correction, transcription: string, id: string) => {
    if (!user) return;
    setTexte(transcription);
    setCorrection(corr);
    setCotes(corr.cotes);
    setFautes(corr.fautes);
    setEvaluationId(id);
    setEtape("evaluation");
    setEnMarche(false);
    try {
      await deliverEvaluation(async () => {
        await ecrireBrouillon({ sujetId: sujet.id, texte: transcription, secondes, correction: corr, evaluationId: id, maj: new Date().toISOString() }, user.id);
        await ajouter({ id, date: new Date().toISOString(), sujetId: sujet.id, sujetEnonce: sujet.enonce, mots: compterMots(transcription), secondes,
          erreurs: corr.fautes.vocabulaire + corr.fautes.syntaxe + corr.fautes.orthographe, cotes: corr.cotes, fautes: corr.fautes, scores: {}, notes, texte: transcription,
          feedback: { erreurs: corr.erreurs, recommandations: corr.recommandations } });
      }, () => acknowledgeFn({ data: { id } }));
      toast.success(t("Corrección automática lista"));
    } catch {
      toast.error(t("El resultado aparece abajo, pero no se pudo confirmar su guardado. No se ha descontado otra evaluación."));
    }
  }, [user, sujet, secondes, notes, ajouter, acknowledgeFn, t]);

  const apercu = useMemo(
    () =>
      resultat({
        id: "preview",
        date: "",
        sujetId: sujet.id,
        sujetEnonce: sujet.enonce,
        mots,
        secondes,
        erreurs,
        cotes,
        fautes,
        scores: {},
        notes,
      }),
    [cotes, erreurs, fautes, mots, notes, secondes, sujet],
  );

  const seuils = seuilsFautes(mots);

  const corriger = useCallback(async () => {
    setEnCorrection(true);
    try {
      const extraits = sujet.extraits
        .map((e) => `${e.etiquette} — ${e.auteur}, ${e.titre}\n${e.paragraphes.join("\n")}`)
        .join("\n\n");
      const r = await corrigerFn({ data: { texte, enonce: sujet.enonce, extraits, langue: language } });
      if (!r.correction) {
        const msg: Record<string, string> = {
          plan_required: "Has utilizado tus dos evaluaciones gratis. Los planes de pago todavía no están disponibles.",
          evaluation_busy: "Ya hay una evaluación en curso. Espera a que termine.",
          court: "El texto es demasiado corto para corregirlo (mínimo 50 palabras).",
          limite: "Demasiadas correcciones seguidas. Espera un minuto e inténtalo de nuevo.",
          credits: "La corrección automática no está disponible ahora (créditos de IA agotados).",
        };
        toast.error(r.message ?? t(msg[r.erreur ?? ""] ?? "No se pudo corregir el texto. Inténtalo de nuevo."));
        return;
      }
      if (!r.evaluationId) throw new Error("Missing evaluation delivery ID");
      await acceptEvaluation(r.correction, texte, r.evaluationId);
    } catch {
      toast.error(t("No se pudo corregir el texto. Inténtalo de nuevo."));
    } finally {
      void queryClient.invalidateQueries({ queryKey: ["account"] });
      setEnCorrection(false);
    }
  }, [corrigerFn, language, sujet, t, texte, acceptEvaluation, queryClient]);

  const elegirImagen = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      e.target.value = "";
      if (!files.length) return;
      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(t("La foto es demasiado grande (máximo 10 MB)."));
          continue;
        }
        void prepareUpload(file)
          .then((data) =>
            setImagenes((prev) => {
              if (prev.length >= 8) return prev;
              const next = [...prev, data];
              if (!fitsRequest(next)) {
                toast.error(t("Los archivos superan el tamaño permitido. Envía menos páginas o fotos más ligeras."));
                return prev;
              }
              return next;
            }),
          )
          .catch((err) =>
            toast.error(
              t(err instanceof UploadError && err.code === "pdf_grande"
                ? "El PDF es demasiado grande (máximo 3 MB). Envía una foto de cada página."
                : "El archivo no es una imagen ni un PDF válido."),
            ),
          );
      }
    },
    [t],
  );

  const quitarImagen = useCallback((i: number) => {
    setImagenes((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const corrigerDesdeImagen = useCallback(async () => {
    if (!imagenes.length) return;
    setEnCorrection(true);
    try {
      const extraits = sujet.extraits
        .map((x) => `${x.etiquette} — ${x.auteur}, ${x.titre}\n${x.paragraphes.join("\n")}`)
        .join("\n\n");
      const r = await corrigerImageFn({
        data: { images: imagenes, enonce: sujet.enonce, extraits, langue: language },
      });
      if (!r.correction) {
        const msg: Record<string, string> = {
          plan_required: "Has utilizado tus dos evaluaciones gratis. Los planes de pago todavía no están disponibles.",
          evaluation_busy: "Ya hay una evaluación en curso. Espera a que termine.",
          image: "El archivo no es una imagen ni un PDF válido.",
          grande: "La foto es demasiado grande (máximo 10 MB).",
          illisible:
            "No se pudo leer una redacción en las fotos. Sube solo fotos de tu texto, con buena luz y de frente.",
          limite: "Demasiadas correcciones seguidas. Espera un minuto e inténtalo de nuevo.",
          credits: "La corrección automática no está disponible ahora (créditos de IA agotados).",
        };
        toast.error(r.message ?? t(msg[r.erreur ?? ""] ?? "No se pudo corregir la foto. Inténtalo de nuevo."));
        return;
      }
      const { texteTranscrit, ...corr } = r.correction;
      if (!r.evaluationId) throw new Error("Missing evaluation delivery ID");
      await acceptEvaluation(corr, texteTranscrit, r.evaluationId);
    } catch {
      toast.error(t("No se pudo corregir la foto. Inténtalo de nuevo."));
    } finally {
      void queryClient.invalidateQueries({ queryKey: ["account"] });
      setEnCorrection(false);
    }
  }, [corrigerImageFn, imagenes, language, sujet, t, acceptEvaluation, queryClient]);


  const uploadPanel = (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Camera className="h-4 w-4 text-accent" />
                {t("Evaluar desde fotos o PDF")}
              </CardTitle>
              <CardDescription>
                {t("¿Escribiste a mano? Sube fotos claras de tu redacción (una por página) y la IA las leerá, transcribirá y evaluará.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={archivoRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="hidden"
                onChange={elegirImagen}
                disabled={enCorrection}
                aria-label={t("Foto de la redacción")}
              />
              <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
                <li>{t("Un archivo por página, en orden (página 1, 2, 3…), en foto o en PDF.")}</li>
                <li>{t("Buena luz, sin sombras, con la hoja plana y de frente.")}</li>
                <li>{t("Que se lean todas las líneas completas, sin cortar los bordes.")}</li>
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" disabled={enCorrection} onClick={() => archivoRef.current?.click()}>
                  <Camera />
                  {t(imagenes.length ? "Añadir otro archivo" : "Subir fotos o PDF")}
                </Button>
                {imagenes.length > 0 && (
                  <Button onClick={() => void corrigerDesdeImagen()} disabled={enCorrection || !account || account.remaining === 0}>
                    {enCorrection ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    {t(enCorrection ? "Leyendo los archivos…" : "Evaluar los archivos")}
                  </Button>
                )}
              </div>
              {imagenes.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {imagenes.map((img, i) => (
                    <div key={i} className="relative">
                      {img.startsWith("data:application/pdf") ? (
                        <div className="flex h-40 w-32 flex-col items-center justify-center gap-2 rounded-md border bg-muted p-2 text-center">
                          <FileText className="h-8 w-8 text-accent" />
                          <span className="text-xs font-medium">PDF</span>
                        </div>
                      ) : (
                        <img
                          src={img}
                          alt={`${t("Foto de la redacción")} ${i + 1}`}
                          className="h-40 w-auto rounded-md border object-contain"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => quitarImagen(i)}
                        aria-label={t("Quitar esta foto")}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground"
                      >
                        ×
                      </button>
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1 text-xs">
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {enCorrection && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("Corrigiendo tu redacción… puede tardar un minuto.")}
                </p>
              )}
            </CardContent>
          </Card>
  );

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold sm:text-3xl">{t(view === "exam" ? "Simulación de examen" : "Revisión")}</h1>
          {view === "exam" && <p className="text-sm text-muted-foreground">
            {REGLES.mots} {t("palabras")} · {REGLES.duree} · {t("guardado automático")}
          </p>}
        </div>
        {view === "exam" && <Badge variant={restant < 1800 ? "destructive" : "secondary"} className="shrink-0 text-base">
          {formatDuree(restant)}
        </Badge>}
      </div>

      {view === "exam" && <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"><span>{account ? t("Evaluaciones gratis restantes: {count}",{count:account.remaining}) : t("Procesando…")}</span><Button asChild variant="link"><Link to="/planes">{t("Planes")}</Link></Button></div>}
      <div className="mt-3 flex gap-2" role="group" aria-label={t("Simulación de examen")}>
        <Button variant={view === "exam" ? "secondary" : "ghost"} aria-pressed={view === "exam"} onClick={() => setView("exam")}>{t("Redactar")}</Button>
        <Button variant={view === "review" ? "secondary" : "ghost"} aria-pressed={view === "review"} onClick={() => setView("review")}>{t("Revisión")}</Button>
      </div>
      <div hidden={view !== "review"} className="mt-6">
        <ProfessorReview essayId="independent" enonce="" extraits="" images={[]} />
      </div>
      <div hidden={view !== "exam"}>
      {etape === "redaction" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
          <ExtraitsLecture extraits={sujet.extraits} />
          <Card className="shadow-soft">
            <CardHeader className="gap-3">
              <Select dir="ltr" value={sujetId} onValueChange={setSujetId}>
                <SelectTrigger className="min-w-0 [&>span]:truncate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUJETS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {t(s.rang)} — {s.enonce.slice(0, 60)}…
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CardTitle dir="ltr" lang="fr" className="text-base leading-snug">{sujet.enonce}</CardTitle>
              <CardDescription dir="ltr" lang="fr" className="italic">{sujet.corpus}</CardDescription>
              <CardDescription dir="ltr" lang="fr">{CONSIGNE_SUJET}</CardDescription>

            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("Escribe tu redacción a mano o en el ordenador y súbela abajo en fotos o en PDF para evaluarla.")}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={() => setEnMarche((v) => !v)}>
                  {enMarche ? <Pause /> : <Play />}
                  {t(enMarche ? "Pausar" : "Iniciar")} {t("cronómetro")}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSecondes(0);
                    setEnMarche(false);
                  }}
                >
                  <RotateCcw />{t("Reiniciar tiempo")}</Button>
              </div>
            </CardContent>
          </Card>

          {uploadPanel}
          {correction && <Button variant="secondary" onClick={() => setEtape("evaluation")}><FileText />{t("Resultado del examen")}</Button>}
          </div>



          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardDescription>{t("Palabras")}</CardDescription>
                <CardTitle className="text-3xl">
                  {mots}
                  <span className="text-base font-normal text-muted-foreground"> / {REGLES.mots}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={Math.min(100, (mots / REGLES.mots) * 100)} />
                <p className="text-xs text-muted-foreground">
                  {t("Mínimo tolerado: {count} palabras. Menos implica penalización.", { count: REGLES.motsMin })}
                </p>
                <Separator />
                <p className="text-xs text-muted-foreground">
                  {t("Errores de lengua tolerados para {count} palabras:", { count: mots || 0 })}{" "}
                  <strong>{Math.max(1, Math.round(mots / 30))}</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("Pistas del sujet")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {sujet.pistes.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{t(p)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Resultado del examen")}</h2>
            <p lang="fr" dir="ltr" className="text-sm text-muted-foreground">{sujet.enonce}</p>
            {uploadPanel}
            <Card className="shadow-soft">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {t("Corrección automática")}
                </CardTitle>
                <CardDescription>
                  {t("La IA califica cada criterio, señala tus errores con la regla infringida y te da recomendaciones, sin corregir el texto por ti.")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enCorrection ? (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("Corrigiendo tu redacción… puede tardar un minuto.")}
                  </p>
                ) : texte && imagenes.length === 0 ? (
                  <Button variant="secondary" onClick={() => void corriger()} disabled={!account || account.remaining === 0}>
                    <Sparkles />
                    {t(correction ? "Corregir de nuevo" : "Corregir con IA")}
                  </Button>
                ) : null}
                {correction && (
                  <div className="space-y-5 text-sm">
                    <div>
                      <p className="font-semibold">
                        {t("Errores detectados")} ({correction.erreurs.length})
                      </p>
                      <ul className="mt-2 space-y-2">
                        {correction.erreurs.map((f, i) => (
                          <li key={i} className="rounded-md bg-muted p-2">
                            <span dir="ltr" lang="fr" className="text-destructive">
                              {f.extrait}
                            </span>
                            <p className="mt-1 text-xs text-muted-foreground">
                              <strong>{f.type}</strong> · {f.explication}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">{t("Recomendaciones")}</p>
                      <ul className="mt-1 list-disc space-y-1 ps-5 text-muted-foreground">
                        {correction.recommandations.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {CRITERES.map((c) => (
              <Card key={c.id} className="shadow-soft">
                <CardHeader>
                  <CardDescription>{t(c.numero)}</CardDescription>
                  <CardTitle className="text-lg">{t(c.titre)}</CardTitle>
                  <CardDescription>{t(c.resume)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {c.sousCriteres.map((sc) => (
                    <div key={sc.id} className="space-y-2">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                        <div className="min-w-0">
                          <Label className="text-sm">
                            {sc.numero}. {sc.labelFr}
                          </Label>
                          <p className="text-xs text-muted-foreground">{t(sc.label)}</p>
                        </div>
                        {sc.mesure === "cote" ? (
                          <div className="flex shrink-0 gap-1">
                            {COTES.map((k) => (
                              <Button
                                key={k}
                                type="button"
                                size="sm"
                                variant={cotes[sc.id] === k ? "default" : "outline"}
                                className="h-8 w-8 p-0 text-xs font-bold"
                                onClick={() => setCotes((s) => ({ ...s, [sc.id]: k }))}
                              >
                                {k.toLowerCase()}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <Input
                            type="number"
                            min={0}
                            aria-label={`Nombre de fautes — ${sc.labelFr}`}
                            className="h-8 w-24 shrink-0"
                            value={fautes[sc.id] ?? 0}
                            onChange={(e) =>
                              setFautes((s) => ({
                                ...s,
                                [sc.id]: Math.max(0, Number(e.target.value)),
                              }))
                            }
                          />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{t(sc.aide)}</p>
                    </div>
                  ))}
                  {c.id === "langue" && (
                    <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">{t("Total de fautes :")}<strong>{erreurs}</strong> · seuils pour {mots || REGLES.mots}{" "}
                      mots — A ≤ {seuils.A}, B ≤ {seuils.B}, C ≤ {seuils.C}, D ≤ {seuils.D}, E au-delà
                      (1 faute par tranche de 30 mots).
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}


            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">{t("Notas personales")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("Qué mejorar la próxima vez…")}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardDescription>{t("Document officiel (simulation)")}</CardDescription>
                <CardTitle className="text-base">{t("Relevé des résultats")}</CardTitle>
                <CardDescription>
                  Épreuve uniforme de français, langue d'enseignement et littérature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-start text-xs uppercase text-muted-foreground">
                      <th className="py-2">{t("Critères")}</th>
                      <th className="py-2 text-end">{t("Cote globale")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["I Compréhension et qualité de l'argumentation", apercu.coteI],
                        ["II Structure du texte de l'élève", apercu.coteII],
                        ["III Maîtrise de la langue", apercu.coteIII],
                      ] as const
                    ).map(([label, cote]) => (
                      <tr key={label} className="border-b align-top">
                        <td className="py-2 pr-2 leading-snug">{t(label)}</td>
                        <td
                          className={`py-2 text-end text-lg font-bold ${
                            coteSuffisante(cote) ? "text-success" : "text-destructive"
                          }`}
                        >
                          {cote}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2 font-semibold">{t("Verdict")}</td>
                      <td
                        className={`py-2 text-end font-bold ${
                          apercu.reussi ? "text-success" : "text-destructive"
                        }`}
                      >
                        {t(apercu.verdict)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground">{t("Nombre total de fautes :")}<strong>{apercu.fautes}</strong> pour {mots} mots.
                </p>
                <Separator />
                {apercu.invalide && (
                  <p className="text-xs text-destructive">{t("Moins de 600 mots : aucune cote n'est attribuée, verdict d'échec automatique.")}</p>
                )}
                {!apercu.longueurOk && !apercu.invalide && (
                  <p className="text-xs text-destructive">
                    Texte de {mots} mots : sous le seuil recommandé de {REGLES.motsMin}.
                  </p>
                )}
                <ol lang="fr" dir="ltr" className="list-decimal space-y-2 pl-4 text-[11px] leading-snug text-muted-foreground">
                  {NOTES_RELEVE.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ol>
                <Button className="w-full" onClick={enregistrer}>{t("Guardar ensayo")}</Button>
                <Button variant="ghost" className="w-full" onClick={() => setEtape("redaction")}>{t("Volver al texto")}</Button>
                <Button asChild variant="link" className="w-full">
                  <Link to="/progres">{t("Ver mi progreso")}</Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      )}
      </div>
    </AppShell>
  );
}
