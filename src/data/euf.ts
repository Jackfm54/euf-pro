export type CritereId = "argumentation" | "structure" | "langue";

/** Cotes officielles attribuées aux sous-critères de l'épreuve. */
export type Cote = "A" | "B" | "C" | "D" | "E";
export const COTES: Cote[] = ["A", "B", "C", "D", "E"];
/** Valeur numérique de chaque cote (utilisée pour l'addition des sous-critères). */
export const VALEUR_COTE: Record<Cote, number> = { A: 4, B: 3, C: 2, D: 1, E: 0 };

export interface SousCritere {
  /** Numéro officiel du sous-critère (1 à 8). */
  numero: number;
  id: string;
  label: string;
  labelFr: string;
  aide: string;
  /** « cote » = a/b/c/d/e ; « fautes » = nombre de fautes comptées. */
  mesure: "cote" | "fautes";
}

export interface Critere {
  id: CritereId;
  numero: string;
  titre: string;
  resume: string;
  sousCriteres: SousCritere[];
}

/** Grille officielle du relevé des résultats de l'épreuve uniforme de français. */
export const CRITERES: Critere[] = [
  {
    id: "argumentation",
    numero: "Critère I",
    titre: "Compréhension et qualité de l'argumentation",
    resume:
      "Cote globale obtenue par l'addition de la valeur des cotes des trois sous-critères.",
    sousCriteres: [
      {
        numero: 1,
        id: "sujet",
        label: "Respeto del tema de redacción",
        labelFr: "Respect du sujet de rédaction",
        aide: "La tesis responde exactamente al sujet posé; se abordan todos los elementos esenciales.",
        mesure: "cote",
      },
      {
        numero: 2,
        id: "arguments",
        label: "Calidad de la argumentación",
        labelFr: "Qualité de l'argumentation",
        aide: "Argumentos pertinentes, desarrollados, con pruebas del texto explicadas.",
        mesure: "cote",
      },
      {
        numero: 3,
        id: "comprehension",
        label: "Comprensión de los textos e integración de conocimientos literarios",
        labelFr: "Compréhension des textes et intégration de connaissances littéraires",
        aide: "Sin contrasentidos; corriente, época y procedimientos usados con pertinencia.",
        mesure: "cote",
      },
    ],
  },
  {
    id: "structure",
    numero: "Critère II",
    titre: "Structure du texte de l'élève",
    resume: "Cote globale obtenue par l'addition de la valeur des cotes des deux sous-critères.",
    sousCriteres: [
      {
        numero: 4,
        id: "intro",
        label: "Introducción y conclusión",
        labelFr: "Introduction et conclusion",
        aide: "Sujet amené, posé, divisé · conclusión con síntesis y apertura.",
        mesure: "cote",
      },
      {
        numero: 5,
        id: "developpement",
        label: "Desarrollo",
        labelFr: "Développement",
        aide: "Párrafos completos y ordenados, transiciones y organisateurs textuels.",
        mesure: "cote",
      },
    ],
  },
  {
    id: "langue",
    numero: "Critère III",
    titre: "Maîtrise de la langue",
    resume:
      "Cote globale obtenue par l'addition du nombre de fautes des trois sous-critères (1 faute par tranche de 30 mots = seuil de la cote C).",
    sousCriteres: [
      {
        numero: 6,
        id: "vocabulaire",
        label: "Vocabulario",
        labelFr: "Vocabulaire",
        aide: "Impropiedades, anglicismos, registro familiar.",
        mesure: "fautes",
      },
      {
        numero: 7,
        id: "syntaxe",
        label: "Sintaxis y puntuación",
        labelFr: "Syntaxe et ponctuation",
        aide: "Frases incompletas, subordinadas incorrectas, comas y comillas.",
        mesure: "fautes",
      },
      {
        numero: 8,
        id: "orthographe",
        label: "Ortografía de uso y gramatical",
        labelFr: "Orthographe d'usage et orthographe grammaticale",
        aide: "Acuerdos, participios, homófonos, acentos.",
        mesure: "fautes",
      },
    ],
  },
];

/** Notes officielles imprimées au bas du relevé des résultats. */
export const NOTES_RELEVE = [
  "Il n'y a pas de cotes aux sous-critères ni de cotes globales aux critères si l'élève n'a choisi aucun sujet, n'a pas abordé les éléments essentiels du sujet, a signé sans faire l'épreuve, a rédigé moins de 600 mots ou a fraudé.",
  "La cote globale des critères I et II est obtenue par l'addition de la valeur des cotes des sous-critères ; celle du critère III, par l'addition du nombre de fautes.",
  "Pour obtenir un verdict de réussite, l'élève doit avoir une cote globale supérieure ou égale à « C » à chacun des critères. Si l'une des trois cotes est égale ou inférieure à « D », l'élève reçoit un verdict d'échec.",
];


