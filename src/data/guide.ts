// Contenido íntegro del "Guide préparatoire à l'épreuve uniforme de français"
// Département de français et de lettres — Collège Ahuntsic

/* ---------------------------------------------------------------- INFOS */

export const INFOS_GENERALES = [
  "Évaluation essentielle à l'obtention du diplôme d'études collégiales (DEC).",
  "Rédaction d'une dissertation critique d'environ 900 mots à partir d'un choix de trois sujets accompagnés chacun d'un ou deux extraits de textes littéraires.",
  "Moments de passation de l'examen : décembre, mai, août.",
  "Durée de l'épreuve : 4 h 30 (entre 8 h 30 et 13 h).",
  "Lieu de passation : information disponible dans Léa sous la rubrique « Horaire-session d'examens ».",
  "Matériel à apporter le jour de l'épreuve (voir l'annexe 9).",
  "Nombre de reprises illimitées et sans frais.",
  "Les élèves qui suivent le cours de littérature québécoise (103) et ceux qui ont échoué à l'épreuve mais qui suivent toujours des cours au Collège Ahuntsic sont automatiquement inscrits à l'épreuve.",
  "Les élèves qui ne suivent plus aucun cours au Collège Ahuntsic doivent manifester leur intention de s'inscrire à la prochaine épreuve à l'adresse api@collegeahuntsic.qc.ca.",
  "Les demandes pour s'inscrire à l'épreuve ou obtenir des mesures spéciales doivent se faire avant le 10 avril (épreuve de mai), le 10 juin (épreuve d'août) et le 10 novembre (épreuve de décembre).",
  "Le résultat est inscrit sur Omnivox (réussite [RE] ou échec [EC]) et un relevé est envoyé par la poste dans un délai d'un mois (statut prioritaire) ou de deux mois (statut normal).",
];

export const MESURES_SPECIALES = [
  "Les élèves qui ont déjà un dossier au SAIDE bénéficient des mesures habituelles et n'ont pas à faire de demande.",
  "Pour une incapacité auditive, motrice, neurologique, organique ou visuelle, des troubles de santé mentale, des troubles envahissants du développement, des troubles d'apprentissage ou des troubles du déficit de l'attention : écrire à saide@collegeahuntsic.qc.ca.",
  "Les élèves allophones qui ont fait la majorité de leurs études hors du Québec dans une langue autre que le français et ceux qui ont fait une partie de leurs études primaires dans une langue autochtone peuvent bénéficier d'une heure supplémentaire (saide@collegeahuntsic.qc.ca).",
];

export const CRITERES_CORRECTION = [
  "Trois critères de correction : le contenu, la structure et la langue (maximum de 30 fautes sur 900 mots).",
  "Triple seuil de réussite : l'échec à l'un des trois critères entraine un échec automatique à l'épreuve uniforme de français.",
  "La plupart des échecs sont causés par le critère « langue » : bien gérer son temps pour garder du temps de révision linguistique.",
  "Certaines pénalités sont infligées en fonction du nombre de mots rédigés, qui comprennent les citations. En cas de doute, les mots sont recomptés.",
];

export const PENALITES_MOTS = [
  { seuil: "800 mots et plus", effet: "Aucune pénalité", ton: "ok" },
  { seuil: "Entre 600 et 799 mots", effet: "Pénalité", ton: "warn" },
  { seuil: "Moins de 600 mots", effet: "Échec automatique", ton: "bad" },
];

/* ---------------------------------------------------------------- TEMPS */

export const GESTION_TEMPS = [
  {
    etape: "Préparation",
    duree: "1 h 30",
    points: [
      "Choisissez le sujet rapidement en lisant les trois énoncés proposés et en survolant les textes. Ne perdez pas de temps à cette étape.",
      "Assurez-vous de comprendre les mots-clés du sujet choisi.",
      "Lisez attentivement les textes. Faites un repérage des idées, des preuves et des procédés d'écriture.",
      "Déterminez le point de vue à défendre.",
      "Faites le plan (détaillé ou efficace) de votre dissertation. Assurez-vous que vos arguments sont clairs, cohérents et qu'il n'y a pas de répétitions.",
    ],
  },
  {
    etape: "Rédaction — développement",
    duree: "1 h 30",
    points: [
      "Laissez passer une page pour l'introduction et rédigez d'abord le développement (600 à 700 mots).",
      "Rédigez tout de suite à l'encre au propre. Le brouillon doit être réservé pour les parties les plus difficiles.",
      "Mettez une étoile à côté des mots que vous souhaitez vérifier dans le dictionnaire.",
    ],
  },
  {
    etape: "Rédaction — introduction et conclusion",
    duree: "30 min",
    points: ["Rédigez l'introduction et la conclusion (100 à 150 mots chacune)."],
  },
  {
    etape: "Révision",
    duree: "1 h",
    points: [
      "Prenez une pause de 10 minutes.",
      "Faites une révision linguistique rigoureuse. Les fautes de français sont la principale cause d'échec (30 fautes maximum).",
      "Concentrez-vous sur vos fautes fréquentes.",
    ],
  },
];

/* -------------------------------------------------------------- ÉTAPES */

export const ETAPES_REDACTION = [
  {
    numero: "Étape 1",
    titre: "Choix du sujet",
    contenu: [
      "Lisez les énoncés des trois sujets et choisissez celui qui vous convient le mieux en survolant rapidement les extraits.",
      "Effectuez cette étape rapidement (20 minutes). Éliminez les énoncés que vous ne comprenez pas d'emblée, les sujets qui nécessitent un plan que vous ne maîtrisez pas et les genres littéraires avec lesquels vous ne vous sentez pas à l'aise.",
    ],
  },
  {
    numero: "Étape 6",
    titre: "Rédaction",
    contenu: [
      "Rédiger le développement avant l'introduction en passant la première page.",
      "Identifier à l'aide d'une étoile les mots que vous devrez chercher dans le dictionnaire.",
      "Rédiger à l'indicatif présent.",
      "Utiliser un style neutre : éviter « je », « tu », « vous »; éviter le ton expressif (adjectifs, point d'exclamation), l'opinion personnelle ou le jugement sur les personnages.",
      "ERREUR : « À l'aide d'une belle métaphore, l'auteur montre à quel point le comportement du héros est stupide! »",
      "Formuler des explications qui portent directement sur l'extrait à l'étude, sans formulations générales sur la vie ou l'être humain (ERREUR : « Un fils doit toujours aimer sa mère, même lorsqu'elle devient vieille. »).",
      "Passer une ligne entre chaque paragraphe et le faire commencer par un alinéa (environ 2 cm).",
      "Souligner le titre de l'œuvre complète ou encadrer de guillemets français (« ») le titre d'un extrait ou d'une partie d'une œuvre (conte, nouvelle, poème d'un recueil).",
      "Indiquer les références des citations (lignes) entre parenthèses après chaque citation. EXEMPLE : « […] » (l. 25-28).",
      "Employer les organisateurs textuels et les marqueurs de relation adéquatement (annexe 4).",
    ],
  },
  {
    numero: "Étape 7",
    titre: "Révision",
    contenu: [
      "Étape cruciale : gérez bien votre temps de rédaction pour pouvoir réviser le contenu et la langue.",
      "Ciblez vos erreurs les plus fréquentes pour une correction stratégique et efficace.",
      "Plus de 30 fautes pour 900 mots = échec à l'épreuve.",
    ],
  },
];

