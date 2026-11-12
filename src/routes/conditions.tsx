import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { LEGAL_VERSION, PRIVACY_CONTACT } from "@/lib/legal";

export const Route = createFileRoute("/conditions")({
  head: () => ({ meta: [
    { title: "Conditions d'utilisation | ÉUF pro" },
    { name: "description", content: "Règles d'utilisation, plans, annulation et limites de responsabilité d'ÉUF pro." },
    { property: "og:title", content: "Conditions d'utilisation · ÉUF pro" },
    { property: "og:description", content: "Plans, annulation, remboursement et avis sur l'IA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Terms,
});

function Terms() {
  const { t } = useLanguage();
  return <AppShell><article lang="fr" dir="ltr" className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed">
    <p className="rounded-md border bg-secondary p-3 text-xs" dir="auto">{t("Documento legal disponible en francés.")}</p>
    <h1 className="text-3xl font-bold">Conditions d'utilisation</h1>
    <p className="text-muted-foreground">Version du {LEGAL_VERSION}</p>
    <h2 className="text-xl font-bold">1. Service</h2>
    <p>ÉUF pro est un outil de pratique indépendant. Il n'est ni affilié ni approuvé par le ministère de l'Enseignement supérieur du Québec. Les extraits officiels sont reproduits à des fins pédagogiques avec mention de la source; les sujets de pratique ne sont pas des épreuves officielles.</p>
    <h2 className="text-xl font-bold">2. Évaluation automatique</h2>
    <p>Les notes et commentaires sont produits par intelligence artificielle. Ce sont des estimations qui peuvent contenir des erreurs; ils ne garantissent aucun résultat à l'épreuve.</p>
    <h2 className="text-xl font-bold">3. Compte</h2>
    <p>Vous êtes responsable de la confidentialité de votre mot de passe. Un compte par personne. L'essai gratuit est limité à une correction par compte.</p>
    <h2 className="text-xl font-bold">4. Plans et prix</h2>
    <p>Les prix sont affichés en dollars canadiens, taxes applicables (TPS/TVQ) en sus. Le plan Étudiant est un abonnement mensuel renouvelé automatiquement. Le plan Sprint ÉUF est un paiement unique valable 60 jours, sans renouvellement.</p>
    <h2 className="text-xl font-bold">5. Annulation et remboursement</h2>
    <p>Vous pouvez annuler l'abonnement en tout temps depuis « Mon compte »; l'accès reste actif jusqu'à la fin de la période payée et aucun nouveau prélèvement n'est effectué. Les droits prévus par la Loi sur la protection du consommateur du Québec s'appliquent. Les achats faits dans une boutique mobile (Apple, Google) sont gérés et remboursés selon les règles de cette boutique.</p>
    <h2 className="text-xl font-bold">6. Utilisation acceptable</h2>
    <p>Interdit : contourner les limites, revendre l'accès, téléverser des contenus illicites ou les renseignements d'autrui, ou utiliser le service pour tricher lors d'une évaluation réelle.</p>
    <h2 className="text-xl font-bold">7. Propriété</h2>
    <p>Vos rédactions vous appartiennent. Vous nous autorisez à les traiter uniquement pour fournir le service.</p>
    <h2 className="text-xl font-bold">8. Responsabilité</h2>
    <p>Le service est fourni tel quel. Dans les limites permises par la loi, notre responsabilité se limite au montant payé au cours des 12 derniers mois.</p>
    <h2 className="text-xl font-bold">9. Droit applicable</h2>
    <p>Ces conditions sont régies par les lois du Québec et du Canada. Contact : <a className="underline" href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</a>.</p>
  </article></AppShell>;
}
