import { useEffect, useState } from "react";
import { Download, Share, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/components/LanguageProvider";

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallApp() {
  const { t, direction } = useLanguage();
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    setInstalled(standalone.matches || ("standalone" in navigator && navigator.standalone === true));
    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const complete = () => { setInstalled(true); setPrompt(null); setOpen(false); };
    window.addEventListener("beforeinstallprompt", beforeInstall);
    window.addEventListener("appinstalled", complete);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", complete);
    };
  }, []);
  async function install() {
    if (!prompt || pending) return;
    setPending(true);
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setOpen(false);
    } finally { setPrompt(null); setPending(false); }
  }
  if (installed) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0" aria-label={t("Instalar aplicación")} title={t("Instalar aplicación")}><Download className="size-4" /></Button>
      </DialogTrigger>
      <DialogContent dir={direction} className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2"><Smartphone className="size-5 text-primary" />{t("ÉUF en tu móvil")}</DialogTitle>
          <DialogDescription>{t("Abre la aplicación publicada en el navegador de tu móvil para añadirla a la pantalla de inicio.")}</DialogDescription>
        </DialogHeader>
        <section className="space-y-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold"><Share className="size-4 text-primary" />{t("En iPhone o iPad")}</h2>
          <p className="text-sm text-muted-foreground">{t("En Safari, pulsa Compartir y selecciona Añadir a pantalla de inicio; confirma con Añadir.")}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">{t("En Android")}</h2>
          <p className="text-sm text-muted-foreground">{t("En Chrome, abre el menú ⋮ y selecciona Instalar aplicación o Añadir a pantalla de inicio.")}</p>
        </section>
        <p className="border-t border-border pt-3 text-xs text-muted-foreground">{t("Necesita conexión a internet. No es una descarga de App Store o Google Play.")}</p>
        {prompt && <Button onClick={install} disabled={pending}><Download className="size-4" />{t("Instalar ahora")}</Button>}
        <DialogClose asChild><Button variant="secondary">{t("Entendido")}</Button></DialogClose>
      </DialogContent>
    </Dialog>
  );
}