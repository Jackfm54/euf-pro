import { Link } from "@tanstack/react-router";
import {
  BookOpenText,
  ClipboardList,
  LifeBuoy,
  PenLine,
  ScrollText,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageSelector } from "@/components/LanguageSelector";
import { InstallApp } from "@/components/InstallApp";
import { AccountControl } from "@/components/AccountControl";

const NAV = [
  { to: "/", label: "Inicio", icon: ClipboardList },
  { to: "/sujets", label: "Sujets", icon: BookOpenText },
  { to: "/redaction", label: "Redactar", icon: PenLine },
  { to: "/guide", label: "Ayuda", icon: LifeBuoy },
  { to: "/progres", label: "Progreso", icon: TrendingUp },
  { to: "/regles", label: "Reglas", icon: ScrollText },
] as const;


export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:flex sm:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/icons/euf-192.png" alt="EUF pro" className="h-10 w-10 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold">
                EUF pro
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                 {t("Dissertation critique · Montréal")}
              </span>
            </span>
          </Link>
           <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                 {t(label)}
              </Link>
            ))}
          </nav>
            <div className="flex shrink-0 items-center gap-1"><AccountControl /><InstallApp /><LanguageSelector /></div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

       <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-6">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium text-muted-foreground"
            >
              <Icon className="h-5 w-5" />
               {t(label)}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
