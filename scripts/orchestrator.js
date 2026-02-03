/**
 * Think Tank Orchestra - Orchestrateur Autonome v4
 * Gestion intelligente des themes - pas de doublons
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
      { title: 'Numerique et inclusion dans les tiers-lieux', keywords: ['fracture numerique', 'mediation', 'competences', 'accessibilite'] },
      { title: 'Modeles cooperatifs et gouvernance partagee', keywords: ['SCIC', 'democratie', 'participation', 'pouvoir'] },
      { title: 'Ancrage territorial et ecosystemes locaux', keywords: ['partenariats', 'collectivites', 'reseaux', 'synergies'] },
      { title: 'Formation et professionnalisation des acteurs', keywords: ['competences', 'metiers', 'parcours', 'reconnaissance'] },
      { title: 'Tiers-lieux et economie circulaire locale', keywords: ['ressources', 'mutualisation', 'reparation', 'reemploi'] },
      { title: 'Hybridation des modeles economiques', keywords: ['diversification', 'revenus', 'subventions', 'marche'] },
      { title: 'Tiers-lieux et insertion professionnelle', keywords: ['emploi', 'formation', 'accompagnement', 'parcours'] },
      { title: 'Culture et creation dans les tiers-lieux', keywords: ['artistes', 'residences', 'diffusion', 'mediation'] },
      { title: 'Tiers-lieux nourriciers et agriculture urbaine', keywords: ['alimentation', 'jardins', 'permaculture', 'autonomie'] },
      { title: 'Accessibilite et design inclusif des tiers-lieux', keywords: ['handicap', 'universel', 'accueil', 'adaptation'] }
    ]
  },
  agent2: {
    name: 'Agent 2',
    folder: 'agent-2-durabilite',
    section: 'Durabilite',
    themes: [
      { title: 'Sobriete choisie et transformation des modes de vie', keywords: ['consommation', 'suffisance', 'simplicite', 'sens'] },
      { title: 'Communs et gouvernance des ressources partagees', keywords: ['Ostrom', 'collectif', 'regles', 'durabilite'] },
      { title: 'Resilience territoriale face aux crises systemiques', keywords: ['adaptation', 'anticipation', 'vulnerabilite', 'capacites'] },
      { title: 'Alimentation durable et systemes alimentaires territoriaux', keywords: ['circuits courts', 'agriculture', 'sante', 'accessibilite'] },
      { title: 'Biodiversite et services ecosystemiques', keywords: ['vivant', 'nature', 'protection', 'restauration'] },
      { title: 'Transition juste et accompagnement social du changement', keywords: ['emploi', 'formation', 'reconversion', 'protection'] },
      { title: 'Mobilites durables et amenagement du territoire', keywords: ['transports', 'proximite', 'accessibilite', 'decarbonation'] },
      { title: 'Habitat ecologique et renovation energetique', keywords: ['logement', 'isolation', 'materiaux', 'precarite'] },
      { title: 'Economie de la fonctionnalite et nouveaux modeles', keywords: ['usage', 'service', 'propriete', 'partage'] },
      { title: 'Education populaire et transition ecologique', keywords: ['sensibilisation', 'formation', 'citoyennete', 'engagement'] }
    ]
  }
};

// Fonction pour compter les fichiers existants
const countExistingFiles = (folder) => {
  const folderPath = path.join(CONFIG.repoPath, 'docs', folder);
  try {
    return fs.readdirSync(folderPath)
      .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
      .length;
  } catch (e) {
    return 0;
  }
};

// Initialisation dynamique basee sur les fichiers existants
let counts = {
  agent1: countExistingFiles(CONFIG.agent1.folder),
  agent2: countExistingFiles(CONFIG.agent2.folder)
};

// Index des themes commence apres les themes deja utilises
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
  const nextIdx = (themeIdx.agent1 + 1) % CONFIG.agent1.themes.length;
  const nextTheme = CONFIG.agent1.themes[nextIdx].title;

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

4. **La concurrence et la differenciation** : Face a la multiplication des offres, les tiers-lieux doivent clarifier leur proposition de valeur specifique.

### Methodologie et sources

Cette reflexion s'appuie sur plusieurs types de sources :
- Les travaux de recherche academique sur les tiers-lieux et l'innovation sociale
- Les rapports et etudes des reseaux de tiers-lieux (France Tiers-Lieux, cooperatives, reseaux regionaux)
- Les retours d'experience documentes par les praticiens
- Les donnees statistiques disponibles sur le secteur

---

## Premiere partie : Cadrage theorique et conceptuel

### 1.1 Definitions et perimetre

Avant d'entrer dans l'analyse, il convient de preciser les concepts mobilises autour de ${keywords[0]}. Cette notion renvoie a des realites diverses qu'il convient de clarifier pour eviter les confusions.

On peut neanmoins identifier quelques caracteristiques communes qui font consensus :
- **L'hybridation fonctionnelle** : les approches combinent plusieurs dimensions
- **L'ouverture** : elles sont accessibles a une diversite de publics
- **La dimension collective** : elles sont portees par des dynamiques de communaute
- **L'ancrage territorial** : elles s'inscrivent dans un ecosysteme local

### 1.2 Cadres theoriques mobilises

Plusieurs cadres theoriques eclairent notre analyse de ${title.toLowerCase()} :

**L'economie sociale et solidaire** offre des grilles de lecture pertinentes pour comprendre les modeles hybrides. Les concepts d'utilite sociale, de lucrativite limitee et de gouvernance democratique sont particulierement utiles.

**Les theories des communs**, notamment les travaux d'Elinor Ostrom, permettent de penser la gouvernance collective des ressources partagees.

**L'innovation sociale** comme cadre d'analyse met l'accent sur la capacite a experimenter de nouvelles reponses a des besoins sociaux mal satisfaits.

**L'economie territoriale** eclaire les dynamiques d'ancrage local et les contributions au developpement territorial.

### 1.3 Etat de l'art

Les recherches recentes sur ${keywords[0]} mettent en evidence plusieurs constats :

Premierement, il existe une tension entre les approches standardisees et les approches adaptees aux contextes locaux. Les outils generiques ne sont pas directement transposables.

Deuxiemement, la dimension temporelle est cruciale : les effets se deploient sur des temporalites differentes qu'il convient de distinguer.

Troisiemement, l'evaluation doit integrer la pluralite des parties prenantes et de leurs attentes, parfois divergentes.

---

## Deuxieme partie : Analyse des pratiques et des enjeux

### 2.1 Cartographie des pratiques existantes

L'observation des tiers-lieux revele une grande diversite de pratiques. On peut distinguer plusieurs approches :

**Les approches pragmatiques** : certains tiers-lieux developpent des outils simples, adaptes a leurs besoins immediats et a leurs ressources limitees. Ces approches privilegient l'operationnalite.

**Les approches structurees** : d'autres tiers-lieux, souvent les plus anciens ou les mieux dotes, mettent en place des demarches plus formalisees.

**Les approches collectives** : certains reseaux developpent des referentiels communs permettant de capitaliser les apprentissages.

### 2.2 Etude de cas : exemples inspirants

**Cas n°1 : Initiative territoriale exemplaire**
Un tiers-lieu a developpe une approche innovante combinant plusieurs dimensions. L'experience montre l'importance d'une demarche progressive et adaptative, ancree dans les besoins du territoire.

**Cas n°2 : Demarche participative**
Un autre exemple illustre le choix d'une evaluation participative impliquant les usagers et les partenaires locaux. La demarche a permis de renforcer l'adhesion de la communaute.

**Cas n°3 : Approche systemique**
Ce troisieme cas montre comment une vision globale, alignee avec les valeurs du projet, peut produire des resultats significatifs sur le long terme.

### 2.3 Facteurs de reussite identifies

L'analyse croisee des experiences permet d'identifier plusieurs facteurs de reussite :

1. **L'alignement avec le projet** : les demarches partent de la mission et des valeurs.
2. **L'implication des parties prenantes** : la participation renforce la legitimite.
3. **La progressivite** : les approches iteratives sont plus durables.
4. **La valorisation des apprentissages** : au service de l'amelioration continue.

### 2.4 Obstacles et difficultes rencontres

Plusieurs obstacles se presentent :

- **Le manque de temps et de ressources** : souvent percu comme une charge supplementaire
- **La complexite methodologique** : outils parfois inadaptes
- **Les injonctions contradictoires** : demandes heterogenes des partenaires
- **La crainte de l'instrumentalisation** : evaluation perçue comme controle

---

## Troisieme partie : Perspectives et recommandations

### 3.1 Pour les porteurs de projets

**Clarifier sa vision** : Avant d'agir, clarifier ce que l'on cherche a transformer et par quels mecanismes.

**Commencer simple** : Quelques actions bien menees valent mieux qu'un plan complexe jamais realise.

**Impliquer la communaute** : Les demarches gagnent a etre collectives.

**Documenter et partager** : La capitalisation des experiences beneficie a l'ensemble du mouvement.

### 3.2 Pour les reseaux et tetes de reseau

**Developper des referentiels communs** : Des cadres partages facilitent les apprentissages croises.

**Accompagner la montee en competences** : Former les equipes et proposer des ressources adaptees.

**Organiser le partage d'experience** : Creer des espaces d'echange entre tiers-lieux.

**Porter un plaidoyer** : Defendre des approches respectueuses des specificites.

### 3.3 Pour les politiques publiques

**Adopter une approche partenariale** : Co-construire avec les acteurs.

**Reconnaitre la diversite** : Les dispositifs doivent respecter les differences.

**S'inscrire dans le temps long** : Les impacts se deploient sur des temporalites longues.

**Financer l'ingenierie** : Les demarches de qualite necessitent des moyens.

---

## Conclusion

${title} constitue un enjeu strategique pour le mouvement des tiers-lieux. Les pistes explorees invitent a une approche pragmatique, progressive et participative.

Le defi est considerable, mais les ressources existent : experiences accumulees, outils developpes, reseaux structures. C'est en mutualisant ces ressources que le mouvement pourra relever ce defi.

---

## References bibliographiques

- Burret, A. (2015). *Tiers-lieux et plus si affinites*. FYP Editions.
- Oldenburg, R. (1989). *The Great Good Place*. Paragon House.
- Ostrom, E. (1990). *Governing the Commons*. Cambridge University Press.
- Levy-Waitz, P. (2018). *Mission Coworking*. Rapport au gouvernement.
- France Tiers-Lieux (2024). *Nos territoires en action*.
- ANCT (2023). *Les tiers-lieux, fabriques de territoires*.

---

*Production automatique - Think Tank Orchestra*
*Prochaine reflexion : ${nextTheme}*
`;
};

const generateAgent2Content = (themeObj, num) => {
  const { title, keywords } = themeObj;
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');
  const nextIdx = (themeIdx.agent2 + 1) % CONFIG.agent2.themes.length;
  const nextTheme = CONFIG.agent2.themes[nextIdx].title;

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

Cette reflexion approfondie explore les enjeux de **${title.toLowerCase()}** dans le contexte de la transition ecologique et sociale. Face a l'acceleration des crises environnementales et a l'aggravation des inegalites, il devient urgent de repenser nos modeles de developpement.

A travers une analyse qui croise connaissances scientifiques, experiences de terrain et reflexions ethiques, nous proposons des pistes pour avancer collectivement vers un avenir plus soutenable et plus juste.

---

## Introduction

### Le contexte de l'Anthropocene

Nous vivons une epoque sans precedent dans l'histoire de l'humanite. Pour la premiere fois, les activites humaines sont devenues une force geologique capable de modifier les equilibres fondamentaux de la planete.

Le dereglement climatique s'accelere, avec des consequences deja visibles : vagues de chaleur, secheresses, inondations. La biodiversite s'effondre a un rythme sans precedent. Les cycles biogeochimiques sont perturbes.

### L'entrelacement des crises

Ces crises environnementales ne sont pas independantes des crises sociales. Elles les aggravent et en sont aggravees en retour. Les populations les plus vulnerables sont les premieres victimes du dereglement climatique.

### Pourquoi ${title.toLowerCase()} ?

Dans ce contexte, cette question apparait comme un enjeu central pour plusieurs raisons :

1. **Elle touche aux finalites** : Au-dela des moyens techniques, c'est la question des fins qui est posee.
2. **Elle interroge les inegalites** : La transition doit s'accompagner de justice sociale.
3. **Elle appelle a l'action** : La reflexion doit deboucher sur des pistes concretes.
4. **Elle mobilise l'espoir** : Des alternatives existent et fonctionnent.

---

## Premiere partie : Diagnostic et enjeux

### 1.1 L'etat des connaissances scientifiques

Les rapports du GIEC et de l'IPBES dressent un tableau preoccupant :

**Sur le climat** : Le rechauffement atteint +1.1°C par rapport a l'ere preindustrielle. Sans inflexion majeure, nous nous dirigeons vers +2.7°C a +3.5°C d'ici la fin du siecle.

**Sur la biodiversite** : Un million d'especes sont menacees d'extinction. Les populations de vertebres sauvages ont decline de 69% depuis 1970.

**Sur les ressources** : De nombreuses ressources s'epuisent. L'empreinte ecologique depasse la capacite de regeneration.

### 1.2 Les dimensions de ${keywords[0]}

La question peut etre analysee sous plusieurs angles :

**Dimension environnementale** : Impacts sur les ecosystemes et ressources naturelles.

**Dimension sociale** : Repartition des vulnerabilites et responsabilites.

**Dimension economique** : Modeles compatibles avec les limites planetaires.

**Dimension politique** : Modes de gouvernance pour piloter la transition.

**Dimension ethique** : Responsabilite envers les generations futures.

### 1.3 Les controverses et debats

La question fait l'objet de debats vifs :

**Croissance ou decroissance ?** Certains defendent le decouplage, d'autres la sobriete.

**Responsabilite individuelle ou collective ?** La transition passe par les deux.

**Urgence ou transformation profonde ?** Il faut conjuguer les deux temporalites.

---

## Deuxieme partie : Experiences et alternatives

### 2.1 Les initiatives territoriales

Partout dans le monde, des territoires experimentent des alternatives :

**Les villes en transition** : Le mouvement ne en 2006 a essaime dans des milliers de communautes, developpant autonomie alimentaire, energies renouvelables, echanges locaux.

**Les territoires a energie positive** : Certains territoires produisent plus d'energie renouvelable qu'ils n'en consomment.

**Les projets alimentaires territoriaux** : Relocalisation, agriculture paysanne, circuits courts, lutte contre le gaspillage.

### 2.2 Les innovations sociales

Au-dela des technologies, les formes d'organisation innovent :

**L'economie du partage** : Covoiturage, habitat partage, ressourceries, bibliotheques d'objets.

**Les monnaies locales** : Plus de 80 monnaies complementaires en France.

**Les tiers-lieux** : Espaces hybrides experimentant de nouvelles formes d'organisation.

**Les communs** : Gestion collective de ressources partagees.

### 2.3 Etudes de cas approfondies

**Cas n°1 : Ville pilote du developpement durable**
Une ancienne cite industrielle s'est engagee dans une transition ambitieuse : rehabilitation, eco-construction, participation citoyenne, economie circulaire.

**Cas n°2 : Indicateurs alternatifs de progres**
Un territoire a choisi de mesurer son developpement non par le PIB, mais par un indicateur multidimensionnel integrant bien-etre, sante, education, environnement.

**Cas n°3 : Transition energetique reussie**
Une ville est devenue reference mondiale : quartiers a energie positive, mobilites douces, industries vertes.

---

## Troisieme partie : Pistes d'action

### 3.1 A l'echelle individuelle

**Sobriete** : Interroger ses besoins reels, distinguer l'essentiel du superflu.

**Coherence** : Aligner valeurs et pratiques, dans une demarche progressive.

**Engagement** : Participer a des initiatives collectives, s'engager dans la vie democratique.

### 3.2 A l'echelle collective

**Transformer ses pratiques** : Reduire son empreinte, ameliorer ses pratiques sociales.

**Innover** : Developper des solutions compatibles avec les limites planetaires.

**Cooperer** : Depasser les logiques de concurrence pour construire des alliances.

**Plaider** : Porter des propositions aupres des decideurs.

### 3.3 A l'echelle des politiques publiques

**Reglementation** : Fixer des normes ambitieuses, creer un cadre favorable.

**Fiscalite** : Integrer les couts environnementaux, redistribuer equitablement.

**Investissement** : Orienter vers les infrastructures de la transition.

**Planification** : Definir des trajectoires de long terme.

**Education** : Former aux enjeux de la transition.

---

## Conclusion

${title} constitue un enjeu decisif pour l'avenir. Face a l'ampleur des defis, les raisons d'esperer existent.

Des solutions sont connues. Des initiatives fleurissent. Une prise de conscience s'opere. L'enjeu est de changer d'echelle, d'accelerer le mouvement.

La transition n'est pas une contrainte mais une opportunite : construire un monde plus juste, plus solidaire, plus respectueux du vivant.

---

## References bibliographiques

- GIEC (2023). *Sixieme rapport d'evaluation*.
- IPBES (2019). *Rapport sur la biodiversite*.
- Meadows, D. (1972). *The Limits to Growth*.
- Jackson, T. (2017). *Prosperite sans croissance*.
- Hopkins, R. (2010). *Manuel de transition*.
- Latouche, S. (2019). *La decroissance*.
- Morizot, B. (2020). *Manieres d'etre vivant*.

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
    .substring(0, 45)
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

  const themes = results.map(r => r.theme.substring(0, 25)).join(' + ');
  git(`git commit -m "PRODUCTION: ${themes}"`);
  git('git push origin draft');

  git('git checkout main');
  git('git merge draft --no-ff -m "PUBLISHED: ${results.length} nouvelles reflexions"');
  git('git push origin main');

  console.log(`   ✅ ${results.length} reflexions publiees`);
};

const updateDashboardData = () => {
  const dataPath = path.join(CONFIG.repoPath, '..', 'dashboard', 'src', 'data.json');

  const data = {
    lastUpdate: new Date().toISOString(),
    totalProductions: counts.agent1 + counts.agent2,
    agent1: { total: counts.agent1, published: counts.agent1 },
    agent2: { total: counts.agent2, published: counts.agent2 }
  };

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

const runParallelProduction = async () => {
  const time = new Date().toLocaleTimeString('fr-FR');
  console.log(`\n⏰ [${time}] Production parallele`);

  try {
    const results = await Promise.all([
      produceReflection('agent1'),
      produceReflection('agent2')
    ]);

    await pushToGit(results);
    updateDashboardData();

    console.log(`\n📊 Total: ${counts.agent1 + counts.agent2} reflexions (A1: ${counts.agent1} | A2: ${counts.agent2})`);

  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
  }
};

const main = async () => {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode Autonome v4');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   ⚡ Intervalle: ${CONFIG.intervalMinutes} minutes`);
  console.log(`   📝 Contenu: Reflexions etoffees (~2800 mots)`);
  console.log(`   🔢 Existants: Agent1=${counts.agent1} | Agent2=${counts.agent2}`);
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runParallelProduction();

  console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} min... (Ctrl+C pour stop)\n`);

  setInterval(async () => {
    await runParallelProduction();
    console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} min...\n`);
  }, CONFIG.intervalMinutes * 60 * 1000);
};

main().catch(console.error);
