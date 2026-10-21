import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LogIn, LogOut, UserRound, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAccount } from "@/lib/account.functions";
export function AccountControl() {
  const {user,ready}=useAuth(); const {t}=useLanguage(); const navigate=useNavigate(); const queryClient=useQueryClient(); const fetchAccount=useServerFn(getAccount);
  const {data}=useQuery({queryKey:["account",user?.id],queryFn:()=>fetchAccount(),enabled:ready&&Boolean(user)});
  async function signOut(){await queryClient.cancelQueries();queryClient.clear();await supabase.auth.signOut();await navigate({to:"/auth",search:{next:"/"},replace:true});}
  if(!ready) return <span className="h-9 w-9"/>;
  if(!user) return <Button asChild variant="ghost" size="icon" title={t("Iniciar sesión")}><Link to="/auth" search={{next:"/"}} aria-label={t("Iniciar sesión")}><LogIn/></Link></Button>;
  return <div className="flex items-center"><Button asChild size="icon" variant="ghost" title={t("Mi cuenta")}><Link to="/cuenta" aria-label={t("Mi cuenta")}><UserRound/></Link></Button>{data?.isAdmin&&<Button asChild size="icon" variant="ghost" title={t("Administración")}><Link to="/administracion" aria-label={t("Administración")}><ShieldCheck/></Link></Button>}<Button size="icon" variant="ghost" onClick={()=>void signOut()} title={t("Cerrar sesión")} aria-label={t("Cerrar sesión")}><LogOut/></Button></div>;
}