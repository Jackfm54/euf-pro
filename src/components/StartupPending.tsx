import { Loader2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function StartupPending() {
  const { t } = useLanguage();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-4 text-foreground">
      <span className="grid h-14 w-14 place-items-center rounded-lg bg-hero font-display text-lg font-bold text-primary-foreground" lang="fr" dir="ltr">ÉUF</span>
      <h1 className="font-display text-xl font-bold" lang="fr" dir="ltr">Épreuve uniforme</h1>
      <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 aria-hidden="true" className="h-5 w-5 motion-safe:animate-spin" />
        {t("Abriendo tu sesión…")}
      </div>
    </main>
  );
}