export interface Extrait {
  /** « Texte 1 » / « Texte 2 » comme dans le cahier de l'épreuve. */
  etiquette: string;
  auteur: string;
  /** Note biographique telle qu'imprimée dans le cahier. */
  noticeAuteur: string;
  titre: string;
  annee: string;
  /** Présentation du contexte de l'extrait. */
  presentation: string;
  /** Paragraphes de l'extrait à lire avant de rédiger. */
  paragraphes: string[];
  /** Référence bibliographique complète. */
  reference: string;
  /** Notes de bas de page du cahier. */
  notes?: string[];
  source: "Épreuve officielle";
}

export interface Sujet {
  id: string;
  /** Numéro du sujet dans le cahier (Premier, Deuxième, Troisième). */
  rang: string;
  enonce: string;
  type: "Sujet de comparaison" | "Sujet de discussion" | "Sujet d'analyse";
  corpus: string;
  epoque: string;
  /** Cahier officiel d'où provient le sujet. */
  cahier: string;
  pistes: string[];
  extraits: Extrait[];
}

/** Consigne officielle qui accompagne chaque sujet de rédaction. */
export const CONSIGNE_SUJET =
  "Vous soutiendrez votre point de vue à l'aide d'arguments cohérents et convaincants et à l'aide de preuves relatives au contenu et à la forme des textes proposés, preuves puisées dans ces textes et dans vos connaissances littéraires qui conviennent au sujet de rédaction.";

