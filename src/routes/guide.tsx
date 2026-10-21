import { useLanguage } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ANNEXE1_EXEMPLES,
  ANNEXE1_SUJETS,
  BAREUF,
  CHOIX_POINT_DE_VUE,
  CITATIONS,
  CONSEILS_REDACTION,
  CONSIGNE_REVISION,
  COMPRENDRE_SUJET,
  COURANTS_FRANCAIS,
  COURANTS_QUEBECOIS,
  CRITERES_CORRECTION,
  DEFINITION_DISSERTATION,
  EQUIVALENCES_TERMES,
  ERREURS_A_EVITER,
  ETAPES_REDACTION,
  EXEMPLES_EXPLICATION,
  EXEMPLE_EXPLICATION_PROCEDE,
  FORMULES_EXPLICATION,
  GESTION_TEMPS,
  GRILLE_REVISION,
  INFOS_GENERALES,
  MATERIEL_JOUR_J,
  MESURES_SPECIALES,
  NOTE_EQUIVALENCES,
  NOTE_PLANS,
  PENALITES_MOTS,
  PLAN_PARAGRAPHES,
  POINTS_DE_VUE,
  PROCEDES,
  REPERAGE_IDEES,
  RESSOURCES,
  STRATEGIES_SYNTHESE,
  STRATEGIE_PLAN,
  STRUCTURE_PARTIES,
  SUJET_AMENE_STRATEGIES,
  TABLEAU_CHOIX_POINT_DE_VUE,
  TABLEAU_NUANCE,
  TABLEAU_ORGANISATEURS_1,
  TABLEAU_ORGANISATEURS_2,
  TABLEAU_PLANS_COMPARATIF,
  TABLEAU_PLANS_SIMPLE,
  TABLEAU_REPERAGE,
  TYPES_SUJET,
  VERBES_EXPLICATION,
} from "@/data/guide";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guía completa del Guide préparatoire ÉUF | Ahuntsic | EUF pro" },
      {
        name: "description",
        content:
          "Contenido íntegro del Guide préparatoire à l'épreuve uniforme de français: informaciones generales, etapas, planes, estructura, anexos y todas las tablas oficiales.",
      },
      { property: "og:title", content: "Guía completa ÉUF — Guide préparatoire | EUF pro" },
      {
        property: "og:description",
        content:
          "Todas las secciones y tablas del guide: gestión del tiempo, tipos de sujet, planes, organisateurs textuels, citas, procédés, corrientes literarias y material del día del examen.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GuidePage,
});

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl font-bold">{children}</h2>;
}