export const DEFINITION_DISSERTATION =
  "La dissertation critique est un exposé écrit et raisonné sur un sujet qui porte à discussion. L'élève doit prendre position sur le sujet proposé, soutenir son point de vue à l'aide d'arguments pertinents et de preuves tirées des textes présentés, et fournir des explications sur chaque preuve en s'appuyant sur des procédés d'écriture.";

/* Étape 2 : compréhension du sujet */

export const COMPRENDRE_SUJET = [
  {
    titre: "Consigne critique",
    contenu:
      "Partie de la phrase où l'on vous demande de prendre position. L'énoncé peut être une question ou une affirmation : dans tous les cas, on le considère comme une question qui exige une prise de position. Tous les points de vue sont acceptables s'ils sont bien défendus.",
    exemples: [
      "Question : Peut-on dire que, dans la pièce Zone, Ciboulette et Tarzan vivent dans l'illusion?",
      "Affirmation : Dans la pièce Zone, Ciboulette et Tarzan vivent dans l'illusion. Discutez.",
      "Mots qui indiquent la prise de position : peut-on dire, est-il vrai de dire, est-il juste d'affirmer, discutez…",
    ],
  },
  {
    titre: "Éléments à analyser",
    contenu: "Les textes, les auteurs ou les personnages à analyser.",
    exemples: [
      "« Tit-Paul la Pitoune » de Gilles Vigneault et « Le Grand six-pied » de Claude Gauthier → éléments : les deux chansons.",
      "Peut-on dire que, dans la pièce Zone, Ciboulette et Tarzan vivent dans l'illusion? → éléments : Ciboulette et Tarzan.",
    ],
  },
  {
    titre: "Sujet de la discussion (dilemme)",
    contenu:
      "Sujet à propos duquel il faut prendre position. Un seul terme du dilemme est donné dans la question; le deuxième, généralement son contraire, se déduit du texte ou se trouve dans le dictionnaire. Parfois, le dilemme est fondé sur une comparaison.",
    exemples: [
      "« La femme est présentée comme un être angélique » → femme = angélique ou diabolique?",
      "« Les deux filles entretiennent une relation semblable avec leur mère » → relation = semblable ou différente?",
    ],
  },
  {
    titre: "Chercher les mots-clés dans le dictionnaire",
    contenu:
      "Notez la définition, les mots de la même famille, les synonymes et les antonymes des mots-clés du sujet de la discussion. Vérifiez bien le sens des synonymes et antonymes trouvés : ils serviront à formuler vos arguments.",
    exemples: [
      "MOT-CLÉ : angélique — Définition : qui évoque la perfection, l'innocence de l'ange.",
      "Même famille : ange · Synonymes : céleste, parfait · Antonymes : démoniaque, diabolique.",
    ],
  },
];

export const TYPES_SUJET = [
  {
    type: "Sujet simple",
    desc: "Contient un seul élément à analyser : un seul texte et un seul personnage.",
    exemple:
      "Dans le conte « Le paysan devenu médecin », le paysan est présenté comme une victime. Discutez.",
  },
  {
    type: "Sujet complexe",
    desc: "Contient au moins deux éléments à analyser, généralement deux ou plusieurs personnages.",
    exemple:
      "Est-il juste d'affirmer que, dans Cendres de cailloux de Daniel Danis, les personnages de Clermont et de Shirley font preuve de faiblesse?",
  },
  {
    type: "Sujet comparatif",
    desc: "Contient deux éléments à analyser (textes ou personnages) qui doivent être comparés : ressemblances et différences. Mots-clés : de la même façon, semblable, similaire, le même, différent…",
    exemple:
      "Est-il juste de dire que, dans les deux extraits, les dernières heures du condamné sont différentes?",
  },
];

export const POINTS_DE_VUE = [
  {
    titre: "Point de vue OUI",
    detail: "On transforme la question en affirmation.",
    exemple: "La femme est présentée comme un être angélique.",
  },
  {
    titre: "Point de vue NON",
    detail: "On emploie la négation ou une formulation contraire.",
    exemple:
      "La femme n'est pas présentée comme un être angélique. / La femme est présentée comme un être diabolique.",
  },
];

/* Étape 3 : repérage des idées */

export const REPERAGE_IDEES = [
  "En lisant les textes, surlignez avec deux marqueurs de couleurs différentes les passages qui pourraient servir de preuves pour le point de vue OUI et pour le point de vue NON. Numéroter ces passages fait gagner du temps.",
  "Sans marqueurs : soulignez les passages et utilisez + pour OUI et – pour NON.",
  "Dans la marge, notez les idées (les aspects du sujet) qui se dégagent des passages choisis à l'aide de mots-clés : ils serviront à formuler vos arguments.",
  "Notez au passage les procédés d'écriture remarqués (figures de style, ponctuation, vocabulaire, tonalité…).",
  "Classez ensuite vos idées dans un tableau OUI / NON en notant la référence de chaque preuve (ex. : l. 25-26).",
];

export const TABLEAU_REPERAGE = {
  sujet: "Dans ce poème, Nelligan vise à célébrer la jeunesse de sa mère. Discutez.",
  colonnes: [
    "OUI → célèbre la jeunesse de sa mère",
    "NON → ne célèbre pas la jeunesse de sa mère / aborde sa vieillesse",
  ],
  lignes: [
    [
      "◇ Il évoque sa beauté physique d'autrefois. (l. 3-4)",
      "◇ Il constate avec tristesse les ravages du temps sur son corps. (l. 6)",
    ],
    ["◇ …", "◇ …"],
  ],
};

/* Étape 4 : choix du point de vue */

export const TABLEAU_CHOIX_POINT_DE_VUE = {
  entetes: ["Arguments", "Point de vue"],
  lignes: [
    ["Majorité de OUI ou de NON (suffisamment pour faire trois paragraphes)", "Unique"],
    ["Nombre ± égal de OUI et de NON", "Nuancé"],
  ],
};

export const CHOIX_POINT_DE_VUE = [
  {
    titre: "a) Point de vue unique",
    points: [
      "On répond OUI ou NON à la question : tous les arguments appuient un seul et même point de vue.",
      "Il peut être développé en deux ou trois paragraphes; généralement, il est préférable d'en faire trois.",
    ],
  },
  {
    titre: "b) Point de vue nuancé",
    points: [
      "On explore le point de vue OUI, puis le point de vue NON.",
      "Dans un plan dialectique, le troisième paragraphe présente la prise de position finale.",
      "Pour certains sujets, il est plus logique de faire deux paragraphes.",
    ],
  },
  {
    titre: "EXEMPLE — Jeux de massacre d'Ionesco : « le vieux et la vieille sont lucides »",
    points: [
      "Unique OUI : Le vieux et la vieille sont lucides.",
      "Unique NON : Ils ne sont pas lucides. / Ils sont aveugles, inconscients, dominés par leurs illusions.",
      "Nuancé (3 par.) : Ils sont généralement lucides, mais sont parfois inconscients.",
      "Nuancé (2 par.) : La vieille est lucide, tandis que le vieux est inconscient.",
    ],
  },
];

/* Étape 5 : plans */

export const TABLEAU_PLANS_SIMPLE = {
  titre: "Sujet simple ou complexe",
  exemple:
    "EXEMPLE : Dans le conte « Le paysan devenu médecin », le paysan est présenté comme une victime. Discutez.",
  groupes: [
    "Plan démonstratif ou par accumulation (point de vue unique)",
    "Plan dialectique ou par confrontation (point de vue nuancé)",
  ],
  entetes: ["", "1re possibilité", "2e possibilité", "1re possibilité", "2e possibilité"],
  lignes: [
    ["Par. 1", "OUI", "NON", "OUI", "NON"],
    ["Par. 2", "OUI", "NON", "NON", "OUI"],
    ["Par. 3", "(OUI)*", "(NON)*", "Point de vue final", "Point de vue final"],
  ],
};

