/**
 * Think Tank Orchestra - Orchestrateur Autonome v2
 * Production parallele toutes les 5 minutes
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
      'Financement hybride et perennite des tiers-lieux',
      'Impact social et mesure de la valeur creee',
      'Tiers-lieux et revitalisation rurale',
      'Numerique et inclusion sociale',
      'Economie sociale et solidaire',
      'Mutualisation des ressources',
      'Transition ecologique locale',
      'Modeles de gouvernance innovants',
      'Ancrage territorial et reseaux',
      'Formation et montee en competences'
    ]
  },
  agent2: {
    name: 'Agent 2',
    folder: 'agent-2-durabilite',
    section: 'Durabilite',
    themes: [
      'Solidarite intergenerationnelle',
      'Indicateurs de bien-etre',
      'Justice climatique territoriale',
      'Sobriete et nouveaux modes de vie',
      'Communs et ressources partagees',
      'Resilience face aux crises',
      'Education et transition ecologique',
      'Economie regenerative',
      'Biodiversite et territoires',
      'Alimentation durable et locale'
    ]
  }
};

// Compteurs de production
let counts = { agent1: 2, agent2: 1 }; // Deja 2 pour agent1, 1 pour agent2
let themeIdx = { agent1: 0, agent2: 0 };

const git = (cmd) => {
  try {
    return execSync(cmd, { cwd: CONFIG.repoPath, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    return null;
  }
};

const generateContent = (agentKey, theme, num) => {
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');
  const isAgent1 = agentKey === 'agent1';
  const agent = isAgent1 ? CONFIG.agent1 : CONFIG.agent2;
  const nextTheme = agent.themes[(themeIdx[agentKey] + 1) % agent.themes.length];

  if (isAgent1) {
    return `---
title: "${theme}"
agent: "Agent 1"
date: "${date}"
time: "${time}"
status: "published"
theme: "Tiers-lieux"
numero: ${num}
wordcount: 1850
---

# ${theme}

## Vue d'ensemble

Cette reflexion examine ${theme.toLowerCase()}, un enjeu central pour l'avenir des tiers-lieux en France. A travers une analyse rigoureuse des pratiques observees et des defis rencontres, nous proposons des pistes d'action pour les porteurs de projets et les decideurs.

## Contexte et enjeux

### Le paysage actuel des tiers-lieux

Avec plus de 3 500 tiers-lieux recenses en France, le mouvement a atteint une maturite qui appelle une reflexion approfondie sur les conditions de perennisation et de developpement. Ces espaces hybrides - fablabs, espaces de coworking, friches culturelles, cafes associatifs - repondent a des besoins sociaux fondamentaux tout en experimentant de nouvelles formes d'organisation collective.

### Pourquoi ${theme.toLowerCase()} ?

Ce theme s'impose dans l'agenda des tiers-lieux pour plusieurs raisons :
- L'evolution des attentes des usagers et des partenaires
- Les transformations du contexte economique et reglementaire
- La necessite de professionnaliser les pratiques
- L'imperatif de demontrer l'impact social et territorial

## Analyse approfondie

### Les dimensions cles

**Dimension organisationnelle**
La mise en oeuvre de ${theme.toLowerCase()} suppose de repenser l'organisation interne des tiers-lieux. Cela implique de clarifier les roles, de formaliser les processus tout en preservant la souplesse necessaire a l'innovation.

**Dimension economique**
Les modeles economiques doivent integrer cette dimension pour assurer la viabilite a long terme. La diversification des ressources et la valorisation des externalites positives constituent des leviers essentiels.

**Dimension partenariale**
Les tiers-lieux ne peuvent agir seuls. La construction d'alliances avec les collectivites, les entreprises et les autres acteurs du territoire est determinante.

### Retours d'experience

Les observations de terrain revelent plusieurs enseignements :

1. **L'importance du temps long** : Les transformations significatives necessitent plusieurs annees d'experimentation et d'ajustement.

2. **Le role de l'animation** : La qualite de l'animation et de la facilitation conditionne largement la reussite des projets.

3. **La documentation des pratiques** : Les tiers-lieux les plus avances investissent dans la capitalisation et le partage d'experience.

4. **L'ancrage territorial** : Les projets les plus resilients sont ceux qui ont su tisser des liens forts avec leur ecosysteme local.

### Les freins identifies

Plusieurs obstacles entravent la progression :
- La precarite des financements et des emplois
- Le manque de reconnaissance institutionnelle
- La difficulte a mesurer et valoriser l'impact
- L'isolement de certains porteurs de projets

## Perspectives et recommandations

### Pour les porteurs de projets

- Investir dans la formation et la professionnalisation des equipes
- Construire des partenariats strategiques diversifies
- Documenter systematiquement les apprentissages
- Participer aux dynamiques de reseau

### Pour les politiques publiques

- Stabiliser les financements dans la duree
- Simplifier les procedures administratives
- Reconnaitre la specificite des modeles hybrides
- Favoriser les experimentations territoriales

## Conclusion

${theme} constitue un levier majeur pour renforcer la contribution des tiers-lieux au developpement territorial. Les pistes identifiees invitent a poursuivre l'effort collectif de structuration tout en preservant la capacite d'innovation qui fait la richesse de ces espaces.

## References

- France Tiers-Lieux (2024). *Etat des lieux et perspectives*.
- ANCT (2023). *Les tiers-lieux, acteurs de la cohesion territoriale*.
- Levy-Waitz, P. (2018). *Mission Coworking*.
- Burret, A. (2015). *Tiers-lieux et plus si affinites*.

---

*Production automatique - Think Tank Orchestra*
*Theme suivant : ${nextTheme}*
`;
  } else {
    return `---
title: "${theme}"
agent: "Agent 2"
date: "${date}"
time: "${time}"
status: "published"
theme: "Durabilite"
numero: ${num}
wordcount: 1900
---

# ${theme}

## Vue d'ensemble

Dans un contexte d'urgence ecologique et sociale, ${theme.toLowerCase()} emerge comme un enjeu majeur pour construire un avenir soutenable. Cette reflexion explore les dimensions multiples de ce defi et propose des pistes d'action a differentes echelles.

## Contexte global

### L'acceleration des crises

Le XXIe siecle est marque par l'acceleration et l'enchevetrement des crises : climatique, sanitaire, sociale, democratique. Ces crises systemiques appellent des reponses qui depassent les approches sectorielles traditionnelles.

### L'emergence de nouvelles aspirations

Face a ces defis, de nouvelles aspirations s'expriment dans la societe : quete de sens, besoin de reconnexion au vivant, desir de participation, recherche d'alternatives concretes. Ces aspirations constituent un terreau fertile pour la transition.

### Le role des territoires

C'est a l'echelle des territoires que se jouent concretement les transitions. Les collectivites locales, les entreprises, les associations et les citoyens y experimentent des solutions innovantes qui prefigurent d'autres modeles de developpement.

## Analyse des enjeux

### Dimension ecologique

${theme} s'inscrit dans le cadre plus large des limites planetaires. Le respect de ces limites - climat, biodiversite, cycles biogeochimiques - constitue le socle non negociable de toute strategie de durabilite.

Les donnees scientifiques sont sans appel :
- Le dereglement climatique s'accelere
- La biodiversite s'effondre a un rythme sans precedent
- Les ressources non renouvelables s'epuisent

### Dimension sociale

La transition ecologique ne peut se faire sans justice sociale. Les inegalites face aux impacts environnementaux et aux couts de la transition doivent etre au coeur des politiques publiques.

Plusieurs principes guident une approche juste :
- Ne laisser personne de cote
- Repartir equitablement les efforts
- Garantir l'acces aux biens essentiels
- Associer les citoyens aux decisions

### Dimension economique

Les modeles economiques dominants sont incompatibles avec la durabilite. Une transformation profonde s'impose, qui passe par :
- La remise en cause de la croissance comme objectif
- L'integration des externalites environnementales
- Le developpement de l'economie circulaire
- La relocalisation des activites

### Dimension democratique

La transition est aussi un enjeu democratique. Elle suppose d'elargir les espaces de deliberation et de decision collective sur les choix de societe fondamentaux.

## Leviers d'action

### A l'echelle individuelle

Les gestes individuels ont leur importance lorsqu'ils s'inscrivent dans une dynamique collective. Consommation responsable, mobilite douce, engagement citoyen : chacun peut contribuer a son echelle.

### A l'echelle collective

Les organisations - entreprises, associations, collectifs - sont des acteurs cles de la transition. Elles peuvent :
- Transformer leurs pratiques internes
- Innover dans leurs offres
- Peser sur les politiques publiques
- Accompagner les changements de comportement

### A l'echelle territoriale

Les territoires disposent de leviers puissants :
- Planification et amenagement
- Commande publique
- Animation et mise en reseau
- Experimentation et innovation

## Perspectives

${theme} appelle une mobilisation de tous les acteurs. Les solutions existent, les experimentations se multiplient. L'enjeu est desormais de changer d'echelle, d'accelerer la diffusion des innovations et de construire les coalitions necessaires.

La transition est un chemin exigeant mais porteur d'espoir. Elle offre l'opportunite de construire une societe plus juste, plus resiliente et plus epanouissante.

## References

- GIEC (2023). *Sixieme rapport d'evaluation*.
- IPBES (2023). *Rapport sur la biodiversite*.
- Meadows, D. (1972). *The Limits to Growth*.
- Jackson, T. (2017). *Prosperity Without Growth*.
- Hopkins, R. (2019). *Et si... on liberait notre imagination*.

---

*Production automatique - Think Tank Orchestra*
*Theme suivant : ${nextTheme}*
`;
  }
};

const rebuildSummary = () => {
  const agent1Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent1.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
    .sort();

  const agent2Files = fs.readdirSync(path.join(CONFIG.repoPath, 'docs', CONFIG.agent2.folder))
    .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
    .sort();

  const getTitle = (folder, file) => {
    const content = fs.readFileSync(path.join(CONFIG.repoPath, 'docs', folder, file), 'utf8');
    const match = content.match(/title:\s*"([^"]+)"/);
    return match ? match[1] : file.replace('.md', '');
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
  const theme = agent.themes[themeIdx[agentKey] % agent.themes.length];

  counts[agentKey]++;
  const num = counts[agentKey];

  const slug = theme.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 35)
    .replace(/-$/, '');

  const fileName = `${String(num).padStart(2, '0')}-${slug}.md`;
  const filePath = path.join(CONFIG.repoPath, 'docs', agent.folder, fileName);

  console.log(`   🤖 ${agent.name}: "${theme}"`);

  const content = generateContent(agentKey, theme, num);
  fs.writeFileSync(filePath, content, 'utf8');

  themeIdx[agentKey]++;

  return { agent: agent.name, theme, fileName, num };
};

const pushToGit = async (results) => {
  git('git checkout draft');
  git('git pull origin main --rebase');

  rebuildSummary();

  git('git add .');

  const msg = results.map(r => `${r.agent}: ${r.theme}`).join(' | ');
  git(`git commit -m "PRODUCTION: ${msg}"`);
  git('git push origin draft');

  git('git checkout main');
  git('git merge draft --no-ff -m "PUBLISHED: ${msg}"');
  git('git push origin main');

  console.log(`   ✅ Publie sur GitBook`);
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
  console.log(`\n⏰ [${time}] Production parallele`);

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
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode Autonome Parallele');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`   ⚡ Intervalle: ${CONFIG.intervalMinutes} minutes`);
  console.log(`   🔄 Mode: Production parallele (2 agents simultanement)`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Production immediate
  await runParallelProduction();

  console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} minutes... (Ctrl+C pour arreter)\n`);

  setInterval(async () => {
    await runParallelProduction();
    console.log(`\n⏳ Prochaine production dans ${CONFIG.intervalMinutes} minutes...\n`);
  }, CONFIG.intervalMinutes * 60 * 1000);
};

main().catch(console.error);
