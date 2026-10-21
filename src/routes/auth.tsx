import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ next: typeof s.next === "string" && s.next.startsWith("/") && !s.next.startsWith("//") && !s.next.includes("\\") ? s.next : "/" }),
  head: () => ({ meta: [{ title: "Acceso y registro | ÉUF | EUF pro" }, { name: "description", content: "Accede a tu cuenta ÉUF y a tus dos evaluaciones gratuitas." }, { property: "og:title", content: "Acceso a ÉUF | EUF pro" }, { property: "og:description", content: "Cuenta personal para practicar la prueba uniforme de francés." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AuthPage,
});
function AuthPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { if (user) void navigate({ to: next, replace: true }); }, [user, next, navigate]);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setMessage("");
    if (!z.string().email().max(255).safeParse(email).success || (mode !== "forgot" && password.length < 8)) { setMessage("Introduce un correo válido y una contraseña de al menos 8 caracteres."); return; }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name.trim().slice(0,100) }, emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(next)}` } });
        setMessage(error ? "No se pudo crear la cuenta. Inténtalo de nuevo." : "Revisa tu correo para confirmar tu cuenta.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        setMessage(error ? "No se pudo enviar el correo. Inténtalo de nuevo." : "Si la cuenta existe, recibirás un enlace para recuperar la contraseña.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage("Correo o contraseña incorrectos, o cuenta sin confirmar.");
      }
    } finally { setBusy(false); }
  }
  return <AppShell><section className="mx-auto max-w-md space-y-6 py-8"><h1 className="text-3xl font-bold">{t(mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Recuperar contraseña" : "Iniciar sesión")}</h1>
    <form onSubmit={submit} className="space-y-4">
      {mode === "signup" && <div className="space-y-2"><Label htmlFor="name">{t("Nombre")}</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} maxLength={100} required autoComplete="name" /></div>}
      <div className="space-y-2"><Label htmlFor="email">{t("Correo electrónico")}</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required maxLength={255} autoComplete="email" dir="ltr" /></div>
      {mode !== "forgot" && <div className="space-y-2"><Label htmlFor="password">{t("Contraseña")}</Label><Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} /></div>}
      {message && <p role="status" className="text-sm text-muted-foreground">{t(message)}</p>}
      <Button type="submit" disabled={busy} className="w-full">{mode === "signup" ? <UserPlus /> : <LogIn />}{t(busy ? "Procesando…" : mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Enviar enlace" : "Iniciar sesión")}</Button>
    </form>
    <div className="flex flex-wrap gap-2"><Button variant="link" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setMessage(""); }}>{t(mode === "signup" ? "Iniciar sesión" : "Crear cuenta")}</Button><Button variant="link" onClick={() => { setMode("forgot"); setMessage(""); }}>{t("Recuperar contraseña")}</Button><Button asChild variant="link"><Link to="/planes">{t("Planes")}</Link></Button></div>
  </section></AppShell>;
}