/** Sujets de rédaction du cahier officiel de l'épreuve uniforme de français. */
export const SUJETS: Sujet[] = [
  {
    id: "entree-ecole",
    rang: "Premier sujet",
    type: "Sujet de comparaison",
    enonce:
      "Est-il possible d'affirmer que l'entrée à l'école se déroule de façon semblable dans les extraits des romans Là où je me terre de Caroline Dawson et Le ventre de l'Atlantique de Fatou Diome ?",
    corpus:
      "Caroline Dawson, Là où je me terre (2020) · Fatou Diome, Le ventre de l'Atlantique (2003).",
    epoque: "XXIe siècle — récits autobiographiques et écritures migrantes",
    cahier: "Épreuve uniforme de français — 14 décembre 2022, cahier 3",
    pistes: [
      "Comparar el deseo de escuela: la insistencia de Caroline ante su familia y las trampas de Salie.",
      "Analizar el papel de los adultos: los padres que ceden vs. la abuela y monsieur Ndétare.",
      "Observar la narración autobiográfica al « je » y el tono (humor, enumeraciones, anáforas).",
      "Matizar: mismo deseo de aprender, pero contextos sociales y obstáculos muy distintos.",
    ],
    extraits: [
      {
        etiquette: "Texte 1",
        auteur: "Caroline Dawson",
        noticeAuteur: "Écrivaine québécoise d'origine chilienne, née en 1979.",
        titre: "Là où je me terre",
        annee: "2020",
        source: "Épreuve officielle",
        presentation:
          "Caroline, la narratrice du roman, se rappelle son entrée à l'école au Chili. Elle habitait alors avec sa tante, sa grand-mère, sa mère et son petit frère, en plus de son père et de son frère aîné, respectivement professeur et élève, qui, eux, passaient leurs journées à l'école.",
        reference:
          "Caroline DAWSON, Là où je me terre, Montréal, Les Éditions du remue-ménage, 2020, p. 57-60.",
        notes: ["gossé : agacé, importuné.", "drop-out : décrocheuse."],
        paragraphes: [
          "L'ennui a commencé là, entre les tâches ménagères et les soupirs de ces femmes en tablier qui attendaient que le jour débute et qu'il se clôture, sans laisser de marque nulle part; toujours un linge à la main, épongeant chacune des traces qu'elles croisaient sur leur route, de la cuisine au salon.",
          "Elles étaient enfermées dans l'éternel recommencement des lits à faire, de la liste des courses à renouveler, du porte-monnaie troué, des repas à cuisiner, de la vaisselle à laver, à essuyer, à ranger, des restants à gérer, des vêtements à laver, des draps à étendre, du pliage de caleçons, des chaussettes, des douillettes, du ramassage des cochonneries de tout le monde. À entendre le murmure de la radio raconter le monde extérieur, à changer des couches, soigner des bobos, faire des guili-guili aux tout-petits et dans le meilleur des cas écouter les ragots du quartier repris mille fois par l'aimable voisine que tout le monde appelait la fêlée. Je voulais descendre du train, maelstrom incessant de la sphère domestique, m'éloigner de l'étreinte étouffante de la maison, pour moi aussi prendre le chemin de terre, grimper la colline, apprendre à lire, à écrire, à compter.",
          "J'avais trois ans et je me suis mis en tête que je devais absolument sortir, me confronter à l'école moi aussi. J'ai demandé, puis exigé qu'on m'y inscrive chaque jour, plusieurs fois par jour, durant des semaines qui devinrent des mois. Ma pauvre mère, entendant ma litanie, tentait de m'occuper du mieux qu'elle le pouvait, mais la petite Caroline, accablée de lassitude, était insistante et persuasive. Je ne lâchais pas le morceau et « Moi aussi je veux aller à l'école » est vite devenu la première chose que je disais le matin les yeux encore embrouillés par la nuit et la dernière avant de m'endormir. Mes parents n'étaient pas du genre à se soumettre à mes caprices, mais « Moi aussi je veux aller à l'école » était devenu mon adage, presque un trait de ma personnalité.",
          "Après que j'ai sans relâche gossé¹ mon père, mon frère, ma mère, ma tante, ma grand-mère ainsi que la fêlée avec mon désir d'école, mes parents ont fini par céder. Mon père a fait les démarches nécessaires auprès de l'institution où il enseignait et a dû lui aussi insister. On n'allait pas laisser entrer une fillette de trois ans dans le programme scolaire sans présenter un semblant de résistance; mais c'était le Chili et les années 1980, la bureaucratie avait ses détours.",
          "En outre, mon père faisait partie du personnel depuis longtemps, il était aimé, impliqué, avait une grande gueule. Avec des tours de passe-passe administratifs, ils ont finalement réussi à m'inscrire en maternelle. À trois ans et des poussières, je suis devenue officiellement une écolière.",
          "[…]",
          "Dire que j'ai aimé l'école est un euphémisme. J'avais trouvé un endroit assez grand pour briser la monotonie, accueillir mes débordements et dissiper l'ennui que je balayais sous le tapis depuis des mois. Je m'y sentais bien, dans la meilleure version de moi-même. Je suis enfin devenue occupée, prolongée par l'école. Je tendais vers elle avant d'y aller, et en y mettant les pieds j'ai su : l'école, pour toujours, serait pour moi à la fois terrain de jeu et destination. Si chaque soir j'en revenais lessivée, il n'en reste pas moins que j'y adorais tout : les routines, les apprentissages, les jeux libres, l'odeur des crayons aiguisés, de la craie sur le tableau, le bruit des pupitres déplacés, l'excitation avant la cloche, les drames dans la cour, les différents points de vue auxquels j'étais confrontée. Tout, sauf une chose, et c'est celle qui a tué mon année scolaire, les ordres, l'obéissance et la domination qu'ils supposent.",
          "Je n'ai pu m'y résoudre et je suis devenue une drop-out² de trois ans le jour où on a fait de la gouache.",
        ],
      },
      {
        etiquette: "Texte 2",
        auteur: "Fatou Diome",
        noticeAuteur: "Écrivaine française d'origine sénégalaise, née en 1968.",
        titre: "Le ventre de l'Atlantique",
        annee: "2003",
        source: "Épreuve officielle",
        presentation:
          "Salie, la narratrice du roman, se rappelle son entrée à l'école française alors qu'elle vivait à Niodior, au Sénégal, avec ses grands-parents.",
        reference:
          "Fatou DIOME, Le ventre de l'Atlantique, Paris, Éditions Anne Carrière, 2003, p. 73-78.",
        notes: [
          "L'aventure ambiguë : titre d'un roman de Cheikh Hamidou Kane paru en 1961.",
          "méthode CLAD : méthode d'enseignement du français, langue étrangère.",
        ],
        paragraphes: [
          "Bien sûr que je me souviens de [l'instituteur, monsieur Ndétare].",
          "[…] Je lui dois mon premier poème d'amour écrit en cachette, je lui dois la première chanson française que j'ai murmurée, parce que je lui dois mon premier phonème, mon premier monème, ma première phrase française lue, entendue et comprise. Je lui dois ma première lettre française écrite de travers sur mon morceau d'ardoise cassée. Je lui dois l'école. Je lui dois l'instruction. Bref, je lui dois mon Aventure ambiguë¹. Parce que je ne cessais de le harceler, il m'a tout donné : la lettre, le chiffre, la clé du monde. Et parce qu'il a comblé mon premier désir conscient, aller à l'école, je lui dois tous mes petits pas de french cancan vers la lumière.",
          "La classe de monsieur Ndétare n'était jamais fermée. Mais je n'avais pas le droit d'y entrer, je n'étais pas inscrite. Curieuse, intriguée surtout par les mots que prononçaient ses élèves à la sortie des cours — leurs chansons mélodieuses qui n'étaient pas celles de ma langue, mais d'une autre que je trouvais tout aussi douce à entendre —, je voulais découvrir le génie qui apprenait aux enfants scolarisés tous ces mots mystérieux. Alors, j'ai triché, j'ai volé, j'ai menti, j'ai trahi la personne que j'aime le plus au monde : ma grand-mère! Pardon, bon Dieu, pardonnez-moi, mais c'était pour la bonne cause, sinon je n'aurais jamais pu lire votre nom dans tous les livres saints. Merci!",
          "J'ai triché : la maison de mes grands-parents était en face de l'école primaire. Lorsque j'accompagnais ma grand-mère au jardin, je l'aidais sagement à arroser ses plantes, puis j'attendais qu'elle fût occupée à soigner ses tomates, ses choux, ses oignons et autres légumes; feignant alors d'aller me reposer sous le cocotier à l'entrée du jardin, je m'éclipsais. Je déterrais mon ardoise cassée, ramassée à la poubelle, et mes craies — je cachais le tout sous un talus devant le jardin — puis, je filais à l'école en douce.",
          "J'ai volé : pour acheter de la craie, il me suffisait de dérober quelques piécettes à ma grand-mère, elle mettait son porte-monnaie, une petite bourse en coton cousue main, sous l'oreiller.",
          "J'ai menti : lorsque je rentrais, des heures plus tard, j'inventais une histoire qui révélait aussitôt ses failles, et la pauvre dame me répétait son sermon, trop habituel pour m'inquiéter :\n— Ah bon! La prochaine fois tu m'avertiras, hein! T'as compris? Si tu t'avises de recommencer, je te le ferai regretter. Entendu?",
          "À l'école, la classe de monsieur Ndétare, je vous l'ai déjà dit, n'était jamais fermée. J'entrais; il y avait une place vide au fond, je m'y installais, discrète, et j'écoutais. Il écrivait des lettres ou des chiffres étranges au tableau et donnait l'ordre de recopier. Je recopiais. Puis venait le moment où il appelait les écoliers au tableau à tour de rôle; quand tous étaient passés, moi aussi je décidais d'y aller à mon tour. Monsieur Ndétare s'offusquait, ouvrait le compas géant de ses jambes et se dirigeait vers moi :\n— Tu déguerpis tout de suite! Allons, dehors, tu n'es pas inscrite!",
          "Je sortais en courant. Dès qu'il se réinstallait derrière son bureau, je revenais prendre ma place, à la dernière table. C'était encore l'époque de la méthode CLAD² : l'instituteur devait faire répéter aux écoliers des mots, des phrases que diffusait une radiocassette. Dès que tous avaient fini, moi aussi je répétais spontanément, et le cirque recommençait. N'en pouvant plus, monsieur Ndétare m'inscrivit au crayon en bas de sa liste officielle et, dès lors, décida de me faire faire tous les exercices comme aux autres élèves. Il ne me chassait plus, au contraire, il m'accordait une attention toute particulière. Voyant que je me débrouillais bien, il me prit un jour par la main :\n— Viens, on va voir ta grand-mère.\n— Non, non! Je ne veux pas, je ne peux pas! Elle ne sait pas que je viens encore ici! Lâchez-moi! Lâchez-moi!\n— Eh bien, elle va le savoir aujourd'hui!",
          "Elle venait de rentrer de son jardin. Assise sur un banc, elle vidait son panier rempli de légumes.\n— Mais qu'as-tu encore fait? Je t'ai cherchée partout, où étais-tu?\n— À l'école, répondit monsieur Ndétare.\n— Mais enfin, quand m'obéiras-tu? Combien de fois devrai-je te le répéter? Cette école n'est pas un endroit pour toi!\n— Justement, madame Sarr, c'est de ça que je suis venu discuter avec vous.\n— Oui, je sais, elle n'écoute pas, cette fois-ci je vous assure qu'elle ne viendra plus vous importuner.\n— Non, non, ce n'est pas pour ça que je suis là. Je pense que vous devriez la laisser y aller; je suis venu vous demander son extrait de naissance afin que je puisse l'inscrire, si vous voulez bien.",
          "Elle me regarda, stupéfaite. Les fonctionnaires, ici, on s'en méfie. On ne sait jamais ce qu'ils peuvent aller raconter en haut lieu. Contrarier un instituteur, un auxiliaire de l'État, surtout à cette époque où le gouvernement encourageait la scolarisation de masse, ça ne venait à l'esprit de personne. […]",
          "Après un moment de silence, la doyenne lâcha son verdict :\n— Bon, c'est d'accord.",
        ],
      },
    ],
  },
  {
    id: "juste-la-fin-du-monde",
    rang: "Deuxième sujet",
    type: "Sujet d'analyse",
    enonce:
      "Dans l'extrait de la pièce de théâtre Juste la fin du monde de Jean-Luc Lagarce, est-il juste de dire que Louis accepte sa mort prochaine ?",
    corpus: "Jean-Luc Lagarce, Juste la fin du monde (créée en 1990), extrait du monologue de Louis.",
    epoque: "XXe siècle — théâtre contemporain, écriture de l'intime",
    cahier: "Épreuve uniforme de français — 14 décembre 2022, cahier 3",
    pistes: [
      "Estudiar la fuga y la huida: « je me suis enfui », « courir devant la Mort ».",
      "Analizar la personificación de la Mort como compañera elegante y el « à quoi bon ».",
      "Observar el juego de máscaras: « je faisais semblant », « je faisais juste mine de ».",
      "Matizar: aceptación aparente (« je me tiendrai tranquille ») frente a la angustia confesada.",
    ],
    extraits: [
      {
        etiquette: "Texte unique",
        auteur: "Jean-Luc Lagarce",
        noticeAuteur: "Dramaturge français, né en 1957 et décédé en 1995.",
        titre: "Juste la fin du monde",
        annee: "1990",
        source: "Épreuve officielle",
        presentation:
          "Louis, un écrivain, est atteint d'une maladie incurable. Après des années d'absence, il décide de rendre visite à sa famille afin d'annoncer sa mort imminente. Dans cette scène, il se parle à lui-même, tentant de faire le point sur sa situation et ses motivations.",
        reference:
          "Jean-Luc LAGARCE, Juste la fin du monde, Québec, Les éditions du Septentrion, 2016, p. 67-71.",
        paragraphes: [
          "LOUIS. — […] Plus tard encore,\nc'est il y a quelques mois,\nje me suis enfui.\nJe visite le monde, je veux devenir voyageur, errer.",
          "Tous les agonisants ont ces prétentions, se fracasser la tête\ncontre les vitres de la chambre,\ndonner de grands coups d'aile imbéciles,\nerrer, perdu déjà et\ncroire disparaître,\ncourir devant la Mort,\nprétendre la semer,\nqu'elle ne puisse jamais m'atteindre ou qu'elle ne sache jamais où me retrouver.",
          "Là où j'étais et fus toujours, je ne serai plus, je serai loin,\ncaché dans les grands espaces, dans un trou,\nà me mentir et ricaner.\nJe visite.\nJ'aime être dilettante, un jeune homme faussement fragile\nqui s'étiole et prend des poses.\nJe suis un étranger. Je me protège. J'ai les mines de circonstance.",
          "Il aurait fallu me voir, avec mon secret, dans la salle d'attente des aéroports, j'étais convaincant!",
          "La Mort prochaine et moi,\nnous faisons nos adieux,\nnous nous promenons,\nnous marchons la nuit dans les rues désertes légèrement embrumées et nous nous plaisons beaucoup.\nNous sommes élégants et désinvoltes,\nnous sommes assez joliment mystérieux,\nnous ne laissons rien deviner\net les réceptionnistes, la nuit, éprouvent du respect pour nous, nous pourrions les séduire.",
          "Je ne faisais rien,\nje faisais semblant,\nj'éprouvais la nostalgie.\nJe découvre des pays, je les aime littéraires, je lis des livres, je revois quelques souvenirs,\nje fais parfois de longs détours pour juste recommencer, et d'autres jours, sans que je sache ou comprenne, il m'arrivait de vouloir tout éviter et ne plus reconnaître. Je ne crois en rien.",
          "Mais lorsqu'un soir, sur le quai de la gare (c'est une image assez convenue), dans une chambre d'hôtel, celui-là « Hôtel d'Angleterre, Neuchâtel, Suisse » ou un autre, « Hôtel du Roi de Sicile », cela m'est bien égal, ou dans la seconde salle à manger d'un restaurant plein de joyeux fêtards où je dînais seul dans l'indifférence et le bruit, on vint doucement me tapoter l'épaule en me disant avec un gentil sourire triste de gamin égaré :\n« À quoi bon? »\nce « à quoi bon » rabatteur de la Mort — elle m'avait enfin retrouvé sans m'avoir cherché —, ce « à quoi bon » me ramena à la maison, m'y renvoya, m'encourageant à revenir de mes dérisoires et vaines escapades et m'ordonnant désormais de cesser de jouer.",
          "Il est temps.\nIl est temps.\nJe traverse à nouveau le paysage en sens inverse.\nChaque lieu, même le plus laid ou le plus idiot,\nje veux noter que je le vois pour la dernière fois, je prétends le retenir. Je reviens et j'attends. Je me tiendrai tranquille, maintenant, je promets, je ne ferai plus d'histoires,\ndigne et silencieux, ces mots qu'on emploie. Je perds. J'ai perdu. Je range, je mets de l'ordre, je viens ici rendre visite, je laisse les choses en l'état, j'essaie de terminer, de tirer des conclusions, d'être paisible. Je ne gesticule plus et j'émets des sentences symboliques pleines de sous-entendus gratifiants.",
          "Je me complais.\nRien ne me flatte autant, désormais, que ma propre angoisse.\nIl m'arrivait aussi parfois,\n« les derniers temps »,\nde me sourire à moi-même comme pour une photographie\nà venir.\nVos doigts se la repassent en prenant garde de ne pas la salir\nou d'y laisser de coupables empreintes.\n« Il était exactement ainsi »\net c'est tellement faux,\nsi vous réfléchissiez un instant vous pourriez l'admettre,\nc'était tellement faux,\nje faisais juste mine de.",
        ],
      },
    ],
  },
  {
    id: "relation-naissante",
    rang: "Troisième sujet",
    type: "Sujet de comparaison",
    enonce:
      "Après avoir lu les extraits des romans Au milieu, la montagne de Roger Viau et Bonheur d'occasion de Gabrielle Roy, peut-on conclure que Gilbert et Jean vivent leur relation naissante de la même manière ?",
    corpus:
      "Roger Viau, Au milieu, la montagne (1951) · Gabrielle Roy, Bonheur d'occasion (1945).",
    epoque: "XXe siècle — réalisme urbain québécois",
    cahier: "Épreuve uniforme de français — 14 décembre 2022, cahier 3",
    pistes: [
      "Comparar el conflicto interior de los dos hombres frente a la diferencia de clase social.",
      "Analizar el retrato de Jacqueline y de Florentine a través de la mirada masculina.",
      "Estudiar el narrador omnisciente y el discours indirect libre en ambos extractos.",
      "Matizar: atracción compartida, pero ternura admirativa en Gilbert vs. violencia y desprecio en Jean.",
    ],
    extraits: [
      {
        etiquette: "Texte 1",
        auteur: "Roger Viau",
        noticeAuteur: "Écrivain québécois, né en 1906 et décédé en 1986.",
        titre: "Au milieu, la montagne",
        annee: "1951",
        source: "Épreuve officielle",
        presentation:
          "L'histoire se déroule à Montréal dans les années trente. Gilbert Sergent, issu d'une famille aisée, fréquente depuis peu Jacqueline Malo, fille de chômeur. Au moment où débute l'extrait, il vient, sur un coup de tête, de l'inviter à l'accompagner à un bal dans un des plus prestigieux hôtels de la ville.",
        reference:
          "Roger VIAU, Au milieu, la montagne, Montréal, Éditions Les Herbes rouges, coll. Typo, 1987, p. 165-168.",
        notes: [
          "Outremont : municipalité cossue devenue un arrondissement de la ville de Montréal en 2002.",
          "la Montagne : surnom désignant le mont Royal, situé au centre de l'île de Montréal.",
        ],
        paragraphes: [
          "[Gilbert] conduisait nerveusement, irrité contre lui-même. « Imbécile! » se répétait-il. Avoir été assez stupide pour l'inviter à danser à l'hôtel Mont-Royal. Tout de même! Une seule solution, cesser de la voir… pour quelque temps du moins.",
          "Depuis plus d'un mois qu'il connaissait Jacqueline Malo, il essayait de s'expliquer l'attirance qu'elle exerçait sur lui. Il disait attirance pour ne pas nommer un sentiment trop violent qui l'exaspérait. Réaliste et se croyant peu sentimental, il s'était toujours moqué des regards attendris, des mains qui se tiennent. Et il en était presque rendu là. Combien de fois il s'était promis de ne plus la revoir? Quand il se retrouvait avec elle, ses promesses, ses hésitations, ses doutes, tout s'envolait. Il était plus ensorcelé que jamais. Dès qu'il était seul, ses incertitudes le reprenaient. Il s'efforçait de nier son sentiment. Il tentait de se convaincre qu'un emballement aussi brusque ne pouvait être sérieux, il allait le voir s'éteindre aussi vite qu'il s'était enflammé. En lui-même surgissaient des raisons pour s'opposer à son affection. Il se créait des obligations et des responsabilités, lui qui ne s'était jamais préoccupé des conséquences de ses aventures précédentes. Il craignait de se sentir coupable, si, par ses assiduités, il faisait naître chez cette jeune fille un sentiment auquel lui-même ne répondait pas.",
          "[…] Il chercha de nouvelles raisons pour s'éloigner de Jacqueline. Mais il y aurait toujours cette maudite soirée au Mont-Royal, puisqu'il l'avait invitée. L'eau se glaçait maintenant sur le pare-brise de la voiture. « Ces temps de fou que nous avons en plein milieu de l'hiver. » Il se revoyait avec Jacqueline. Certes elle n'était pas bête, inculte sans doute, cependant toute idée nouvelle se développait avec vivacité dans son jeune esprit. Depuis qu'il lui avait offert quelques livres, elle se passionnait pour la lecture, et déjà elle émettait son opinion sur certains auteurs. S'il contredisait ses jugements, elle l'écoutait avec un sérieux touchant comme s'il avait été un critique infaillible. C'était plaisir de travailler dans une terre aussi riche, de transformer un esprit vierge aussi malléable qui ne demandait pas mieux que d'être fécondé. La plupart des jeunes filles perdaient tout intérêt dans la conversation à la moindre allusion sérieuse; d'autres, plus cultivées, se montraient trop fières de leur culture et elles auraient cru se dégrader en abordant un sujet trop léger. Jacqueline ne connaissait pas encore le mot « intellectuel » avec tout ce qu'il traîne de pédantisme. Elle passait d'un air grave à un rire aigu, sautait d'une discussion sur un livre à l'explication d'un pas de danse. Il aimait ces contrastes.",
          "Malgré son admiration, il ne parvenait pas à chasser le malaise qu'il ressentait loin d'elle, un malaise persistant, indéfini, dont les causes lui échappaient. Était-ce la défiance habituelle des gens riches qui craignent d'être recherchés pour des raisons matérielles? Déjà les jeunes filles à l'aise ne sont pas exemptes du soupçon de courir les partis avantageux, comment juger de la sincérité d'une fille de chômeur? Fille de chômeur! Il se refusait de tenir compte de la différence de condition qui existait entre eux.",
          "Gilbert approchait de chez lui. L'eau ruisselait dans les côtes d'Outremont¹, et il donnait des coups de volant à droite et à gauche pour rétablir la voiture qui dérapait sur la glace délavée. Malgré toute l'attention qu'exigeait la conduite de l'auto, il pensait à Jacqueline. Fille de chômeur… On ne pouvait certes pas l'accuser de courir après lui, elle manifestait au contraire une farouche indépendance. S'il se montrait froid, comme cela lui arrivait au téléphone, elle devenait distante, presque hostile. « Si ça ne vous tente pas de me voir, vous n'avez qu'à le dire! » Il se rappelait leur première randonnée dans la Montagne². Ce jour-là, même la présence de Jacqueline n'avait pas réussi à effacer tout à fait ses hésitations, et il s'était montré distant au début de leur course. Jacqueline, au lieu de tenter de le dérider, avait adopté la même attitude détachée. La montée n'avait été coupée que de monosyllabes polis. Puis dans une descente où le vent avait balayé la neige laissant à découvert une surface glacée, Jacqueline avait piqué une tête à travers la croûte de glace. Il s'était précipité vers elle, si visiblement inquiet qu'elle avait éclaté de rire : « Maintenant que la glace est cassée, on peut rire un peu pour faire changement. » Du coup son emballement pour elle lui était revenu. Aujourd'hui, s'il se souvenait de cet incident, c'était moins à cause de son mot que pour se rappeler son indépendance en face de son indifférence à lui.",
        ],
      },
      {
        etiquette: "Texte 2",
        auteur: "Gabrielle Roy",
        noticeAuteur: "Romancière franco-manitobaine, née en 1909 et décédée en 1983.",
        titre: "Bonheur d'occasion",
        annee: "1945",
        source: "Épreuve officielle",
        presentation:
          "L'histoire se situe à Montréal en 1940. Jean Lévesque a rencontré Florentine Lacasse au restaurant où elle travaille, dans le quartier ouvrier de Saint-Henri. Espérant le séduire, Florentine a invité Jean chez elle.",
        reference:
          "Gabrielle ROY, Bonheur d'occasion, Montréal, Les Éditions du Boréal, coll. Boréal compact, 1993, p. 212-214.",
        paragraphes: [
          "Jean se mit debout. Il regarda autour de lui avec étonnement, car il ne se souvenait plus du point de départ de ses pensées. Le silence pesait sur lui. L'humble arrangement domestique d'objets si nécessairement confondus avec les gestes de la vie le gênait. Il voulut fuir. Dans la cuisine, il aperçut Florentine qui se haussait devant la petite glace de l'évier et tournait ses cheveux autour de ses doigts. Il s'irrita d'être seul avec elle et si proche d'une curiosité à nouveau débordante qu'il n'avait pas prévue. Il appela la jeune fille sur une note impatiente. Elle vint aussitôt, mettant entre eux un petit plat de bonbons. Presque rudement, il le lui arracha des mains; il ne pouvait plus souffrir cette espèce d'apprivoisement auquel elle semblait vouloir le soumettre.",
          "— Comment se fait-il que tes parents ne sont pas là? demanda-t-il. Ils sont partis pour la journée?\nLes yeux de la jeune fille parurent ingénus et limpides.\n— Je sais pas trop. Mais je pense qu'ils sont à la veille de revenir.\n— C'est parce que tu savais être seule aujourd'hui que tu m'as invité?\nElle prit crainte à l'expression de ses yeux.\n— Ben non. Ils ont parlé de partir rien qu'à matin…\n— Où sont-ils allés?\n— Aux sucres, je crois ben. En effet, papa a parlé d'aller aux sucres à matin. Ça fait qu'ils ont dû se décider.",
          "Les mots s'arrêtèrent dans sa gorge; elle vit qu'il ne la croyait pas. Mais elle chercha encore à lui donner le change, s'empêtrant dans son mensonge.\n— Quand maman a vu qu'il faisait si beau à matin, tu comprends…\nDe nouveau, elle fléchit sous son regard, puis brusquement prit le parti de paraître très fâchée, très vexée de son incrédulité.\n— Si tu penses que tu connais toute! fit-elle.",
          "Il l'avait saisie aux poignets et soudain jeta les bras autour d'elle comme pour la briser. Son désir l'exaspérait. Il était venu vers elle, assuré de la trouver au milieu des siens, à contrecoeur, imaginant une petite réunion de famille qui le glacerait d'ennui et cependant résolu à le subir par cette espèce d'orgueil qu'il mettait à tenir sa parole, même imprudemment donnée. Mais non, au fait, pourquoi était-il venu sinon parce que cette jeune fille en larmes, la veille, l'avait un instant désarmé, qu'elle l'avait amené à un peu de compassion. Stupidité de sa faiblesse! Voici qu'il la surprenait plus rusée et tenace que jamais. Elle minaudait devant lui en ce moment; elle cherchait à le conquérir; elle retrouvait d'instinct toutes les coquetteries qui l'avaient servie à se faire remarquer de lui au restaurant.",
          "La violence et le regret de lui avoir cédé la veille l'ébranlaient.\n— Oh, fit-il, agacé, va chercher ton chapeau et on ira aux vues.",
          "Mais il la retenait contre lui. Il savait maintenant que la maison de Florentine lui rappelait ce qu'il avait par-dessus tout redouté : l'odeur de la pauvreté, cette odeur implacable des vêtements pauvres, cette pauvreté qu'on reconnaît les yeux clos. Il comprenait que Florentine elle-même personnifiait ce genre de vie misérable contre laquelle tout son être se soulevait. Et dans le même instant, il saisit la nature du sentiment qui le poussait vers la jeune fille. Elle était sa misère, sa solitude, son enfance triste, sa jeunesse solitaire; elle était tout ce qu'il avait haï, ce qu'il reniait et aussi ce qui restait le plus profondément lié à lui-même, le fond de sa nature et l'aiguillon puissant de sa destinée.",
          "[…]",
          "Florentine maintenant était toute craintive sous ses prunelles sombres qui, en la regardant, s'emplissaient d'égarement. L'imprudence de sa conduite lui était si visible enfin que l'issue, l'irréparable devant elle, lui paraissait déjà impossible à éluder.",
          "Elle chercha à s'esquiver et, dans le geste qu'il fit pour la retenir, ses doigts s'accrochèrent à une bretelle du tablier. L'étroite bande de caoutchouc sauta. Et ce vêtement déchiré, qui pendait à moitié, affola le jeune homme.",
          "Dans un grand effort de volonté, il souffla encore à l'oreille de Florentine :\n— Va chercher ton chapeau…, ton manteau…",
        ],
      },
    ],
  },
];

/** Prochaines dates officielles de l'épreuve uniforme de français. */
export const DATES_EPREUVE = [
  "2026-05-13",
  "2026-08-12",
  "2026-12-16",
  "2027-05-12",
  "2027-08-04",
  "2027-12-15",
];

export const REGLES = {
  duree: "4 h 30",
  mots: 900,
  motsMin: 800,
  erreursMax: 30,
  seuil: "Cote C (60 %) obligatoire à chacun des trois critères",
};

export const OUVRAGES_PERMIS = [
  "Dictionnaire unilingue ou bilingue",
  "Dictionnaire des difficultés",
  "Dictionnaire de synonymes",
  "Dictionnaire des noms propres",
  "Guide de conjugaison",
  "Grammaire",
  "Traité de ponctuation",
];

export const OUVRAGES_INTERDITS = [
  "Anthologie",
  "Manuel d'histoire littéraire",
  "Guide de rédaction",
  "Dictionnaire des figures de style",
  "Notes de cours ou notes personnelles",
  "Téléphone, montre ou lunettes intelligentes",
];
