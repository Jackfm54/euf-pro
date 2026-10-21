import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Recuperar contraseña | ÉUF | EUF pro" }, { name: "description", content: "Establece una nueva contraseña de acceso a ÉUF." }, { property: "og:title", content: "Recuperación de cuenta ÉUF | EUF pro" }, { property: "og:description", content: "Restablece tu contraseña con un enlace de recuperación." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: ResetPage,
});
function ResetPage() {
  const { t } = useLanguage(); const [valid, setValid] = useState(false); const [password,setPassword] = useState(""); const [busy,setBusy] = useState(false); const [message,setMessage] = useState("");
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.get("type") === "recovery") {
      void supabase.auth.getUser().then(({ data }) => setValid(Boolean(data.user)));
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setValid(true); });
    return () => subscription.unsubscribe();
  }, []);
  async function submit(e: React.FormEvent) { e.preventDefault(); if (!valid || password.length < 8) return; setBusy(true); const { error } = await supabase.auth.updateUser({ password }); setMessage(error ? "No se pudo cambiar la contraseña." : "Contraseña actualizada."); setBusy(false); }
  return <AppShell><section className="mx-auto max-w-md space-y-6 py-8"><h1 className="text-3xl font-bold">{t("Recuperar contraseña")}</h1>{valid ? <form className="space-y-4" onSubmit={submit}><Label htmlFor="new-password">{t("Nueva contraseña")}</Label><Input id="new-password" type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"/><Button disabled={busy} type="submit">{t("Guardar")}</Button></form> : <p>{t("Abre el enlace de recuperación recibido por correo.")}</p>}{message && <p role="status">{t(message)}</p>}<Button asChild variant="link"><Link to="/auth" search={{next:"/"}}>{t("Iniciar sesión")}</Link></Button></section></AppShell>;
}