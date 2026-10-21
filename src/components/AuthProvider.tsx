import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<{ user: User | null; ready: boolean }>({ user: null, ready: false });
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    let active = true;
    let revision = 0;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      revision++;
      setUser(session?.user ?? null);
      setReady(true);
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
      if (event === "SIGNED_OUT") queryClient.clear();
      queueMicrotask(() => {
        if (!active) return;
        void router.invalidate();
        if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
      });
    });
    const initialRevision = revision;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active || revision !== initialRevision) return;
      setUser(data.user);
      setReady(true);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [queryClient, router]);
  return <AuthContext.Provider value={{ user, ready }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);