export const TABLEAU_PLANS_COMPARATIF = {
  titre: "Sujet comparatif",
  exemple:
    "EXEMPLE : Dans Le ciel de Bay City de Catherine Mavrikakis et dans Apocalypse bébé de Virginie Despentes, les deux héroïnes vivent la culpabilité de la même manière. Discutez.",
  groupes: [
    "Plan démonstratif ou par accumulation (point de vue unique)",
    "Plan comparatif ou par confrontation (point de vue nuancé)",
  ],
  entetes: ["", "1re possibilité", "2e possibilité", "1re possibilité", "2e possibilité"],
  lignes: [
    ["Par. 1", "Ressemblance", "Différence", "Ressemblance", "Différence"],
    ["Par. 2", "Ressemblance", "Différence", "Différence", "Ressemblance"],
    ["Par. 3", "(Ressemblance)*", "(Différence)*", "Point de vue final", "Point de vue final"],
  ],
};

export const NOTE_PLANS = "* Les parenthèses indiquent que le troisième paragraphe n'est pas obligatoire.";

// Conservé pour compatibilité : vue résumée des plans
export const PLANS = [
  {
    nom: "Plan démonstratif (accumulation)",
    lignes: ["Par. 1 : OUI", "Par. 2 : OUI", "Par. 3 : (OUI)*"],
    note: "Point de vue unique. Le 3e paragraphe n'est pas obligatoire, mais il est préférable.",
  },
  {
    nom: "Plan dialectique (confrontation)",
    lignes: ["Par. 1 : thèse", "Par. 2 : antithèse", "Par. 3 : synthèse"],
    note: "Point de vue nuancé : le 3e paragraphe présente la prise de position finale.",
  },
  {
    nom: "Plan comparatif",
    lignes: ["Par. 1 : ressemblance", "Par. 2 : différence", "Par. 3 : point de vue final"],
    note: "Pour un sujet comparatif : mise en relation des deux textes ou personnages.",
  },
];

export const STRATEGIE_PLAN = [
  "Avant de commencer la rédaction, il est primordial d'organiser sous forme de plan les arguments et les preuves trouvés lors du repérage.",
  "Dans le plan, on note seulement les arguments sous forme de phrases courtes ou de mots-clés, et les lignes des citations choisies.",
  "Un plan permet d'éviter les répétitions d'arguments, les contradictions, le manque de clarté ou la faiblesse de certains arguments.",
  "Au besoin, certaines parties plus difficiles (sujet amené, explications…) seront rédigées au brouillon.",
  "Cette stratégie est idéale à l'épreuve uniforme : elle permet une meilleure gestion du temps.",
  "Le plan n'est pas corrigé à l'épreuve.",
  "Le plan détaillé demandé en classe est formateur, mais ne convient pas à la limite de temps de l'épreuve. Il en va de même pour le brouillon.",
];

export const EQUIVALENCES_TERMES = [
  "ARGUMENT = IDÉE",
  "PREUVE = EXEMPLE",
  "EXPLICATION = COMMENTAIRE",
];

export const NOTE_EQUIVALENCES =
  "La plupart des enseignants distinguent, dans le paragraphe de développement, l'idée principale des idées secondaires. Cette hiérarchisation n'est pas exigée pour la rédaction de l'EUF.";

export const PLAN_PARAGRAPHES = {
  deux: [
    "Paragraphe 1",
    "‣ Point de vue (ou argument principal)",
    "• Argument 1 — Preuve (contexte + citation) — Explication",
    "• Argument 2 — Preuve (contexte + citation) — Explication",
    "• Argument 3 — Preuve (contexte + citation) — Explication",
    "‣ Clôture",
    "Paragraphe 2",
    "‣ Point de vue (ou argument principal)",
    "• Argument 1 — Preuve (contexte + citation) — Explication",
    "• Argument 2 — Preuve (contexte + citation) — Explication",
    "• Argument 3 — Preuve (contexte + citation) — Explication",
    "‣ Clôture",
  ],
  trois: [
    "Paragraphe 1",
    "‣ Point de vue (ou argument principal)",
    "• Argument 1 — Preuve (contexte + citation) — Explication",
    "• Argument 2 — Preuve (contexte + citation) — Explication",
    "‣ Clôture",
    "Paragraphe 2",
    "‣ Point de vue (ou argument principal)",
    "• Argument 1 — Preuve (contexte + citation) — Explication",
    "• Argument 2 — Preuve (contexte + citation) — Explication",
    "‣ Clôture",
    "Paragraphe 3",
    "‣ Point de vue (ou argument principal)",
    "• Argument 1 — Preuve (contexte + citation) — Explication",
    "• Argument 2 — Preuve (contexte + citation) — Explication",
    "‣ Clôture",
  ],
};

/* Structure */