function DataTable({
  groupes,
  entetes,
  lignes,
}: {
  groupes?: string[];
  entetes: string[];
  lignes: string[][];
}) {
  const span = groupes ? Math.ceil(entetes.length / groupes.length) : 0;
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          {groupes && (
            <tr className="bg-secondary/70">
              {groupes.map((g, i) => (
                <th
                  key={g}
                  colSpan={i === 0 ? span : entetes.length - span}
                  className="border border-border px-3 py-2 text-left font-semibold"
                >
                  {g}
                </th>
              ))}
            </tr>
          )}
          <tr className="bg-secondary/40">
            {entetes.map((h, i) => (
              <th key={`${h}-${i}`} className="border border-border px-3 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((ligne, i) => (
            <tr key={i} className="align-top odd:bg-background even:bg-secondary/20">
              {ligne.map((cell, j) => (
                <td key={j} className="border border-border px-3 py-2 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bullets({ items, marker = "◇" }: { items: string[]; marker?: string }) {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <span className="text-primary">{marker}</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function GuidePage() {
  const { t, locale, direction } = useLanguage();
  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-3">
          <Badge variant="secondary">Guide préparatoire · Collège Ahuntsic</Badge>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{t("Guía completa de la dissertation critique")}</h1>
          <p className="max-w-3xl text-muted-foreground">{t("Todo el contenido del guide préparatoire, incluidas sus tablas: informaciones generales, gestión del tiempo, las siete etapas de redacción, la estructura de cada parte y los nueve anexos.")}</p>
        </header>

        <Tabs dir={direction} defaultValue="infos" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="infos">{t("Informaciones")}</TabsTrigger>
            <TabsTrigger value="temps">{t("Tiempo")}</TabsTrigger>
            <TabsTrigger value="etapes">{t("Etapas")}</TabsTrigger>
            <TabsTrigger value="sujet">{t("Sujet")}</TabsTrigger>
            <TabsTrigger value="plan">{t("Plan")}</TabsTrigger>
            <TabsTrigger value="structure">{t("Estructura")}</TabsTrigger>
            <TabsTrigger value="marqueurs">{t("Marcadores")}</TabsTrigger>
            <TabsTrigger value="citations">{t("Citas y procédés")}</TabsTrigger>
            <TabsTrigger value="courants">{t("Corrientes")}</TabsTrigger>
            <TabsTrigger value="revision">{t("Revisión")}</TabsTrigger>
            <TabsTrigger value="annexes">{t("Anexos")}</TabsTrigger>
          </TabsList>

          {/* INFORMACIONES GENERALES */}
          <TabsContent dir="ltr" lang="fr" value="infos" className="space-y-4">
            <SectionTitle>Informations générales</SectionTitle>
            <Card>
              <CardContent className="pt-6">
                <Bullets items={INFOS_GENERALES} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mesures spéciales</CardTitle>
              </CardHeader>
              <CardContent>
                <Bullets items={MESURES_SPECIALES} marker="‣" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Critères de correction</CardTitle>
                <CardDescription>Triple seuil de réussite.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Bullets items={CRITERES_CORRECTION} />
                <div className="space-y-2">
                  {PENALITES_MOTS.map((p) => (
                    <div
                      key={p.seuil}
                      className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
                    >
                      <span>{p.seuil}</span>
                      <Badge
                        variant={p.ton === "bad" ? "destructive" : p.ton === "warn" ? "outline" : "secondary"}
                      >
                        {p.effet}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dissertation critique</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {DEFINITION_DISSERTATION}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TIEMPO */}
          <TabsContent dir="ltr" lang="fr" value="temps" className="space-y-4">
            <SectionTitle>Gestion du temps durant l'épreuve (4 h 30)</SectionTitle>
            <p className="max-w-3xl text-sm text-muted-foreground">
              La planification du temps est essentielle pour garder du temps pour la révision
              linguistique : la majorité des échecs sont attribuables au nombre de fautes de français.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {GESTION_TEMPS.map((bloc) => (
                <Card key={bloc.etape}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{bloc.etape}</CardTitle>
                      <Badge>{bloc.duree}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Bullets items={bloc.points} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ETAPAS */}
          <TabsContent dir="ltr" lang="fr" value="etapes" className="space-y-4">
            <SectionTitle>Étapes de rédaction</SectionTitle>
            {ETAPES_REDACTION.map((e) => (
              <Card key={e.numero}>
                <CardHeader className="pb-2">
                  <CardDescription>{e.numero}</CardDescription>
                  <CardTitle className="text-base">{e.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Bullets items={e.contenu} marker="☞" />
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Étape 3</CardDescription>
                <CardTitle className="text-base">Repérage des idées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Bullets items={REPERAGE_IDEES} />
                <p className="text-sm font-medium">{TABLEAU_REPERAGE.sujet}</p>
                <DataTable entetes={TABLEAU_REPERAGE.colonnes} lignes={TABLEAU_REPERAGE.lignes} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Étape 4</CardDescription>
                <CardTitle className="text-base">Choix du point de vue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTable
                  entetes={TABLEAU_CHOIX_POINT_DE_VUE.entetes}
                  lignes={TABLEAU_CHOIX_POINT_DE_VUE.lignes}
                />
                {CHOIX_POINT_DE_VUE.map((c) => (
                  <div key={t(c.titre)} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-semibold">{t(c.titre)}</p>
                    <div className="mt-2">
                      <Bullets items={c.points} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUJET */}
          <TabsContent dir="ltr" lang="fr" value="sujet" className="space-y-4">
            <SectionTitle>Étape 2 : Compréhension du sujet</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {COMPRENDRE_SUJET.map((c) => (
                <Card key={t(c.titre)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{t(c.titre)}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="text-muted-foreground">{c.contenu}</p>
                    {c.exemples.map((e) => (
                      <p key={e} className="rounded-lg bg-secondary/60 p-3 italic">
                        {e}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionTitle>Identifier le type de sujet</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {TYPES_SUJET.map((t) => (
                <Card key={t.type}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{t.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="text-muted-foreground">{t.desc}</p>
                    <p className="rounded-lg bg-secondary/60 p-3 italic">{t.exemple}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionTitle>Déterminer les principaux points de vue</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {POINTS_DE_VUE.map((p) => (
                <Card key={p.titre}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{p.titre}</CardTitle>
                    <CardDescription>{p.detail}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="rounded-lg bg-secondary/60 p-3 text-sm italic">{p.exemple}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PLAN */}
          <TabsContent dir="ltr" lang="fr" value="plan" className="space-y-4">
            <SectionTitle>Étape 5 : Plans possibles</SectionTitle>
            {[TABLEAU_PLANS_SIMPLE, TABLEAU_PLANS_COMPARATIF].map((t) => (
              <Card key={t.titre}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{t.titre}</CardTitle>
                  <CardDescription>{t.exemple}</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable groupes={t.groupes} entetes={t.entetes} lignes={t.lignes} />
                </CardContent>
              </Card>
            ))}
            <p className="text-xs text-muted-foreground">{NOTE_PLANS}</p>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Stratégie : rédaction du plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Bullets items={STRATEGIE_PLAN} />
                <div className="flex flex-wrap gap-2">
                  {EQUIVALENCES_TERMES.map((e) => (
                    <Badge key={e} variant="secondary">
                      {e}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{NOTE_EQUIVALENCES}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Parties de la dissertation (plan)</CardTitle>
                <CardDescription>Introduction · Développement · Conclusion</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {[
                  { titre: "1re possibilité — plan en 2 paragraphes", lignes: PLAN_PARAGRAPHES.deux },
                  { titre: "2e possibilité — plan en 3 paragraphes", lignes: PLAN_PARAGRAPHES.trois },
                ].map((c) => (
                  <div key={t(c.titre)} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-semibold">{t(c.titre)}</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {c.lignes.map((l, i) => (
                        <li key={`${l}-${i}`}>{l}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <SectionTitle>Annexe 3 : stratégies d'argumentation (3e paragraphe)</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {STRATEGIES_SYNTHESE.map((s) => (
                <Card key={s.titre}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{s.titre}</CardTitle>
                    {s.sujet && <CardDescription>{s.sujet}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Arguments précédents
                      </p>
                      <Bullets items={s.precedents} marker="✧" />
                    </div>
                    <p className="rounded-lg bg-secondary/60 p-3 italic">{s.synthese}</p>
                    {s.marqueurs && <p className="text-muted-foreground">{s.marqueurs}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ESTRUCTURA */}
          <TabsContent dir="ltr" lang="fr" value="structure" className="space-y-4">
            <SectionTitle>Parties de la dissertation</SectionTitle>
            {STRUCTURE_PARTIES.map((s) => (
              <Card key={s.partie}>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-base">{s.partie}</CardTitle>
                    <Badge variant="secondary">{s.mots}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {s.elements.map((e) => (
                    <div key={e.nom} className="rounded-lg border border-border p-3">
                      <p className="text-sm font-semibold">{e.nom}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Formulation nuancée des points de vue (erreurs et corrections)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable entetes={TABLEAU_NUANCE.entetes} lignes={TABLEAU_NUANCE.lignes} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Annexe 1 : stratégies pour le sujet amené</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {SUJET_AMENE_STRATEGIES.map((s) => (
                  <div key={s.titre} className="rounded-lg bg-secondary/50 p-3 text-sm">
                    <p className="font-semibold">{s.titre}</p>
                    <p className="text-muted-foreground">{s.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* MARCADORES */}
          <TabsContent dir="ltr" lang="fr" value="marqueurs" className="space-y-4">
            <SectionTitle>Annexe 4 : organisateurs textuels</SectionTitle>
            <Card>
              <CardContent className="pt-6">
                <DataTable
                  groupes={TABLEAU_ORGANISATEURS_1.groupes}
                  entetes={TABLEAU_ORGANISATEURS_1.entetes}
                  lignes={TABLEAU_ORGANISATEURS_1.lignes}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <DataTable
                  groupes={TABLEAU_ORGANISATEURS_2.groupes}
                  entetes={TABLEAU_ORGANISATEURS_2.entetes}
                  lignes={TABLEAU_ORGANISATEURS_2.lignes}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Conseils de rédaction</CardTitle>
              </CardHeader>
              <CardContent>
                <Bullets items={CONSEILS_REDACTION} marker="☞" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* CITAS */}
          <TabsContent dir="ltr" lang="fr" value="citations" className="space-y-4">
            <SectionTitle>Annexe 5 : intégration des citations</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {CITATIONS.map((c) => (
                <Card key={c.cas}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{c.cas}</CardTitle>
                    <CardDescription>{c.regle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="rounded-lg bg-secondary/60 p-3 text-sm italic">{c.exemple}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <SectionTitle>Annexe 6 : expliquer l'effet et le sens d'un procédé</SectionTitle>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Formules</CardTitle>
                <CardDescription>Démarche : mot / procédé + effet / sens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Bullets items={FORMULES_EXPLICATION} />
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {VERBES_EXPLICATION.map((v) => (
                    <li key={v} className="rounded-md bg-secondary/50 px-3 py-2">
                      {v}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  {EXEMPLES_EXPLICATION.map((e) => (
                    <p key={e} className="rounded-lg bg-secondary/60 p-3 text-sm italic">
                      {e}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Exemple d'analyse détaillée</CardTitle>
                <CardDescription>{EXEMPLE_EXPLICATION_PROCEDE.citation}</CardDescription>
              </CardHeader>
              <CardContent>
                <Bullets items={EXEMPLE_EXPLICATION_PROCEDE.analyses} marker="◇" />
              </CardContent>
            </Card>

            <SectionTitle>Annexe 7 : mini-guide des procédés d'écriture</SectionTitle>
            <Accordion type="multiple" className="rounded-xl border border-border px-4">
              {PROCEDES.map((f) => (
                <AccordionItem key={f.famille} value={f.famille}>
                  <AccordionTrigger className="text-sm font-semibold">
                    Figures — {f.famille}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {f.items.map((i) => (
                      <div key={i.nom} className="rounded-lg border border-border p-3 text-sm">
                        <p className="font-semibold">{i.nom}</p>
                        <p className="text-muted-foreground">{i.def}</p>
                        <Separator className="my-2" />
                        <p>
                          <span className="font-medium">Effet : </span>
                          <span className="text-muted-foreground">{i.effet}</span>
                        </p>
                        <p className="mt-1 italic text-muted-foreground">{i.ex}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* CORRIENTES */}
          <TabsContent dir="ltr" lang="fr" value="courants" className="space-y-6">
            {[
              { titre: "Annexe 2a : courants littéraires français", data: COURANTS_FRANCAIS },
              { titre: "Annexe 2b : courants littéraires québécois", data: COURANTS_QUEBECOIS },
            ].map((bloc) => (
              <div key={bloc.titre} className="space-y-3">
                <SectionTitle>{bloc.titre}</SectionTitle>
                <DataTable
                  entetes={["Époques", "Courants littéraires", "Caractéristiques", "Auteurs et œuvres"]}
                  lignes={bloc.data.map((c) => [c.epoque, c.courant, c.traits, c.auteurs])}
                />
              </div>
            ))}
          </TabsContent>

          {/* REVISIÓN */}
          <TabsContent dir="ltr" lang="fr" value="revision" className="space-y-4">
            <SectionTitle>Grille de révision de la langue</SectionTitle>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{CONSIGNE_REVISION}</CardDescription>
              </CardHeader>
              <CardContent>
                <Bullets items={GRILLE_REVISION} marker="❑" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Liste d'erreurs à éviter lors de l'EUF</CardTitle>
              </CardHeader>
              <CardContent>
                <Bullets items={ERREURS_A_EVITER} marker="☞" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANEXOS */}
          <TabsContent dir="ltr" lang="fr" value="annexes" className="space-y-4">
            <SectionTitle>Annexe 1 : sujets et exemples de sujet amené</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {ANNEXE1_SUJETS.map((s) => (
                <Card key={s.rang}>
                  <CardHeader className="pb-2">
                    <CardDescription>{s.rang}</CardDescription>
                    <CardTitle className="text-base">{s.enonce}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bullets items={s.notices} marker="▶" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-3">
              {ANNEXE1_EXEMPLES.map((e) => (
                <Card key={e.strategie}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{e.strategie}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="rounded-lg bg-secondary/60 p-3 text-sm italic">{e.texte}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <SectionTitle>Annexe 8 : préparation à l'épreuve</SectionTitle>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{BAREUF.titre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Bullets items={BAREUF.points} />
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold underline"
                  href={BAREUF.inscription}
                  target="_blank"
                  rel="noreferrer"
                >
                  Formulaire d'inscription <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>
            <div className="grid gap-3 md:grid-cols-2">
              {RESSOURCES.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border p-4 transition-colors hover:bg-secondary/60"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {r.nom}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </a>
              ))}
            </div>

            <SectionTitle>Annexe 9 : matériel à apporter le jour de l'épreuve</SectionTitle>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <Bullets items={MATERIEL_JOUR_J.intro} marker="‣" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm font-semibold text-success">Sont permis</p>
                    <div className="mt-2">
                      <Bullets items={MATERIEL_JOUR_J.permis} marker="✓" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-sm font-semibold text-destructive">Sont interdits</p>
                    <div className="mt-2">
                      <Bullets items={MATERIEL_JOUR_J.interdits} marker="✕" />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <Bullets items={MATERIEL_JOUR_J.suggestions} marker="◇" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Outils indispensables</p>
                  <div className="mt-2">
                    <Bullets items={MATERIEL_JOUR_J.outils} marker="☞" />
                  </div>
                </div>
                <p className="text-sm font-semibold">IMPORTANT : {MATERIEL_JOUR_J.important}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
