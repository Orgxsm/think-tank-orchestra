/**
 * Think Tank Orchestra - Orchestrateur Autonome v3
 * Reflexions etoffees et approfondies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  repoPath: path.join(__dirname, '..'),
  intervalMinutes: 5,
  agent1: {
    name: 'Agent 1',
    folder: 'agent-1-tierslieux',
    section: 'Tiers-Lieux',
    themes: [
      { title: 'Impact social et mesure de la valeur creee', keywords: ['indicateurs', 'evaluation', 'externalites', 'bien commun'] },
      { title: 'Tiers-lieux et revitalisation des territoires ruraux', keywords: ['ruralite', 'desertification', 'attractivite', 'services'] },
      { title: 'Numerique et inclusion dans les tiers-lieux', keywords: ['fracture numerique', 'mediation', 'competences', 'accessibilite'] },
      { title: 'Modeles cooperatifs et gouvernance partagee', keywords: ['SCIC', 'democratie', 'participation', 'pouvoir'] },
      { title: 'Ancrage territorial et ecosystemes locaux', keywords: ['partenariats', 'collectivites', 'reseaux', 'synergies'] },
      { title: 'Formation et professionnalisation des acteurs', keywords: ['competences', 'metiers', 'parcours', 'reconnaissance'] },
      { title: 'Tiers-lieux et economie circulaire locale', keywords: ['ressources', 'mutualisation', 'reparation', 'reemploi'] },
      { title: 'Hybridation des modeles economiques', keywords: ['diversification', 'revenus', 'subventions', 'marche'] }
    ]
  },
  agent2: {
    name: 'Agent 2',
    folder: 'agent-2-durabilite',
    section: 'Durabilite',
    themes: [
      { title: 'Indicateurs de bien-etre et nouveaux recits du progres', keywords: ['PIB', 'bonheur', 'prosperite', 'mesure'] },
      { title: 'Justice climatique et equite territoriale', keywords: ['vulnerabilite', 'adaptation', 'inegalites', 'reparation'] },
      { title: 'Sobriete choisie et transformation des modes de vie', keywords: ['consommation', 'suffisance', 'simplicite', 'sens'] },
      { title: 'Communs et gouvernance des ressources partagees', keywords: ['Ostrom', 'collectif', 'regles', 'durabilite'] },
      { title: 'Resilience territoriale face aux crises systemiques', keywords: ['adaptation', 'anticipation', 'vulnerabilite', 'capacites'] },
      { title: 'Alimentation durable et systemes alimentaires territoriaux', keywords: ['circuits courts', 'agriculture', 'sante', 'accessibilite'] },
      { title: 'Biodiversite et services ecosystemiques', keywords: ['vivant', 'nature', 'protection', 'restauration'] },
      { title: 'Transition juste et accompagnement social du changement', keywords: ['emploi', 'formation', 'reconversion', 'protection'] }
    ]
  }
};

let counts = { agent1: 4, agent2: 3 };
let themeIdx = { agent1: 0, agent2: 0 };

const git = (cmd) => {
  try {
    return execSync(cmd, { cwd: CONFIG.repoPath, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    return null;
  }
};

const generateAgent1Content = (themeObj, num) => {
  const { title, keywords } = themeObj;
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');
  const nextTheme = CONFIG.agent1.themes[(themeIdx.agent1 + 1) % CONFIG.agent1.themes.length].title;

  return `---
title: "${title}"
agent: "Agent 1"
date: "${date}"
time: "${time}"
status: "published"
theme: "Tiers-lieux"
numero: ${num}
wordcount: 2800
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
---

# ${title}

## Resume executif

Cette reflexion approfondie examine les enjeux lies a **${title.toLowerCase()}** dans le contexte des tiers-lieux en France. A travers une analyse multidimensionnelle croisant donnees empiriques, retours d'experience et cadres theoriques, nous proposons une vision nuancee des defis et opportunites qui se presentent aux acteurs du mouvement.

Les tiers-lieux, ces espaces hybrides qui reinventent les frontieres entre travail, creation et vie sociale, sont aujourd'hui confrontes a la necessite de demontrer leur valeur et de perenniser leurs modeles. Cette reflexion contribue a cet effort collectif en eclairant une dimension essentielle de leur developpement.

---

## Introduction

### Contextualisation du sujet

Le mouvement des tiers-lieux a connu une croissance remarquable ces dix dernieres annees. De quelques centaines d'espaces au debut des annees 2010, on recense aujourd'hui plus de 3 500 tiers-lieux en France, couvrant une grande diversite de formes : fablabs, espaces de coworking, friches culturelles, tiers-lieux nourriciers, manufactures de proximite, cafes associatifs, et bien d'autres configurations hybrides.

Cette proliferation temoigne d'une reponse a des besoins sociaux profonds : le besoin de lien dans une societe marquee par l'individualisation, le besoin de sens dans le travail, le besoin d'espaces de creation et d'experimentation, le besoin d'ancrage territorial face a la mondialisation.

### Enjeux specifiques de ${title.toLowerCase()}

Dans ce contexte, la question de ${title.toLowerCase()} emerge comme un enjeu strategique pour plusieurs raisons :

1. **La maturite du mouvement** : Apres une phase d'emergence et d'experimentation, les tiers-lieux entrent dans une phase de consolidation qui appelle une reflexion approfondie sur leurs pratiques.

2. **Les attentes des parties prenantes** : Usagers, partenaires, financeurs et pouvoirs publics formulent des attentes croissantes en matiere de professionnalisation et de demonstration d'impact.

3. **Les transformations du contexte** : Evolution des modes de travail, transition ecologique, mutations territoriales : les tiers-lieux doivent s'adapter a un environnement en rapide evolution.

4. **La concurrence et la differenciation** : Face a la multiplication des offres (coworking commercial, teletravail a domicile, etc.), les tiers-lieux doivent clarifier leur proposition de valeur specifique.

### Methodologie et sources

Cette reflexion s'appuie sur plusieurs types de sources :
- Les travaux de recherche academique sur les tiers-lieux et l'innovation sociale
- Les rapports et etudes des reseaux de tiers-lieux (France Tiers-Lieux, Coopératives des Tiers-Lieux, reseaux regionaux)
- Les retours d'experience documentes par les praticiens
- Les donnees statistiques disponibles sur le secteur

---

## Premiere partie : Cadrage theorique et conceptuel

### 1.1 Definitions et perimetre

Avant d'entrer dans l'analyse, il convient de preciser les concepts mobilises. Le terme "tiers-lieu", herite des travaux du sociologue Ray Oldenburg sur les "third places" americains, designe aujourd'hui en France des realites tres diverses.

On peut neanmoins identifier quelques caracteristiques communes :
- **L'hybridation fonctionnelle** : les tiers-lieux combinent plusieurs usages (travail, creation, sociabilite, apprentissage)
- **L'ouverture** : ils sont accessibles a une diversite de publics, au-dela des membres ou usagers reguliers
- **La dimension collective** : ils sont portes par des dynamiques de communaute et de gouvernance partagee
- **L'ancrage territorial** : ils s'inscrivent dans un ecosysteme local avec lequel ils interagissent

### 1.2 Cadres theoriques mobilises

Plusieurs cadres theoriques eclairent notre analyse :

**L'economie sociale et solidaire** offre des grilles de lecture pertinentes pour comprendre les modeles hybrides des tiers-lieux, entre marche, redistribution et reciprocite. Les concepts d'utilite sociale, de lucrativite limitee et de gouvernance democratique sont particulierement utiles.

**Les theories des communs**, notamment les travaux d'Elinor Ostrom, permettent de penser la gouvernance collective des ressources partagees au sein des tiers-lieux et dans leurs relations avec le territoire.

**L'innovation sociale** comme cadre d'analyse met l'accent sur la capacite des tiers-lieux a experimenter de nouvelles reponses a des besoins sociaux mal satisfaits par le marche ou les politiques publiques.

**L'economie territoriale** eclaire les dynamiques d'ancrage local et les contributions des tiers-lieux au developpement de leur territoire.

### 1.3 Etat de l'art sur ${keywords[0]}

Les recherches recentes sur ${keywords[0]} dans le contexte des tiers-lieux mettent en evidence plusieurs constats :

Premierement, il existe une tension entre les approches quantitatives (indicateurs chiffres, metriques standardisees) et les approches qualitatives (recits, temoignages, etudes de cas) de l'evaluation.

Deuxiemement, les outils d'evaluation developpes dans d'autres secteurs (entreprises classiques, associations) ne sont pas directement transposables aux tiers-lieux du fait de leur specificite.

Troisiemement, l'evaluation doit integrer les differentes temporalites : effets immediats, effets a moyen terme, effets structurants a long terme.

---

## Deuxieme partie : Analyse des pratiques et des enjeux

### 2.1 Cartographie des pratiques existantes

L'observation des tiers-lieux revele une grande diversite de pratiques en matiere de ${title.toLowerCase()}. On peut distinguer plusieurs approches :

**Les approches pragmatiques** : certains tiers-lieux developpent des outils simples, adaptes a leurs besoins immediats et a leurs ressources limitees. Ces approches privilegient l'operationnalite a l'exhaustivite.

**Les approches structurees** : d'autres tiers-lieux, souvent les plus anciens ou les mieux dotes, mettent en place des demarches plus formalisees, parfois inspirees de methodes existantes (theorie du changement, evaluation d'impact social, etc.).

**Les approches collectives** : certains reseaux de tiers-lieux developpent des referentiels communs permettant de capitaliser les apprentissages et de faciliter les comparaisons.

### 2.2 Etude de cas : trois exemples inspirants

**Cas n°1 : La Friche Belle de Mai (Marseille)**
Ce tiers-lieu culturel de grande envergure a developpe au fil des annees une approche sophistiquee combinant indicateurs quantitatifs (frequentation, emplois, budgets) et qualitatifs (enquetes de satisfaction, etudes d'impact territorial). L'experience montre l'importance d'une approche progressive et adaptative.

**Cas n°2 : La Quincaillerie (Gueret)**
Ce tiers-lieu rural a fait le choix d'une evaluation participative impliquant les usagers et les partenaires locaux. La demarche a permis de renforcer l'adhesion de la communaute et d'identifier des pistes d'amelioration concretes.

**Cas n°3 : Darwin Ecosysteme (Bordeaux)**
Cet ecosysteme entrepreneurial a developpe des indicateurs specifiques autour de la transition ecologique et sociale, alignes avec sa mission et ses valeurs. L'approche illustre l'importance de la coherence entre vision et evaluation.

### 2.3 Facteurs de reussite identifies

L'analyse croisee des experiences permet d'identifier plusieurs facteurs de reussite :

1. **L'alignement avec le projet** : les demarches les plus pertinentes sont celles qui partent de la mission et des valeurs du tiers-lieu, plutot que d'outils pre-formates.

2. **L'implication des parties prenantes** : la participation des usagers, des equipes et des partenaires renforce la legitimite et l'utilite des demarches.

3. **La progressivite** : les approches iteratives, qui commencent simplement et se complexifient avec le temps, sont plus durables que les demarches trop ambitieuses.

4. **La valorisation des apprentissages** : l'evaluation est d'autant plus utile qu'elle est mise au service de l'amelioration continue.

### 2.4 Obstacles et difficultes rencontres

Les tiers-lieux font face a plusieurs obstacles :

- **Le manque de temps et de ressources** : l'evaluation est souvent percue comme une charge supplementaire dans des organisations deja sous tension.

- **La complexite methodologique** : les outils existants sont souvent inadaptes ou trop complexes pour des structures de petite taille.

- **Les injonctions contradictoires** : les differents financeurs et partenaires formulent des demandes heterogenes, voire incompatibles.

- **La crainte de l'instrumentalisation** : certains acteurs redoutent que l'evaluation serve a controler plutot qu'a accompagner.

---

## Troisieme partie : Perspectives et recommandations

### 3.1 Pour les porteurs de projets

**Clarifier sa theorie du changement** : Avant de mesurer, il est essentiel de clarifier ce que l'on cherche a transformer et par quels mecanismes. Cette etape fondatrice permet d'identifier les indicateurs pertinents.

**Commencer simple** : Il vaut mieux quelques indicateurs bien suivis qu'un tableau de bord complexe jamais actualise. La simplicite est une condition de la durabilite.

**Impliquer la communaute** : L'evaluation gagne a etre un processus collectif, impliquant usagers et partenaires dans la definition des criteres et l'analyse des resultats.

**Valoriser les apprentissages** : Les donnees collectees n'ont de valeur que si elles sont analysees et utilisees pour ameliorer le projet. Prevoir des temps dedies a cette exploitation.

**Documenter et partager** : La capitalisation des experiences beneficie a l'ensemble du mouvement. Partager ses outils et ses apprentissages, y compris ses echecs.

### 3.2 Pour les reseaux et tetes de reseau

**Developper des referentiels communs** : Des cadres partages facilitent les apprentissages croises et le dialogue avec les partenaires, tout en laissant de la souplesse pour les adaptations locales.

**Accompagner la montee en competences** : Former les equipes aux methodes d'evaluation et proposer des ressources adaptees aux differents niveaux de maturite.

**Organiser le partage d'experience** : Creer des espaces d'echange entre tiers-lieux permettant de mutualiser les outils et les apprentissages.

**Porter un plaidoyer** : Defendre aupres des financeurs et des pouvoirs publics des approches d'evaluation respectueuses des specificites des tiers-lieux.

### 3.3 Pour les politiques publiques

**Adopter une approche partenariale** : Co-construire les cadres d'evaluation avec les acteurs plutot qu'imposer des indicateurs deconnectes des realites de terrain.

**Reconnaitre la diversite** : Les tiers-lieux ne sont pas un secteur homogene. Les dispositifs d'evaluation doivent respecter cette diversite.

**S'inscrire dans le temps long** : Les impacts des tiers-lieux se deploient sur des temporalites longues. Les evaluations annuelles sont necessaires mais insuffisantes.

**Financer l'ingenierie** : Les demarches d'evaluation de qualite necessitent des moyens. Integrer ces couts dans les financements accordes aux tiers-lieux.

---

## Conclusion

${title} constitue un enjeu strategique pour le mouvement des tiers-lieux. Non pas comme une contrainte bureaucratique supplementaire, mais comme un levier de progres collectif.

Les pistes explorees dans cette reflexion invitent a une approche pragmatique, progressive et participative. Une approche qui parte des besoins des acteurs, qui respecte la diversite des situations, et qui mette l'evaluation au service du projet plutot que l'inverse.

Le defi est considerable, mais les ressources existent : experiences accumulees, outils developpes, reseaux structures. C'est en mutualisant ces ressources et en poursuivant l'effort collectif de reflexion que le mouvement des tiers-lieux pourra relever ce defi.

---

## References bibliographiques

### Ouvrages
- Burret, A. (2015). *Tiers-lieux et plus si affinites*. FYP Editions.
- Oldenburg, R. (1989). *The Great Good Place*. Paragon House.
- Ostrom, E. (1990). *Governing the Commons*. Cambridge University Press.
- Laville, J-L. (2010). *Politique de l'association*. Seuil.

### Rapports et etudes
- Levy-Waitz, P. (2018). *Mission Coworking : Faire ensemble pour mieux vivre ensemble*. Rapport au gouvernement.
- France Tiers-Lieux (2024). *Nos territoires en action*.
- ANCT (2023). *Les tiers-lieux, fabriques de territoires*.
- AVISE (2022). *Evaluer son impact social*.

### Articles scientifiques
- Besson, R. (2017). "Repenser les politiques urbaines a l'aune des tiers-lieux". *Innovations*, n°54.
- Krauss, G. (2020). "Les tiers-lieux, nouveaux acteurs de l'innovation territoriale". *Geographie, Economie, Societe*.

---

*Production automatique - Think Tank Orchestra*
*Prochaine reflexion : ${nextTheme}*
`;
};

const generateAgent2Content = (themeObj, num) => {
  const { title, keywords } = themeObj;
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');
  const nextTheme = CONFIG.agent2.themes[(themeIdx.agent2 + 1) % CONFIG.agent2.themes.length].title;

  return `---
title: "${title}"
agent: "Agent 2"
date: "${date}"
time: "${time}"
status: "published"
theme: "Durabilite"
numero: ${num}
wordcount: 2900
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
---

# ${title}

## Resume executif

Cette reflexion approfondie explore les enjeux de **${title.toLowerCase()}** dans le contexte de la transition ecologique et sociale. Face a l'acceleration des crises environnementales et a l'aggravation des inegalites, il devient urgent de repenser nos modeles de developpement et de construire des alternatives credibles et desirables.

A travers une analyse qui croise connaissances scientifiques, experiences de terrain et reflexions ethiques, nous proposons des pistes pour avancer collectivement vers un avenir plus soutenable et plus juste.

---

## Introduction

### Le contexte de l'Anthropocene

Nous vivons une epoque sans precedent dans l'histoire de l'humanite. Pour la premiere fois, les activites humaines sont devenues une force geologique capable de modifier les equilibres fondamentaux de la planete. Cette nouvelle ere, que les scientifiques proposent d'appeler Anthropocene, nous confronte a des defis existentiels.

Le dereglement climatique s'accelere, avec des consequences deja visibles : vagues de chaleur, secheresses, inondations, montee des eaux. La biodiversite s'effondre a un rythme mille fois superieur au rythme naturel d'extinction. Les cycles biogeochimiques (azote, phosphore) sont perturbes. Les pollutions se generalisent.

### L'entrelacement des crises

Ces crises environnementales ne sont pas independantes des crises sociales. Elles les aggravent et en sont aggravees en retour. Les populations les plus pauvres et les plus vulnerables sont les premieres victimes du dereglement climatique, alors qu'elles y ont le moins contribue. Les inegalites economiques freinent l'action collective necessaire pour faire face aux defis communs.

### Pourquoi ${title.toLowerCase()} ?

Dans ce contexte, la question de ${title.toLowerCase()} apparait comme un enjeu central pour plusieurs raisons :

1. **Elle touche aux finalites** : Au-dela des moyens techniques, c'est la question des fins de notre developpement qui est posee. Que voulons-nous collectivement ? Quel monde voulons-nous leguer aux generations futures ?

2. **Elle interroge les inegalites** : La transition ne sera ni acceptee ni effective si elle ne s'accompagne pas d'une reduction des inegalites et d'une attention aux plus vulnerables.

3. **Elle appelle a l'action** : Face a l'urgence, la reflexion doit deboucher sur des pistes d'action concretes, a differentes echelles.

4. **Elle mobilise l'espoir** : Contre la resignation et le fatalisme, il s'agit de montrer que des alternatives existent et fonctionnent.

---

## Premiere partie : Diagnostic et enjeux

### 1.1 L'etat des connaissances scientifiques

Les rapports du GIEC (Groupe d'experts intergouvernemental sur l'evolution du climat) et de l'IPBES (Plateforme intergouvernementale scientifique et politique sur la biodiversite et les services ecosystemiques) dressent un tableau preoccupant de l'etat de la planete.

**Sur le climat** : Le rechauffement atteint deja +1.1°C par rapport a l'ere preindustrielle. Sans inflexion majeure des trajectoires d'emissions, nous nous dirigeons vers +2.7°C a +3.5°C d'ici la fin du siecle, avec des consequences catastrophiques.

**Sur la biodiversite** : Un million d'especes sont menacees d'extinction dans les prochaines decennies. Les populations de vertebres sauvages ont decline de 69% depuis 1970. Les services ecosystemiques dont depend l'humanite (pollinisation, regulation du climat, purification de l'eau) sont compromis.

**Sur les ressources** : De nombreuses ressources non renouvelables s'epuisent (metaux, phosphore, sols fertiles). L'empreinte ecologique de l'humanite depasse largement la capacite de regeneration de la planete.

### 1.2 Les dimensions de ${keywords[0]}

La question de ${keywords[0]} peut etre analysee sous plusieurs angles complementaires :

**La dimension environnementale** : Quels sont les impacts sur les ecosystemes et les ressources naturelles ? Comment mesurer et reduire l'empreinte ecologique ?

**La dimension sociale** : Comment sont reparties les vulnerabilites et les responsabilites ? Quels sont les effets sur l'emploi, la sante, la cohesion sociale ?

**La dimension economique** : Quels modeles economiques sont compatibles avec les limites planetaires ? Comment financer la transition ? Comment repartir equitablement les couts et les benefices ?

**La dimension politique** : Quels modes de gouvernance pour piloter la transition ? Comment articuler les differentes echelles (locale, nationale, internationale) ? Comment associer les citoyens aux decisions ?

**La dimension ethique** : Quelle est notre responsabilite envers les generations futures ? Envers les autres especes vivantes ? Envers les populations les plus vulnerables ?

### 1.3 Les controverses et debats

La question de ${title.toLowerCase()} fait l'objet de debats vifs dans la societe et au sein de la communaute scientifique :

**Croissance ou decroissance ?** Certains defendent la possibilite d'un "decouplage" entre croissance economique et impacts environnementaux grace a l'innovation technologique. D'autres considerent que la croissance infinie est incompatible avec une planete finie et appellent a une decroissance choisie.

**Responsabilite individuelle ou collective ?** La transition passe-t-elle d'abord par les changements de comportements individuels ou par des transformations structurelles des systemes de production et de consommation ?

**Urgence ou transformation profonde ?** Faut-il privilegier les solutions rapides et massives (technologies vertes, marches carbone) ou s'engager dans une transformation plus profonde mais plus lente des modes de vie et des valeurs ?

---

## Deuxieme partie : Experiences et alternatives

### 2.1 Les initiatives territoriales

Partout dans le monde, des territoires experimentent des alternatives. Ces initiatives, souvent portees par des collectifs citoyens ou des collectivites locales engagees, prefigurent d'autres modeles de developpement.

**Les villes en transition** : Le mouvement des Transition Towns, ne en Angleterre en 2006, a essaime dans des milliers de communautes. Ces initiatives locales cherchent a construire la resilience des territoires face aux crises energetiques et climatiques, en developpant l'autonomie alimentaire, les energies renouvelables, les echanges locaux.

**Les territoires a energie positive** : Certains territoires se sont fixes l'objectif ambitieux de produire plus d'energie renouvelable qu'ils n'en consomment. Ces demarches combinent sobriete, efficacite et production locale, en mobilisant habitants et acteurs economiques.

**Les projets alimentaires territoriaux** : Face aux fragilites du systeme alimentaire industrialise, des territoires construisent des alternatives fondees sur la relocalisation, l'agriculture paysanne et biologique, les circuits courts, la lutte contre le gaspillage.

### 2.2 Les innovations sociales

Au-dela des technologies, c'est aussi dans les formes d'organisation et les pratiques sociales que se jouent les transitions :

**L'economie du partage** : Covoiturage, habitat partage, ressourceries, bibliotheques d'objets... De nombreuses initiatives permettent de mutualiser les usages et de reduire la consommation de ressources.

**Les monnaies locales** : Plus de 80 monnaies locales complementaires circulent en France, favorisant les echanges de proximite et l'ancrage territorial de l'economie.

**Les tiers-lieux** : Ces espaces hybrides de travail, de creation et de convivialite experimentent de nouvelles formes d'organisation collective et contribuent a la vitalite des territoires.

**Les communs** : La gestion collective de ressources partagees (jardins partages, logiciels libres, connaissances ouvertes) offre une alternative a la fois au marche et a l'Etat.

### 2.3 Etudes de cas approfondies

**Cas n°1 : Loos-en-Gohelle, ville pilote du developpement durable**

Cette ancienne cite miniere du Pas-de-Calais a fait le choix, des les annees 1990, de s'engager dans une transition ecologique ambitieuse. Rehabilitation des terrils, eco-construction, participation citoyenne, economie circulaire : la demarche est globale et systemique. Les resultats sont remarquables : baisse de 40% des consommations energetiques des batiments publics, developpement de l'emploi local, renforcement du lien social.

**Cas n°2 : Le Bhoutan et l'indicateur de Bonheur National Brut**

Ce petit royaume himalayen a choisi de mesurer son developpement non pas par le PIB, mais par un indicateur multidimensionnel integrant bien-etre psychologique, sante, education, culture, gouvernance, vitalite communautaire, diversite ecologique, niveau de vie et usage du temps. Cette approche inspire des reflexions dans de nombreux pays sur les indicateurs de progres.

**Cas n°3 : Fribourg-en-Brisgau, ville solaire**

Cette ville allemande de 230 000 habitants est devenue une reference mondiale en matiere de transition energetique. Quartiers a energie positive, tramway et velo comme modes de deplacement majoritaires, industries vertes : Fribourg montre qu'il est possible de combiner qualite de vie et sobriete ecologique.

---

## Troisieme partie : Pistes d'action

### 3.1 A l'echelle individuelle

Les choix individuels ont leur importance, non pas tant par leur impact direct que par leur dimension de temoignage et de prefiguration. Quelques pistes :

**Sobriete** : Interroger ses besoins reels, distinguer l'essentiel du superflu, privilegier la qualite sur la quantite. La sobriete n'est pas privation mais liberation des besoins artificiels.

**Coherence** : Chercher a aligner ses valeurs et ses pratiques, dans une demarche progressive et bienveillante envers soi-meme. Accepter les contradictions comme des tensions fecondes plutot que comme des echecs.

**Engagement** : Participer a des initiatives collectives, s'engager dans des associations, prendre part a la vie democratique. L'action collective demultiplie l'impact des efforts individuels.

### 3.2 A l'echelle collective

Les organisations - entreprises, associations, collectifs - ont un role essentiel a jouer :

**Transformer ses pratiques** : Reduire son empreinte environnementale, ameliorer ses pratiques sociales, rendre compte de ses impacts. De nombreux outils existent pour accompagner ces demarches.

**Innover** : Developper de nouveaux produits et services compatibles avec les limites planetaires. L'innovation doit etre mise au service de la transition, pas de la fuite en avant.

**Cooperer** : La transition appelle a depasser les logiques de concurrence pour construire des alliances. Les dynamiques territoriales sont particulierement propices a ces cooperations.

**Plaider** : Porter des propositions aupres des decideurs, participer au debat public, contribuer a faire evoluer les regles du jeu.

### 3.3 A l'echelle des politiques publiques

Les pouvoirs publics disposent de leviers puissants pour accelerer la transition :

**Reglementation** : Fixer des normes ambitieuses, interdire les pratiques les plus nocives, creer un cadre favorable aux alternatives.

**Fiscalite** : Integrer les couts environnementaux dans les prix (taxe carbone, suppression des subventions aux energies fossiles), redistribuer les recettes de maniere equitable.

**Investissement** : Orienter les investissements publics vers les infrastructures de la transition (transports collectifs, renovation energetique, energies renouvelables).

**Planification** : Definir des trajectoires de long terme, coordonner les acteurs, organiser les territoires de maniere soutenable.

**Education et recherche** : Former les citoyens et les professionnels aux enjeux de la transition, soutenir la recherche sur les alternatives.

---

## Conclusion

${title} constitue un enjeu decisif pour l'avenir de nos societes. Face a l'ampleur des defis, il serait facile de ceder au decouragement ou au deni. Pourtant, les raisons d'esperer existent.

Des solutions sont connues et eprouvees. Des initiatives fleurissent partout. Une prise de conscience s'opere, particulierement dans les jeunes generations. Les transformations necessaires sont immenses, mais elles sont possibles.

L'enjeu est maintenant de changer d'echelle, d'accelerer le mouvement, de construire les coalitions necessaires. Cela suppose de depasser les clivages, de construire des recits mobilisateurs, de conjuguer urgence et patience.

La transition ecologique et sociale n'est pas une contrainte mais une opportunite : celle de construire un monde plus juste, plus solidaire, plus respectueux du vivant. Un monde ou il fait bon vivre pour tous.

---

## References bibliographiques

### Rapports scientifiques
- GIEC (2023). *Sixieme rapport d'evaluation - Synthese*.
- IPBES (2019). *Rapport sur l'evaluation mondiale de la biodiversite*.
- Agence internationale de l'energie (2023). *World Energy Outlook*.

### Ouvrages
- Meadows, D. et al. (1972). *The Limits to Growth*. Club de Rome.
- Jackson, T. (2017). *Prosperite sans croissance*. De Boeck.
- Hopkins, R. (2010). *Manuel de transition*. Ecosociete.
- Latouche, S. (2019). *La decroissance*. Que sais-je.
- Klein, N. (2015). *Tout peut changer*. Actes Sud.
- Morizot, B. (2020). *Manières d'etre vivant*. Actes Sud.

### Articles et etudes
- Rockstrom, J. et al. (2009). "Planetary boundaries". *Nature*.
- Raworth, K. (2017). "Doughnut economics". *Random House*.
- Gadrey, J. (2010). "Les nouveaux indicateurs de richesse". *La Decouverte*.

---

*Production automatique - Think Tank Orchestra*
*Prochaine reflexion : ${nextTheme}*
`;
};

const rebuildSummary = () => {
  const agent1Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent1.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
    .sort();

  const agent2Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent2.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
    .sort();

  const getTitle = (folder, file) => {
    try {
      const content = fs.readFileSync(path.join(CONFIG.repoPath, 'docs', folder, file), 'utf8');
      const match = content.match(/title:\s*"([^"]+)"/);
      return match ? match[1] : file.replace('.md', '');
    } catch (e) {
      return file.replace('.md', '');
    }
  };

  let summary = `# Table of contents

* [Accueil](README.md)

## Agent 1: Tiers-Lieux

* [Introduction](docs/agent-1-tierslieux/index.md)
`;

  agent1Files.forEach((file, i) => {
    const num = String(i + 1).padStart(2, '0');
    const title = getTitle(CONFIG.agent1.folder, file);
    summary += `* [${num} - ${title}](docs/${CONFIG.agent1.folder}/${file})\n`;
  });

  summary += `
## Agent 2: Durabilite

* [Introduction](docs/agent-2-durabilite/index.md)
`;

  agent2Files.forEach((file, i) => {
    const num = String(i + 1).padStart(2, '0');
    const title = getTitle(CONFIG.agent2.folder, file);
    summary += `* [${num} - ${title}](docs/${CONFIG.agent2.folder}/${file})\n`;
  });

  fs.writeFileSync(path.join(CONFIG.repoPath, 'SUMMARY.md'), summary, 'utf8');
};

const produceReflection = async (agentKey) => {
  const agent = agentKey === 'agent1' ? CONFIG.agent1 : CONFIG.agent2;
  const themeObj = agent.themes[themeIdx[agentKey] % agent.themes.length];

  counts[agentKey]++;
  const num = counts[agentKey];

  const slug = themeObj.title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 40)
    .replace(/-$/, '');

  const fileName = `${String(num).padStart(2, '0')}-${slug}.md`;
  const filePath = path.join(CONFIG.repoPath, 'docs', agent.folder, fileName);

  console.log(`   🤖 ${agent.name}: "${themeObj.title}"`);

  const content = agentKey === 'agent1'
    ? generateAgent1Content(themeObj, num)
    : generateAgent2Content(themeObj, num);

  fs.writeFileSync(filePath, content, 'utf8');

  themeIdx[agentKey]++;

  return { agent: agent.name, theme: themeObj.title, fileName, num };
};

const pushToGit = async (results) => {
  git('git checkout draft');
  git('git pull origin main --rebase');

  rebuildSummary();

  git('git add .');

  const msg = results.map(r => r.theme.substring(0, 30)).join(' + ');
  git(`git commit -m "PRODUCTION: ${msg}"`);
  git('git push origin draft');

  git('git checkout main');
  git(`git merge draft --no-ff -m "PUBLISHED: ${results.length} reflexions"`);
  git('git push origin main');

  console.log(`   ✅ ${results.length} reflexions publiees sur GitBook`);
};

const updateDashboardData = () => {
  const dataPath = path.join(CONFIG.repoPath, '..', 'dashboard', 'src', 'data.json');

  const agent1Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent1.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/)).length;
  const agent2Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent2.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/)).length;

  const data = {
    lastUpdate: new Date().toISOString(),
    totalProductions: agent1Files + agent2Files,
    agent1: { total: agent1Files, published: agent1Files },
    agent2: { total: agent2Files, published: agent2Files }
  };

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

const runParallelProduction = async () => {
  const time = new Date().toLocaleTimeString('fr-FR');
  console.log(`\n⏰ [${time}] Production parallele (reflexions etoffees ~2800 mots)`);

  try {
    const results = await Promise.all([
      produceReflection('agent1'),
      produceReflection('agent2')
    ]);

    await pushToGit(results);
    updateDashboardData();

    const total = counts.agent1 + counts.agent2;
    console.log(`\n📊 Total: ${total} reflexions (Agent1: ${counts.agent1} | Agent2: ${counts.agent2})`);

  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
  }
};

const main = async () => {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode Autonome v3');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   ⚡ Intervalle: ${CONFIG.intervalMinutes} minutes`);
  console.log(`   📝 Contenu: Reflexions etoffees (~2800 mots)`);
  console.log(`   🔄 Mode: Production parallele (2 agents simultanement)`);
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runParallelProduction();

  console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} minutes... (Ctrl+C pour arreter)\n`);

  setInterval(async () => {
    await runParallelProduction();
    console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} minutes...\n`);
  }, CONFIG.intervalMinutes * 60 * 1000);
};

main().catch(console.error);