export const STRUCTURE_PARTIES = [
  {
    partie: "Introduction",
    mots: "100-150 mots",
    elements: [
      {
        nom: "Sujet amené",
        detail:
          "Situe l'œuvre en 2 à 4 phrases (époque, courant, thème, genre). Le nom des auteurs et le titre des œuvres doivent être mentionnés. Il évite les généralités et les lieux communs (ERREURS : « Au Québec, plusieurs poètes ont publié des recueils. » / « L'amour est la chose la plus importante au monde. »). Il présente les informations du général au particulier (principe de l'entonnoir : l'auteur > son œuvre > le courant > le thème) et assure l'enchainement des idées : chaque nouvelle phrase s'appuie sur un élément de la précédente.",
      },
      {
        nom: "Sujet posé",
        detail:
          "Correspond au sujet de rédaction. On peut reprendre les mots de la question ou la reformuler en préservant le sens. Question directe : « Toutefois, peut-on dire que le héros, Joe le cook, est un personnage craintif? » Question indirecte : « À cet effet, on peut se demander si le héros, Joe le cook, est un personnage craintif. » Avec un point de vue unique, on peut l'énoncer par une affirmation : « On constate d'ailleurs que le héros, Joe le cook, est un personnage craintif. »",
      },
      {
        nom: "Sujet divisé",
        detail:
          "Annonce, dans l'ordre, les arguments de chaque paragraphe; il doit être précis. ERREUR : « Nous évaluerons le pour et le contre pour ensuite trancher la question. » CORRECTION : « D'un côté, nous pouvons affirmer que le personnage de Joe le cook est craintif parce qu'il a des réticences à entreprendre le voyage. D'un autre côté, il n'est pas que craintif, car le plaisir éprouvé lui fait oublier ses craintes. En définitive, la crainte semble malgré tout dominante chez le personnage : sa peur s'est transformée en morale. »",
      },
    ],
  },
  {
    partie: "Développement",
    mots: "600-700 mots",
    elements: [
      {
        nom: "Point de vue",
        detail:
          "Le point de vue exploré doit être clair dans chacun des paragraphes. Point de vue nuancé : Par. 1 THÈSE (marqueur d'introduction : à première vue, au départ, d'entrée de jeu, tout d'abord…); Par. 2 ANTITHÈSE (toutefois, cependant, par contre, néanmoins…); Par. 3 SYNTHÈSE (tout bien considéré, tout compte fait, en définitive, somme toute…). Évitez les contradictions : privilégiez une formulation nuancée.",
      },
      {
        nom: "Arguments",
        detail:
          "Idée générale émise sur le texte à l'étude, articulée autour d'un concept ou d'un mot-clé. Il correspond à une raison (pourquoi? « parce qu'il idéalise sa beauté ») ou à un aspect du sujet (quoi? « la beauté de sa mère »). L'argument n'est pas un exemple du texte et ne reprend jamais les mots de la citation. Minimum de deux ou trois arguments (un par paragraphe). La distinction arguments principaux / secondaires n'est pas obligatoire à l'épreuve.",
      },
      {
        nom: "Argument — sujet comparatif",
        detail:
          "L'argument principal porte sur les deux éléments comparés (aspect similaire ou différent dans les deux textes); il est subdivisé en arguments secondaires portant sur chacun des éléments. EXEMPLE — OUI : « Les personnages ont la même attitude romantique » (1. le premier a recours à la poésie; 2. le deuxième écrit des chansons). NON : « Les personnages n'ont pas les mêmes priorités » (1. l'un veut passer sa vie avec sa partenaire; 2. l'autre veut vivre des moments intenses).",
      },
      {
        nom: "Argument — plan dialectique",
        detail:
          "Le 3e paragraphe (synthèse) présente des difficultés : la stratégie la plus simple est de proposer un nouvel argument déterminant qui permet de trancher la question. EXEMPLE : « Le patriote fait le plus grand des sacrifices : il est prêt à mourir pour la cause de son peuple. » (voir annexe 3)",
      },
      {
        nom: "Preuves",
        detail:
          "Citation tirée du texte servant à prouver la pertinence de l'argument : relativement courte (3 lignes et moins), choisie pour sa pertinence. Si c'est une phrase complète, elle est introduite par une phrase complète de mise en contexte suivie du deux-points (qui parle, à qui, de qui/de quoi, pourquoi, où, quand). Évitez les phrases vides (« Cette citation le prouve bien »). Si la citation n'est pas une phrase complète, on l'intègre dans la phrase, sans deux-points : « Nelligan décrit la beauté de “son front couleur de lys”. (v. 3) »",
      },
      {
        nom: "Explication",
        detail:
          "Elle porte directement sur les mots de la citation, interprète sa signification et montre sa pertinence par rapport à l'argument. Ce n'est pas un résumé. ERREUR : « Ici, le poète compare le regard brillant de sa mère à un aveuglant miroir vénitien. » CORRECTION : « Par l'usage d'une comparaison avec un miroir, Nelligan fait ressortir l'éclat propre à la jeunesse qui se manifeste dans le regard de sa mère. » Démarche : mot / procédé + effet / sens. Une bonne explication prend au moins deux phrases.",
      },
      {
        nom: "Clôture",
        detail:
          "Phrase située à la fin de chaque paragraphe qui reprend en d'autres mots et de façon concise les arguments du paragraphe (marqueurs : « bref », « en somme »). Elle n'est pas obligatoire à l'épreuve, mais elle permet de se rattraper si l'argument n'était pas clair au départ.",
      },
    ],
  },
  {
    partie: "Conclusion",
    mots: "100-150 mots",
    elements: [
      {
        nom: "Réponse",
        detail:
          "Formule obligatoirement votre point de vue de façon claire et définitive. C'est une affirmation, non une question; idéalement, elle reformule le sujet posé dans d'autres mots.",
      },
      {
        nom: "Bilan",
        detail:
          "En deux ou trois phrases, reprend les grandes lignes de l'argumentation. Plus précis et détaillé que le sujet divisé, il résume les arguments de chaque paragraphe en variant leur formulation.",
      },
      {
        nom: "Ouverture",
        detail:
          "Élargissement du sujet : lien avec l'époque, le courant littéraire ou une autre œuvre au thème similaire (film, pièce, chanson, œuvre d'art, actualité, contexte sociopolitique). Les connaissances doivent être précises, développées et liées au sujet. ERREUR : « On retrouve un personnage similaire dans le roman Le ciel de Bay City. » CORRECTION : « Le roman Le ciel de Bay City met aussi en scène un personnage qui s'interroge sur le passé. Celui-ci tentera, pour sa part, de comprendre l'histoire des camps de concentration où ses grands-parents sont morts. »",
      },
    ],
  },
];

export const TABLEAU_NUANCE = {
  entetes: ["Paragraphe", "Exemple d'erreur", "Correction"],
  lignes: [
    ["1", "D'un côté, Joe le cook est un personnage craintif.", "D'un côté, Joe le cook semble craintif."],
    [
      "2",
      "D'un autre côté, Joe le cook est très courageux.",
      "D'un autre côté, Joe le cook fait parfois preuve de courage.",
    ],
    ["3", "En définitive, Joe le cook est peureux.", "En définitive, Joe le cook est plus craintif que courageux."],
  ],
};

export const EXEMPLE_EXPLICATION_PROCEDE = {
  citation:
    "L'héroïne souhaite la mort de son mari. On le constate lorsqu'elle suggère l'idée du meurtre à son amant : « Il faut tuer Antoine! Il faut le tuer! »",
  analyses: [
    "Le verbe « faut » suggère que le meurtre est nécessaire au bonheur des amants.",
    "Le point d'exclamation accentue la détermination du personnage à tuer son mari.",
    "La répétition du mot « tuer » révèle l'obsession meurtrière de l'héroïne.",
    "Comme l'indique la répétition du mot « tuer », l'héroïne souhaite convaincre son amant de passer à l'acte.",
  ],
};

/* Annexe 1 */

export const SUJET_AMENE_STRATEGIES = [
  {
    titre: "Puisez dans vos connaissances sur les auteurs, les époques et les courants",
    detail:
      "Révisez vos notes de cours avant l'examen et étudiez les tableaux sur les courants littéraires français et québécois.",
  },
  {
    titre: "Servez-vous des informations dans le cahier de l'épreuve",
    detail:
      "Déterminez l'époque ou le courant à partir de la nationalité de l'auteur et de la date de publication de l'œuvre.",
  },
  {
    titre: "Cherchez des informations dans le dictionnaire",
    detail:
      "Nom de l'auteur (Larousse) et courant littéraire (Larousse ou Robert); mot-clé de la question : définition ou citation littéraire (Robert).",
  },
  {
    titre: "Faites référence à la littérature postmoderne pour les œuvres récentes (après 1980)",
    detail: "Utilisez des caractéristiques générales tirées des tableaux des courants (annexes 2a et 2b).",
  },
  {
    titre: "Faites référence à l'actualité en lien avec le sujet",
    detail: "Reliez le thème du sujet à des débats de société abordés dans les médias.",
  },
  {
    titre: "Présentez simplement l'œuvre et l'intrigue",
    detail: "Solution de secours si vous n'avez vraiment aucune idée.",
  },
];

