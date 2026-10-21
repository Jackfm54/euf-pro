import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { FileText, GraduationCap, Loader2, LockKeyhole, Upload, X } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { getProfessorAccess, reviewWithProfessor } from "@/lib/professor.functions";
import type { ProfessorFeedback } from "@/lib/professor";
import { listProgress, saveProgress, importProgress } from "@/lib/progress.functions";
import { ownedProfessorRecords } from "@/lib/progress-migration";

export function ProfessorReview({ enonce, extraits, essayId, images }: { enonce: string; extraits: string; essayId: string; images: string[] }) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const accessFn = useServerFn(getProfessorAccess);
  const reviewFn = useServerFn(reviewWithProfessor);
  const listFn = useServerFn(listProgress);
  const saveFn = useServerFn(saveProgress);
  const importFn = useServerFn(importProgress);
  const [history, setHistory] = useState<{ id: string; feedback: ProfessorFeedback; language: string; date: string }[]>([]);
  const { data: access, isError } = useQuery({ queryKey: ["professor-access", user?.id], queryFn: () => accessFn(), enabled: Boolean(user) });
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ProfessorFeedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let active = true;
    setFeedback(null);
    setHistory([]);
    setError(null);
    if (!user) return;
    void (async () => {
      const marker = `euf.professor.v1.account.${user.id}.cloud-imported`;
      let local: ReturnType<typeof ownedProfessorRecords> = [];
      try { if (!localStorage.getItem(marker)) local = ownedProfessorRecords(localStorage, user.id); } catch { /* Local storage is optional. */ }
      for (let offset = 0; offset < local.length; offset += 100) await importFn({ data: local.slice(offset, offset + 100) });
      try { localStorage.setItem(marker, "true"); } catch { /* Cloud remains available. */ }
      const rows = await listFn({ data: { kind: "professor" } });
      if (!active) return;
      const saved = rows.map(row => ({ id: row.record_id, ...(row.payload as unknown as { feedback: ProfessorFeedback; language: string; date: string }) }));
      setHistory(saved);
      setFeedback(saved.find(row => row.language === language)?.feedback ?? null);
    })().catch(() => { if (active) setError(t("No se pudo cargar el progreso. Inténtalo de nuevo.")); });
    return () => { active = false; };
  }, [user?.id, language, listFn, importFn]);

  async function submit() {
    if (!access?.allowed || access.denial || busy) return;
    const media = files.length ? files : images;
    if (!media.length) return;
    setBusy(true); setError(null);
    try {
      const result = await reviewFn({ data: { images: media, enonce, extraits, langue: language } });
      if (!result.feedback) {
        setError(result.message ?? t(result.error === "paid_required" ? "Disponible con un plan mensual o anual activo." : "No se pudo obtener la orientación del profesor."));
        return;
      }
      setFeedback(result.feedback);
      const id = `${reviewId ?? crypto.randomUUID()}.${language}`;
      const saved = { feedback: result.feedback, language, date: new Date().toISOString() };
      try {
        await saveFn({ data: { kind: "professor", id, payload: saved } });
        setHistory(previous => [{ id, ...saved }, ...previous.filter(row => row.id !== id)]);
      } catch { setError(t("La orientación se muestra, pero no se pudo guardar en tu cuenta.")); }
    } catch { setError(t("No se pudo obtener la orientación del profesor.")); }
    finally { setBusy(false); }
  }

  return <section className="border-b border-border py-5" aria-label={t("Profesor de literatura")}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-accent" />{t("Profesor de literatura")}</h2>
      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" />{t("Plan de pago")}</span>
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{t("Cualquier disertación, independiente del tema y los textos del examen.")}</p>
    <div className="mt-4 space-y-4">
    {!access?.allowed ? <div className="mt-3 flex flex-wrap items-center gap-3">
      <p className="text-sm text-muted-foreground">{t(isError ? "No se pudo comprobar el acceso al profesor." : access ? "Disponible con un plan mensual o anual activo." : "Procesando…")}</p>
      <Button asChild variant="outline" size="sm"><Link to="/planes">{t("Planes")}</Link></Button>
    </div> : null}
      <input ref={fileRef} className="hidden" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple aria-label={t("Archivos para el profesor")} disabled={busy} onChange={async (event) => {
        const selected = Array.from(event.target.files ?? []); event.target.value = "";
        if (selected.some(file => file.size > 10 * 1024 * 1024) || selected.length + files.length > 8) { setError(t("Máximo 8 fotos o PDF de 10 MB cada uno.")); return; }
        if (selected.some(file => !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) { setError(t("El archivo no es una imagen ni un PDF válido.")); return; }
        try {
          const loaded = await Promise.all(selected.map(file => new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(); reader.onerror = reject; reader.readAsDataURL(file); })));
          setFiles(previous => [...previous, ...loaded].slice(0, 8)); setReviewId(crypto.randomUUID()); setFeedback(null); setError(null);
        } catch { setError(t("No se pudo obtener la orientación del profesor.")); }
      }} />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" disabled={busy} onClick={() => fileRef.current?.click()}><Upload />{t("Subir fotos o PDF")}</Button>
        <Button disabled={busy || !access?.allowed || Boolean(access?.denial) || !(files.length || images.length)} onClick={() => void submit()}>{busy ? <Loader2 className="animate-spin" /> : <GraduationCap />}{t(busy ? "El profesor está revisando…" : "Pedir orientación")}</Button>
      </div>
      {files.length > 0 && <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{files.map((file, index) => <figure key={index} className="min-w-0 overflow-hidden rounded-md border border-border bg-background">
        {file.startsWith("data:application/pdf") ? <div className="flex aspect-[3/4] items-center justify-center bg-muted"><FileText className="h-12 w-12 text-muted-foreground" aria-label="PDF" /></div> : <img src={file} alt={`${t("Foto de la redacción")} ${index + 1}`} className="aspect-[3/4] w-full bg-muted object-contain" />}
        <figcaption className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-sm"><span>{file.startsWith("data:application/pdf") ? "PDF" : t("Foto de la redacción")} {index + 1}</span><Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" disabled={busy} aria-label={t("Quitar esta foto")} onClick={() => { setFiles(previous => previous.filter((_, i) => i !== index)); setReviewId(crypto.randomUUID()); setFeedback(null); }}><X className="h-3 w-3" /></Button></figcaption>
      </figure>)}</div>}
      {access?.denial && <p role="alert" className="text-sm text-destructive">{access.denial}</p>}
    </div>
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    {history.length > 0 && <div className="mt-5 border-t border-border pt-4"><h3 className="text-sm font-semibold">{t("Orientaciones guardadas")}</h3><div className="mt-2 flex flex-wrap gap-2">{history.map(row => <Button key={row.id} variant="outline" size="sm" onClick={() => { setFeedback(row.feedback); setFiles([]); setReviewId(null); }}>{new Date(row.date).toLocaleDateString()} · {row.language.toUpperCase()}</Button>)}</div></div>}
    {feedback && <div className="mt-5 space-y-5 text-sm">
      <p className="leading-relaxed">{feedback.bilan}</p>
      <div><h3 className="font-semibold">{t("Puntos fuertes")}</h3><ul className="mt-2 list-disc space-y-1 ps-5">{feedback.pointsForts.map((point, i) => <li key={i}>{point}</li>)}</ul></div>
      <div><h3 className="font-semibold">{t("Observaciones del profesor")}</h3><ul className="mt-2 space-y-4">{feedback.observations.map((item, i) => <li key={i} className="border-s-2 border-accent ps-3"><p className="font-medium">{item.domaine}</p><blockquote dir="ltr" lang="fr" className="mt-1 text-destructive">{item.extrait}</blockquote><p className="mt-2 text-muted-foreground">{item.explication}</p><p className="mt-2 font-medium">{item.question}</p></li>)}</ul></div>
      <div><h3 className="font-semibold">{t("Prioridades de revisión")}</h3><ol className="mt-2 list-decimal space-y-1 ps-5">{feedback.priorites.map((point, i) => <li key={i}>{point}</li>)}</ol></div>
      <div><h3 className="font-semibold">{t("Ejercicio propuesto")}</h3><p className="mt-2 text-muted-foreground">{feedback.exercice}</p></div>
    </div>}
  </section>;
}