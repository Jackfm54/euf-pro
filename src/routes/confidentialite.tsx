import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/components/LanguageProvider";
import { LEGAL_VERSION, PRIVACY_CONTACT } from "@/lib/legal";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({ meta: [
    { title: "Politique de confidentialité | ÉUF pro" },
    { name: "description", content: "Comment ÉUF pro recueille, utilise et protège vos renseignements personnels (Loi 25, Québec)." },
    { property: "og:title", content: "Politique de confidentialité · ÉUF pro" },
    { property: "og:description", content: "Renseignements recueillis, finalités, conservation et vos droits." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLanguage();
  return <AppShell><article lang="fr" dir="ltr" className="prose-legal mx-auto max-w-3xl space-y-5 text-sm leading-relaxed">
    <p className="rounded-md border bg-secondary p-3 text-xs" dir="auto">{t("Documento legal disponible en francés.")}</p>
    <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
    <p className="text-muted-foreground">Version du {LEGAL_VERSION}</p>
    <h2 className="text-xl font-bold">1. Responsable</h2>
    <p>ÉUF pro est un outil indépendant de préparation à l'Épreuve uniforme de français. La personne responsable de la protection des renseignements personnels peut être jointe à : <a className="underline" href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</a>.</p>
    <h2 className="text-xl font-bold">2. Renseignements recueillis</h2>
    <ul className="list-disc ps-6"><li>Compte : nom, adresse courriel, mot de passe (chiffré).</li><li>Contenus : rédactions, photos de copies manuscrites, notes et commentaires générés.</li><li>Utilisation : nombre de corrections, plan choisi, dates d'activité.</li><li>Technique : erreurs de l'application (message, date), sans contenu de rédaction.</li><li>Préférences sur l'appareil : langue et brouillon, gardés dans le stockage local du navigateur ou de l'application.</li></ul>
    <h2 className="text-xl font-bold">3. Finalités</h2>
    <p>Fournir le compte, corriger les rédactions, conserver la progression, gérer les plans, prévenir les abus et corriger les pannes. Aucune vente de renseignements, aucune publicité ciblée.</p>
    <h2 className="text-xl font-bold">4. Intelligence artificielle</h2>
    <p>Le texte de votre rédaction (ou la photo) est transmis à un fournisseur d'intelligence artificielle pour produire une évaluation automatique. Cette évaluation est une estimation et ne remplace ni la correction officielle ni un enseignant. N'incluez pas de renseignements personnels dans vos rédactions.</p>
    <h2 className="text-xl font-bold">5. Communication hors Québec</h2>
    <p>Les données sont hébergées par des fournisseurs infonuagiques (base de données, hébergement web, intelligence artificielle et, le cas échéant, paiement par Stripe) dont les serveurs peuvent être situés hors du Québec, notamment aux États-Unis. Une évaluation des facteurs relatifs à la vie privée a été ou sera réalisée avant ces communications.</p>
    <h2 className="text-xl font-bold">6. Paiements</h2>
    <p>Les paiements sont traités par Stripe. ÉUF pro ne conserve jamais les numéros de carte.</p>
    <h2 className="text-xl font-bold">7. Conservation</h2>
    <p>Les données sont conservées tant que le compte est actif. À la suppression du compte, elles sont effacées dans un délai de 30 jours, sauf les renseignements de facturation que la loi oblige à conserver.</p>
    <h2 className="text-xl font-bold">8. Vos droits</h2>
    <p>Vous pouvez accéder à vos renseignements, les faire rectifier, retirer votre consentement et supprimer votre compte en tout temps depuis « Mon compte », sur le web comme dans l'application mobile. Vous pouvez aussi porter plainte à la Commission d'accès à l'information du Québec.</p>
    <h2 className="text-xl font-bold">9. Mineurs</h2>
    <p>Le service s'adresse aux étudiants de niveau collégial. Les personnes de moins de 14 ans doivent obtenir le consentement d'un parent ou tuteur.</p>
    <h2 className="text-xl font-bold">10. Sécurité et incidents</h2>
    <p>Connexions chiffrées, accès restreint par compte. Tout incident de confidentialité présentant un risque sérieux sera signalé aux personnes concernées et à la Commission.</p>
  </article></AppShell>;
}