export const ANNEXE1_SUJETS = [
  {
    rang: "Premier sujet (ÉUF de mai 2012)",
    enonce:
      "Peut-on dire que, dans le conte « Les deux consolés » de Voltaire et dans la chanson « La veuve » de Félix Leclerc, la consolation est présentée de façon semblable?",
    notices: [
      "Texte 1 — François-Marie Arouet, dit Voltaire, écrivain français, né en 1694 et mort en 1778. Le conte « Les deux consolés » a été publié pour la première fois en 1756.",
      "Texte 2 — Félix Leclerc, auteur-compositeur-interprète et écrivain québécois, né en 1914 et mort en 1988. La chanson « La veuve » est parue en 1969.",
    ],
  },
  {
    rang: "Deuxième sujet",
    enonce:
      "Dans l'extrait de la pièce Bashir Lazhar d'Evelyne de la Chenelière, est-il juste de dire que l'école est un milieu épanouissant pour les personnages?",
    notices: [
      "Auteure — Evelyne de la Chenelière, écrivaine québécoise, née en 1975. La pièce Bashir Lazhar a été publiée en 2002.",
      "Présentation — Bashir Lazhar est un réfugié politique algérien qui a obtenu un poste de remplaçant, en sixième année, dans une école primaire montréalaise.",
    ],
  },
  {
    rang: "Troisième sujet",
    enonce:
      "Peut-on affirmer que, dans l'extrait du roman L'arrache-cœur de Boris Vian, Clémentine est maternelle avec ses enfants?",
    notices: [
      "Auteur — Boris Vian, écrivain français, né en 1920 et mort en 1959. Le roman L'arrache-cœur a été publié en 1953.",
      "Présentation — Clémentine a mis au monde des triplés : Noël, Joël et Citroën. L'extrait permet de suivre quelques années de leur vie.",
    ],
  },
];

export const ANNEXE1_EXEMPLES = [
  {
    strategie: "Nom de l'auteur et courant littéraire (dictionnaire) — sujet 1",
    texte:
      "Voltaire est un écrivain français du Siècle des Lumières reconnu pour ses idées philosophiques. Il a publié des poèmes et de nombreux contes, tels que « Zadig » (1747) et « Candide » (1759). En 1756, il fait paraitre le conte « Les deux consolés », qui montre comment un philosophe s'y prend pour apaiser les souffrances d'une femme malheureuse. Près de 200 ans plus tard, Félix Leclerc, un écrivain québécois, présente une situation similaire dans la chanson « La Veuve », où une femme en deuil cherche du réconfort auprès d'un curé. / Toutefois, peut-on affirmer que la consolation est présentée de façon semblable dans les deux textes?",
  },
  {
    strategie: "Mot-clé de la question : définition ou citation littéraire — sujet 1",
    texte:
      "Selon Malraux, il est plus facile « de consoler les autres que de se consoler soi-même » (dictionnaire Robert). Cette réflexion sur la consolation pourrait s'appliquer au conte « Les deux consolés », publié par Voltaire en 1756, et à la chanson « La Veuve » de Félix Leclerc. Même s'ils ont vécu à deux époques différentes, cet auteur français, issu du Siècle des Lumières, et ce chansonnier québécois, qui a vécu la Grande Noirceur et la Révolution tranquille, présentent tous les deux un personnage masculin qui tente de consoler une femme éplorée. / On peut alors se demander si la consolation est présentée de façon semblable dans les deux textes.",
  },
  {
    strategie: "Référence à la littérature postmoderne — sujet 2",
    texte:
      "Les œuvres de la littérature postmoderne accordent une grande place à l'individu et à ses aspirations. La pièce Bashir Lazhar, écrite par Évelyne de la Chenelière et publiée en 2002, s'inscrit dans cette tendance. En effet, cette pièce met en scène un réfugié algérien qui tente de faire sa place comme remplaçant dans une école primaire. / En lisant son monologue, on peut se demander si cette école est un milieu épanouissant pour les personnages.",
  },
  {
    strategie: "Référence à l'actualité — sujet 2",
    texte:
      "L'éducation est un sujet d'actualité souvent abordé dans les médias. Par exemple, plusieurs citoyens se questionnent sur la réforme au primaire et au secondaire, sur l'utilisation de la technologie dans les classes, sur les problèmes de décrochage scolaire et de violence à l'école, etc. La pièce de théâtre Bashir Lazhar, écrite par Évelyne de la Chenelière et publiée en 2002, aborde justement certains problèmes liés au milieu de l'éducation. / On peut même se demander si l'école est un milieu épanouissant pour les personnages de la pièce.",
  },
  {
    strategie: "Présentation simple de l'œuvre et de l'intrigue — sujet 3",
    texte:
      "En 1953, Boris Vian publie le roman L'arrache-cœur. Ce roman met en scène une femme, Clémentine, qui a donné naissance à des triplés. Du jour au lendemain, Clémentine, qui n'avait aucune expérience en tant que mère, doit apprendre à s'occuper de trois bébés. C'est pour elle une tâche difficile à assumer. / On peut se demander si elle réussit quand même à être maternelle avec ses enfants.",
  },
];

/* Annexes 2a / 2b */

export const COURANTS_FRANCAIS = [
  {
    epoque: "Le Grand Siècle (17e siècle)",
    courant: "Le classicisme",
    traits:
      "Importance des règles (les trois unités, la bienséance, le ton, la vraisemblance) · Prédominance de la raison sur les sentiments · Buts : plaire et instruire",
    auteurs:
      "Corneille : Le Cid · Racine : Phèdre · Molière : L'Avare, Dom Juan, Tartuffe · La Fontaine : Les Fables",
  },
  {
    epoque: "Le Siècle des Lumières (18e siècle)",
    courant: "Le courant des Lumières",
    traits:
      "Dénonciation des injustices, des inégalités, des croyances non fondées · Prédominance de la raison et de l'esprit critique · Réflexion sur le bonheur et sur la nature humaine",
    auteurs:
      "Voltaire : Candide ou l'Optimisme, Zadig · Diderot : Jacques le Fataliste et son maître · Rousseau : Les Confessions · Beaumarchais : Le Mariage de Figaro",
  },
  {
    epoque: "Le 19e siècle",
    courant: "Le romantisme",
    traits:
      "Exaltation du « je » · Prédominance de l'émotion (mélancolie, amour, passion, tristesse) · Intérêt pour la nature",
    auteurs:
      "Victor Hugo : Les Misérables · Chateaubriand : Mémoires d'outre-tombe · Lamartine : « Le Lac » · Musset : La Confession d'un enfant du siècle",
  },
  {
    epoque: "Le 19e siècle",
    courant: "Le réalisme",
    traits: "Représentation minutieuse de la réalité · Narration à la 3e personne (objectivité)",
    auteurs: "Balzac : Le Père Goriot · Flaubert : Madame Bovary · Maupassant : Boule de Suif",
  },
  {
    epoque: "Le 19e siècle",
    courant: "Le naturalisme",
    traits:
      "Prétention d'une démarche scientifique · Tous les objets sont bons (paysan, ouvrier, prostituée) · Observation des lois du milieu et de l'hérédité",
    auteurs: "Émile Zola : Germinal",
  },
  {
    epoque: "Le 19e siècle",
    courant: "Le symbolisme",
    traits: "Mouvement poétique · Thèmes : spleen, angoisse, besoin d'évasion · Correspondances",
    auteurs:
      "Verlaine : « L'art poétique » · Rimbaud : « Le dormeur du val » · Baudelaire : Les Fleurs du mal",
  },
  {
    epoque: "Les 20e et 21e siècles",
    courant: "Le surréalisme",
    traits: "Écriture automatique (déjouer la raison et la censure) · Exploration de l'inconscient",
    auteurs: "André Breton : Nadja · Paul Éluard : Capitale de la douleur",
  },
  {
    epoque: "Les 20e et 21e siècles",
    courant: "L'existentialisme",
    traits:
      "Responsabilité de l'homme par rapport à sa vie · Existence déterminée par les actions et les choix",
    auteurs:
      "Jean-Paul Sartre : Huis clos · Simone de Beauvoir : Le Deuxième sexe · Albert Camus : L'Étranger",
  },
  {
    epoque: "Les 20e et 21e siècles",
    courant: "Le théâtre de l'absurde",
    traits: "Absurdité de l'existence, de la vie, attente de la mort · Impossibilité de communiquer",
    auteurs: "Samuel Beckett : En attendant Godot · Eugène Ionesco : La cantatrice chauve",
  },
  {
    epoque: "Les 20e et 21e siècles",
    courant: "La littérature postmoderne",
    traits:
      "Intériorité, narration au « je » · Individualisme et introspection · Autofiction · Recyclage et collage (mélange des genres, intertextualité)",
    auteurs:
      "Daniel Pennac : Comme un roman · Milan Kundera : Le Livre du rire et de l'oubli · Frédéric Beigbeder : 99 francs · Éric-Emmanuel Schmitt : Oscar et la dame rose",
  },
];

export const COURANTS_QUEBECOIS = [
  {
    epoque: "1830-1900",
    courant: "La littérature orale : les contes et légendes",
    traits:
      "Traces d'oralité (deux niveaux de narration, langage populaire) · Transgression (de la réalité, des préceptes religieux) · Morale (en faveur de la religion catholique)",
    auteurs: "Honoré Beaugrand : La chasse-galerie · Philippe-Aubert de Gaspé fils : L'Étranger",
  },
  {
    epoque: "1846-1945",
    courant: "Le terroir",
    traits:
      "Idéologie de conservation et de la survivance · Valeurs : la vie paysanne, la religion, la langue française, le passé, les traditions",
    auteurs:
      "Patrice Lacombe : La terre paternelle · Louis Hémon : Maria Chapdelaine · Germaine Guèvremont : Le Survenant",
  },
  {
    epoque: "La Grande Noirceur (1945-1960)",
    courant: "Le réalisme urbain",
    traits:
      "Contestation des valeurs traditionnelles et de l'emprise de l'Église · Besoin de liberté, de changement, de modernité · Représentation du milieu ouvrier urbain · Réalité de cette période : chômage, Deuxième Guerre…",
    auteurs:
      "Gabrielle Roy : Bonheur d'occasion · Gratien Gélinas : Tit-Coq · Marcel Dubé : Florence, Un simple soldat",
  },
  {
    epoque: "La Révolution tranquille (1960-1980)",
    courant: "La littérature identitaire",
    traits:
      "Poésie engagée · Écriture au « nous », au nom de la collectivité · Thèmes : rejet des tabous et des interdits, recherche identitaire, expérimentation de nouvelles formes, contestation et désir de choquer, engagement politique et social",
    auteurs: "Gaston Miron : L'Homme rapaillé · Michèle Lalonde : « Speak white »",
  },
  {
    epoque: "La période contemporaine (1980 à nos jours)",
    courant: "La littérature migrante",
    traits: "Thèmes : métissage culturel, altérité, exil, quête d'identité, hybridité, mémoire, héritage",
    auteurs:
      "Marco Micone : « Speak what » · Ying Chen : Les lettres chinoises · Sergio Kokis : Le Pavillon des miroirs · Dany Laferrière : Pays sans chapeau",
  },
  {
    epoque: "La période contemporaine (1980 à nos jours)",
    courant: "La littérature postmoderne",
    traits:
      "Mélange d'autobiographie et de fiction (autofiction) · Narration au « je », individualisme et introspection · Intériorité",
    auteurs:
      "Nelly Arcan : Putain · Sergio Kokis : Le Pavillon des miroirs · Dany Laferrière : Pays sans chapeau",
  },
];

/* Annexe 3 */

export const STRATEGIES_SYNTHESE = [
  {
    titre: "Confronter deux arguments précédents",
    sujet:
      "SUJET : Peut-on dire que le Chevalier de Lorimier se présente plus comme un héros qu'une victime?",
    precedents: [
      "Le chevalier de Lorimier se préoccupe de l'avenir de ses proches. (thèse : héros)",
      "Le chevalier de Lorimier s'apitoie sur son sort. (antithèse : victime)",
    ],
    synthese:
      "Si le chevalier de Lorimier s'apitoie sur son sort (antithèse : victime), c'est surtout parce qu'il s'inquiète de l'avenir de ses proches (thèse : héros).",
    marqueurs: "",
  },
  {
    titre: "Affaiblir un argument précédent",
    sujet: "",
    precedents: ["Le patriote est condamné à mort injustement. (antithèse : victime)"],
    synthese:
      "Certes, le patriote est condamné à mort injustement (antithèse : victime), mais il affronte cette mort avec courage (thèse : héros).",
    marqueurs: "CONCESSION : Certes, mais / même si / bien que / quoique / malgré que",
  },
  {
    titre: "Renforcer un argument précédent",
    sujet: "",
    precedents: [
      "Le patriote a consacré une grande partie de sa vie à la cause de son peuple. (thèse : héros)",
    ],
    synthese:
      "Le patriote n'a pas seulement consacré une partie de sa vie pour la cause de son peuple : il est aussi prêt à mourir pour cette cause.",
    marqueurs: "ADDITION : En plus de… / non seulement…, mais / pas seulement… aussi",
  },
];

/* Annexe 4 */

export const TABLEAU_ORGANISATEURS_1 = {
  groupes: [
    "Arguments qui s'additionnent (point de vue unique)",
    "Arguments ou points de vue qui s'opposent (point de vue nuancé)",
  ],
  entetes: [
    "1er argument",
    "2e argument",
    "3e argument",
    "1er argument ou point de vue",
    "2e argument ou point de vue",
    "3e argument ou point de vue",
  ],
  lignes: [
    ["Premièrement,", "Deuxièmement,", "Troisièmement,", "D'une part,", "D'autre part,", ""],
    ["En premier lieu,", "En deuxième lieu,", "En troisième lieu,", "D'un côté,", "D'un autre côté,", ""],
    [
      "Tout d'abord, D'abord, Au premier abord, De prime abord, En effet,",
      "Ensuite, De plus, En outre, Puis, À cela s'ajoute le fait que… … aussi… … également…",
      "Enfin, Finalement,",
      "À première vue, Certes, Tout d'abord, Au premier abord, De prime abord, D'entrée de jeu, Au départ,",
      "Cependant, Toutefois, Par contre, Au contraire, En revanche, Contrairement à… À l'opposé de…",
      "En définitive, En fin de compte, Tout compte fait, Tout bien considéré, En somme, Somme toute, De façon générale,",
    ],
  ],
};

export const TABLEAU_ORGANISATEURS_2 = {
  groupes: [
    "Arguments qui introduisent différents éléments (textes ou personnages)",
    "Arguments du 3e paragraphe (point de vue nuancé)",
  ],
  entetes: ["1er élément", "2e élément", "Affaiblir un argument", "Renforcer un argument"],
  lignes: [
    [
      "Dans le premier texte (extrait, roman, poème, conte, pièce…),",
      "Dans le deuxième texte (extrait, roman, poème, conte, pièce…),",
      "Certes,…, mais / Même si… / Bien que… / Quoique… / Malgré que… / Malgré…",
      "En plus de…, / Non seulement…, mais…",
    ],
    [
      "Dans + titre du 1er texte,",
      "En ce qui concerne / En ce qui a trait à + nom du 2e texte, / Pour ce qui est de + titre du 2e personnage, / Il en va de même pour…",
      "Clôtures : Bref, En somme, Somme toute, En fin de compte, Tout compte fait, Donc…",
      "Clôtures : Bref, En somme, Somme toute, En fin de compte, Tout compte fait, Donc…",
    ],
    [
      "Selon + nom du 1er personnage, / D'après…",
      "Contrairement à + nom du 1er texte / À l'opposé de + nom du 1er personnage / Nom du 2e personnage, quant à lui / quant à elle…",
      "",
      "",
    ],
    ["Le premier (texte, personnage),", "Le deuxième (texte, personnage)…", "", ""],
    ["L'un…", "L'autre…", "", ""],
  ],
};

// Vue simplifiée conservée
export const ORGANISATEURS = [
  {
    categorie: "Arguments qui s'additionnent (point de vue unique)",
    colonnes: [
      { titre: "1er argument", mots: "Premièrement, En premier lieu, Tout d'abord, D'abord, En effet," },
      { titre: "2e argument", mots: "Deuxièmement, En deuxième lieu, Ensuite, De plus, En outre, Puis," },
      { titre: "3e argument", mots: "Troisièmement, En troisième lieu, Enfin, Finalement," },
    ],
  },
  {
    categorie: "Arguments ou points de vue qui s'opposent (point de vue nuancé)",
    colonnes: [
      { titre: "1er point de vue", mots: "D'une part, D'un côté, À première vue, Certes, D'entrée de jeu, Au départ," },
      { titre: "2e point de vue", mots: "D'autre part, D'un autre côté, Cependant, Toutefois, Par contre, En revanche," },
      { titre: "3e point de vue", mots: "En définitive, En fin de compte, Tout compte fait, Tout bien considéré, Somme toute," },
    ],
  },
];

/* Annexe 5 */

export const CITATIONS = [
  {
    cas: "Citation courte intégrale = phrase complète",
    regle: "Introduite par une phrase de mise en contexte suivie du deux-points (:).",
    exemple:
      "Un parallélisme montre le dilemme de Rodrigue : « Faut-il laisser un affront impuni? / Faut-il punir le père de Chimène? » (v. 67-68)",
  },
  {
    cas: "Citation courte partielle = phrase incomplète, expression ou mot",
    regle: "Intégrée dans la syntaxe de la phrase, sans deux-points.",
    exemple:
      "Joe compare le diable à « un animal qui n'entend pas à rire lorsqu'on s'engage avec lui ». (l. 24)",
  },
  {
    cas: "Mot ou expression cité",
    regle: "Encadré de guillemets. On ne peut mettre en apposition une phrase complète.",
    exemple:
      "L'importance du regard est signalée par l'expression « permettait de voir ». (l. 28) — ERREUR : La métaphore « les rayons ainsi que de pourpres épées / percent le cœur du jour qui se meurt parfumé » montre que… CORRECTION : La métaphore de l'épée ensanglantée montre que…",
  },
  {
    cas: "Termes intégrés par un mot d'articulation",
    regle: "Les termes cités sont reliés à la phrase.",
    exemple:
      "Le champ lexical des éléments comporte des termes comme « enneigés » (l. 4), « vents » (l. 5), « il tonne » (l. 7), « ouragan » (l. 9).",
  },
  {
    cas: "Modification : crochets [ ]",
    regle: "Pour une modification nécessaire au respect de la grammaire et de la syntaxe.",
    exemple:
      "ERREUR : les dames « paie d'une goutte de son sang chacun de ses caprices. » CORRECTION : les dames « paie[nt] d'une goutte de [leur] sang chacun de [leurs] caprices. » (l. 57-58)",
  },
  {
    cas: "Suppression : […]",
    regle: "Une fois abrégée, la citation doit garder un sens et être syntaxiquement correcte.",
    exemple:
      "ERREUR : « Les sapins [...] frères abattus ». (l. 28-30) CORRECTION : « Les sapins [...] saluent leurs frères abattus ». (l. 28-30)",
  },
];

/* Annexe 6 */

export const VERBES_EXPLICATION = [
  "décrire, traduire, refléter, représenter, connoter, symboliser, intensifier, amplifier + quelque chose",
  "montrer, suggérer, révéler, indiquer + quelque chose / + que…",
  "illustrer, mettre en évidence, mettre en relief, mettre en valeur + quelque chose",
  "souligner, évoquer, exprimer, renforcer, accentuer, atténuer, adoucir, minimiser, banaliser + le fait que…",
  "témoigner, confirmer l'importance + de quelque chose",
  "insister, mettre l'accent + sur quelque chose (met l'emphase = anglicisme)",
  "opposer, mettre en opposition + quelque chose et quelque chose",
];

export const FORMULES_EXPLICATION = [
  "L'auteur, le narrateur ou le personnage emploie le procédé, le mot « » ou l'expression « » pour…",
  "Par l'emploi du procédé, du mot « » ou de l'expression « », l'auteur, le narrateur ou le personnage…",
  "Le procédé, le mot « » ou l'expression « »…",
];

export const EXEMPLES_EXPLICATION = [
  "Le personnage emploie une anaphore pour insister sur son désir d'être compris.",
  "Par l'emploi de la gradation, le personnage révèle que sa colère est de plus en plus intense.",
  "L'expression « sauter de joie » amplifie le sentiment de bonheur éprouvé par le héros.",
];

/* Annexe 7 */

export const PROCEDES = [
  {
    famille: "opposition",
    items: [
      {
        nom: "Antithèse",
        def: "Présence dans une phrase de termes qui s'opposent par leur sens.",
        effet: "Met en relief la coexistence d'éléments opposés. Exprime l'opposition, la contradiction.",
        ex: "« Je fais la même entreprise que Montaigne, mais avec un but tout contraire au sien… » (J.-J. Rousseau) / « Je vis, je meurs; je me brûle et me noie. » (Louise Labé)",
      },
      {
        nom: "Oxymore",
        def: "Alliance de termes antithétiques reliés grammaticalement (ex. : dans un même groupe nominal).",
        effet:
          "Comme l'antithèse, mais avec une plus grande intensité causée par la proximité. Crée une image ambigüe, une réalité poétique nouvelle qui permet de dire l'inconcevable.",
        ex: "« Cette obscure clarté qui tombe des étoiles. » (Corneille) / « Une flamme si noire » (Racine)",
      },
    ],
  },
  {
    famille: "ressemblance",
    items: [
      {
        nom: "Comparaison",
        def: "Rapprocher deux termes en explicitant leur élément commun à l'aide de mots comme tel, semblable à, comme, pareil à.",
        effet: "Met en relief des analogies, des ressemblances, des rapports.",
        ex: "Être rusé comme un renard. / Tes yeux brillent telles des étoiles.",
      },
      {
        nom: "Métaphore",
        def: "Rapprocher des termes sans expliciter de lien de ressemblance.",
        effet:
          "Compare d'une manière insolite des éléments pour faire apparaitre des images nouvelles. Permet une description plus riche et plus expressive.",
        ex: "« Son rire de pluie fraîche » (J. Gracq) / « Le vaste bateau glissait, jetant sur le ciel […] un gros serpent de fumée noire. » (Maupassant)",
      },
    ],
  },
  {
    famille: "insistance",
    items: [
      {
        nom: "Hyperbole",
        def: "Exagérer et amplifier une notion.",
        effet: "Met en relief des analogies, des ressemblances, des rapports.",
        ex: "Du bruit à réveiller un mort. / J'attends depuis des siècles.",
      },
      {
        nom: "Répétition",
        def: "Reprise du même mot ou de la même expression. Répété deux fois de suite : redoublement.",
        effet:
          "Crée un effet d'insistance. Peut donner un rythme au texte ou signifier le désarroi, le bégaiement, la confusion d'un personnage.",
        ex: "« Alors, je souffre, je souffre…! » (Goethe) / « Moé, j'aime ça le bingo! Moé, j'adore ça le bingo! » (M. Tremblay)",
      },
      {
        nom: "Gradation",
        def: "Progression (ascendante ou descendante) dans les termes d'une énumération.",
        effet: "Effet d'amplification, de progression; effet dramatique ou comique.",
        ex: "« Ah! Oh! Je suis blessé, je suis troué, je suis perforé, je suis administré, je suis enterré. » (A. Jarry)",
      },
    ],
  },
  {
    famille: "syntaxique",
    items: [
      {
        nom: "Énumération",
        def: "Succession de mots de même classe, de groupes de mots ou de phrases.",
        effet:
          "Crée un effet d'accumulation, de foisonnement. Les éléments ont souvent une valeur symbolique : il est intéressant d'analyser le choix des éléments énumérés.",
        ex: "« Toujours se vautrait dans les fanges, se noircissait le nez, se barbouillait le visage, éculait ses souliers… » (Rabelais)",
      },
    ],
  },
];

/* Révision */

export const CONSEILS_REDACTION = [
  "Rédiger le développement avant l'introduction, en passant la première page.",
  "Rédiger à l'indicatif présent et dans un style neutre (pas de « je », « tu », « vous »).",
  "Éviter le ton expressif, l'opinion personnelle et les jugements sur les personnages.",
  "Passer une ligne entre les paragraphes et commencer par un alinéa d'environ 2 cm.",
  "Souligner le titre des œuvres complètes; guillemets français pour les extraits, contes, nouvelles et poèmes.",
  "Indiquer les références des citations entre parenthèses : « […] » (l. 25-28).",
  "Identifier d'une étoile les mots à vérifier dans le dictionnaire.",
];

export const GRILLE_REVISION = [
  "Assurez-vous d'avoir recopié les citations sans fautes.",
  "Vérifiez la syntaxe de la phrase d'intégration de la citation.",
  "Cherchez dans le dictionnaire les mots dont vous doutez de l'orthographe (ceux marqués d'une étoile).",
  "Soulignez les verbes conjugués; vérifiez la conjugaison (Bescherelle) et trouvez le sujet en posant « Qui est-ce qui? » / « Qu'est-ce qui? », puis accordez.",
  "Identifiez les verbes qui se terminent par le son « é » et remplacez-les par « battre » ou « battu » pour savoir s'ils se terminent en « er » ou « é ».",
  "Vérifiez l'accord des participes passés.",
  "Écrivez des phrases courtes et simples.",
  "Vérifiez les accords des noms avec les déterminants et les adjectifs.",
  "Vérifiez les homophones : a / à, ce / se…",
  "Vérifiez la ponctuation : virgule devant « car » et « mais »; virgule après les marqueurs de relation (« En premier lieu, … »); virgule après les compléments placés en début de phrase (« Dans l'extrait à l'étude, … »).",
];

export const CONSIGNE_REVISION =
  "Révisez votre texte phrase par phrase en commençant par la fin. Vous pouvez aussi réviser la langue au fur et à mesure, après chaque paragraphe. Une simple relecture rapide ne permettra pas de corriger vos erreurs : concentrez-vous sur vos types d'erreurs les plus fréquents.";

export const ERREURS_A_EVITER = [
  "Rédigez votre liste personnelle des 5 types d'erreurs à éviter et mémorisez-la pour une révision linguistique efficace.",
  "Relire toutes les citations mot à mot.",
  "Relire les titres d'œuvres, les noms d'auteurs et de personnages.",
  "Le titre de l'œuvre doit-il être souligné ou encadré de guillemets?",
];

/* Annexe 8 */

export const BAREUF = {
  titre: "BAREUF — Bureau d'aide à l'épreuve uniforme de français (Collège Ahuntsic)",
  points: [
    "Aide individuelle pour les élèves ayant échoué à l'épreuve uniforme.",
    "Ateliers pour les étudiants se préparant à l'épreuve, lors des quatre derniers jeudis de la session, de 14 h à 16 h.",
    "Atelier 1 : Critères d'évaluation et stratégies de réussite.",
    "Atelier 2 : Types de sujets et structure du développement.",
    "Atelier 3 : Introduction et conclusion.",
    "Atelier 4 : Révision et autocorrection de la langue.",
  ],
  inscription: "https://collegeahuntsic.jotform.com/231943231360044",
};

export const RESSOURCES = [
  {
    nom: "Gouvernement du Québec",
    url: "https://www.quebec.ca/education/cegep/epreuve-langue/francais",
    desc: "Renseignements généraux sur l'épreuve et formulaire pour demander la copie de votre examen.",
  },
  {
    nom: "CCDMD — Épreuve de français",
    url: "https://www.ccdmd.qc.ca/fr/",
    desc: "Section « Matériel à imprimer » : grille de correction, exemples de dissertation, conseils sur le contenu et la structure, « La dissertation en quatre exercices » et le jeu-questionnaire « Testez vos connaissances ».",
  },
  {
    nom: "Site d'un ancien superviseur à l'épreuve uniforme",
    url: "https://euf.hebfree.org/listesujets.htm",
    desc: "FAQ, leçons sur la dissertation critique, exemples de dissertation et liste des anciens sujets de l'épreuve.",
  },
  {
    nom: "CCDMD — Exercices en français écrit",
    url: "https://www.ccdmd.qc.ca/fr",
    desc: "Exercices spécifiques en français écrit.",
  },
  {
    nom: "Collège Ahuntsic — Amélioration du français",
    url: "https://www.collegeahuntsic.qc.ca/services-aux-etudiants/francisation-fracas",
    desc: "Ressources d'amélioration du français offertes par le Collège.",
  },
];

/* Annexe 9 */

export const MATERIEL_JOUR_J = {
  intro: [
    "Vous devez apporter votre carte étudiante ou une pièce d'identité avec photo.",
    "Vous avez droit à trois ouvrages de correction linguistique.",
  ],
  permis: [
    "Dictionnaires (Larousse, Robert, Multidictionnaire, dictionnaire bilingue, des synonymes)",
    "Guides de conjugaison (Bescherelle)",
    "Grammaires",
  ],
  interdits: [
    "Anthologies littéraires",
    "Guides de procédés d'écriture",
    "Ouvrages de méthodologie (comme le Petit Rédac)",
    "Documents remis par vos professeurs (comme le guide préparatoire)",
    "Notes personnelles",
    "Appareils électroniques (téléphone, montre intelligente, tablette, dictionnaire électronique, iPod, calculatrice…)",
  ],
  suggestions: [
    "Francophones : Robert (Petit ou Micro) + Larousse + Multi",
    "Allophones : Robert Micro + dictionnaire bilingue + Multi",
  ],
  outils: [
    "Un stylo (noir ou bleu) — les stylos à encre effaçable sont interdits.",
    "Un ruban correcteur — le liquide correcteur est interdit.",
    "Un crayon de plomb (pour annoter les textes et réviser votre dissertation).",
    "Une montre (pour gérer votre temps) — les montres intelligentes sont interdites.",
    "Quelque chose à boire et à manger.",
  ],
  important: "Aucun échange de matériel n'est permis entre les élèves durant l'examen.",
};
