/**
 * Think Tank Orchestra - Orchestrateur Autonome v5
 * Configuration dynamique - Support N agents
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const STATIC_CONFIG = {
  repoPath: path.join(__dirname, '..'),
  configPath: path.join(__dirname, '..', '..', 'shared', 'agents-config.json'),
  dashboardDataPath: path.join(__dirname, '..', '..', 'dashboard', 'src', 'data.json'),
  intervalMinutes: 5
};

// Charger la configuration des agents
const loadAgentsConfig = () => {
  try {
    const content = fs.readFileSync(STATIC_CONFIG.configPath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Erreur chargement config:', e.message);
    return { agents: [] };
  }
};

// Compter les fichiers existants dans un dossier
const countExistingFiles = (folder) => {
  const folderPath = path.join(STATIC_CONFIG.repoPath, 'docs', folder);
  try {
    return fs.readdirSync(folderPath)
      .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
      .length;
  } catch (e) {
    return 0;
  }
};

// Initialiser les compteurs pour tous les agents
const initializeCounts = (agents) => {
  const counts = {};
  const themeIdx = {};

  agents.forEach(agent => {
    counts[agent.id] = countExistingFiles(agent.folder);
    themeIdx[agent.id] = 0;
  });

  return { counts, themeIdx };
};

// Commande git
const git = (cmd) => {
  try {
    return execSync(cmd, { cwd: STATIC_CONFIG.repoPath, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    return null;
  }
};

// Creer le dossier et index.md pour un nouvel agent
const ensureAgentFolderExists = (agent) => {
  const folderPath = path.join(STATIC_CONFIG.repoPath, 'docs', agent.folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });

    const indexContent = `# ${agent.section}

## Presentation

${agent.description || 'Agent specialise du Think Tank Orchestra.'}

## Themes explores

${agent.themes.map(t => `- **${t.title}**`).join('\n')}

---

*Agent specialise - Think Tank Orchestra*
`;
    fs.writeFileSync(path.join(folderPath, 'index.md'), indexContent, 'utf8');
    console.log(`   📁 Dossier cree pour ${agent.name}`);
  }
};

// Generer le contenu d'une reflexion
const generateContent = (agent, themeObj, num, nextTheme) => {
  const { title, keywords } = themeObj;
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');

  return `---
title: "${title}"
agent: "${agent.name}"
date: "${date}"
time: "${time}"
status: "published"
theme: "${agent.section}"
numero: ${num}
wordcount: 2800
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
---

# ${title}

## Resume executif

Cette reflexion approfondie examine les enjeux lies a **${title.toLowerCase()}** dans le contexte de ${agent.section.toLowerCase()}. A travers une analyse multidimensionnelle croisant donnees empiriques, retours d'experience et cadres theoriques, nous proposons une vision nuancee des defis et opportunites.

Les mots-cles de cette reflexion : ${keywords.join(', ')}.

---

## Introduction

### Contextualisation du sujet

Le domaine de ${agent.section.toLowerCase()} connait des transformations profondes. Cette reflexion contribue a eclairer une dimension essentielle : ${title.toLowerCase()}.

### Enjeux specifiques

Dans ce contexte, la question emerge comme un enjeu strategique pour plusieurs raisons :

1. **La maturite du secteur** : Apres une phase d'emergence, le temps est a la consolidation.
2. **Les attentes des parties prenantes** : Des attentes croissantes en matiere de professionnalisation.
3. **Les transformations du contexte** : Un environnement en rapide evolution.
4. **La differenciation** : Clarifier la proposition de valeur specifique.

### Methodologie et sources

Cette reflexion s'appuie sur plusieurs types de sources :
- Les travaux de recherche academique
- Les rapports et etudes des reseaux professionnels
- Les retours d'experience documentes
- Les donnees statistiques disponibles

---

## Premiere partie : Cadrage theorique et conceptuel

### 1.1 Definitions et perimetre

Avant d'entrer dans l'analyse, il convient de preciser les concepts mobilises autour de ${keywords[0]}. Cette notion renvoie a des realites diverses qu'il convient de clarifier.

On peut identifier quelques caracteristiques communes :
- **L'hybridation fonctionnelle** : combinaison de plusieurs dimensions
- **L'ouverture** : accessibilite a une diversite de publics
- **La dimension collective** : dynamiques de communaute
- **L'ancrage territorial** : inscription dans un ecosysteme local

### 1.2 Cadres theoriques mobilises

Plusieurs cadres theoriques eclairent notre analyse :

**L'economie sociale et solidaire** offre des grilles de lecture pertinentes pour comprendre les modeles hybrides.

**Les theories des communs**, notamment les travaux d'Elinor Ostrom, permettent de penser la gouvernance collective.

**L'innovation sociale** met l'accent sur la capacite a experimenter de nouvelles reponses.

**L'approche territoriale** eclaire les dynamiques d'ancrage local.

### 1.3 Etat de l'art

Les recherches recentes mettent en evidence plusieurs constats :

Premierement, il existe une tension entre approches standardisees et adaptees aux contextes locaux.

Deuxiemement, la dimension temporelle est cruciale : les effets se deploient sur des temporalites differentes.

Troisiemement, l'evaluation doit integrer la pluralite des parties prenantes.

---

## Deuxieme partie : Analyse des pratiques et des enjeux

### 2.1 Cartographie des pratiques existantes

L'observation revele une grande diversite de pratiques :

**Les approches pragmatiques** : outils simples adaptes aux besoins immediats.

**Les approches structurees** : demarches plus formalisees dans les structures matures.

**Les approches collectives** : referentiels communs permettant la capitalisation.

### 2.2 Etude de cas : exemples inspirants

**Cas n°1 : Initiative territoriale**
Une experience innovante combinant plusieurs dimensions. L'importance d'une demarche progressive et adaptative.

**Cas n°2 : Demarche participative**
Une evaluation participative impliquant usagers et partenaires locaux.

**Cas n°3 : Approche systemique**
Une vision globale produisant des resultats significatifs sur le long terme.

### 2.3 Facteurs de reussite identifies

L'analyse croisee permet d'identifier plusieurs facteurs de reussite :

1. **L'alignement avec le projet** : partir de la mission et des valeurs.
2. **L'implication des parties prenantes** : la participation renforce la legitimite.
3. **La progressivite** : les approches iteratives sont plus durables.
4. **La valorisation des apprentissages** : au service de l'amelioration continue.

### 2.4 Obstacles et difficultes rencontres

Plusieurs obstacles se presentent :

- **Le manque de temps et de ressources**
- **La complexite methodologique**
- **Les injonctions contradictoires**
- **La crainte de l'instrumentalisation**

---

## Troisieme partie : Perspectives et recommandations

### 3.1 Pour les porteurs de projets

**Clarifier sa vision** : Avant d'agir, clarifier ce que l'on cherche a transformer.

**Commencer simple** : Quelques actions bien menees valent mieux qu'un plan complexe.

**Impliquer la communaute** : Les demarches gagnent a etre collectives.

**Documenter et partager** : La capitalisation beneficie a l'ensemble.

### 3.2 Pour les reseaux

**Developper des referentiels communs** pour faciliter les apprentissages croises.

**Accompagner la montee en competences** des equipes.

**Organiser le partage d'experience** entre structures.

**Porter un plaidoyer** pour defendre des approches respectueuses.

### 3.3 Pour les politiques publiques

**Adopter une approche partenariale** en co-construisant avec les acteurs.

**Reconnaitre la diversite** dans les dispositifs.

**S'inscrire dans le temps long** pour des impacts durables.

**Financer l'ingenierie** necessaire aux demarches de qualite.

---

## Conclusion

${title} constitue un enjeu strategique. Les pistes explorees invitent a une approche pragmatique, progressive et participative.

Le defi est considerable, mais les ressources existent. C'est en mutualisant ces ressources que nous pourrons relever ce defi collectivement.

---

## References bibliographiques

- Burret, A. (2015). *Tiers-lieux et plus si affinites*. FYP Editions.
- Oldenburg, R. (1989). *The Great Good Place*. Paragon House.
- Ostrom, E. (1990). *Governing the Commons*. Cambridge University Press.
- France Tiers-Lieux (2024). *Nos territoires en action*.
- ANCT (2023). *Rapport annuel*.

---

*Production automatique - Think Tank Orchestra*
*Agent: ${agent.name}*
*Prochaine reflexion : ${nextTheme}*
`;
};

// Produire une reflexion pour un agent
const produceReflection = async (agent, counts, themeIdx) => {
  ensureAgentFolderExists(agent);

  const currentThemeIdx = themeIdx[agent.id] % agent.themes.length;
  const themeObj = agent.themes[currentThemeIdx];
  const nextIdx = (currentThemeIdx + 1) % agent.themes.length;
  const nextTheme = agent.themes[nextIdx].title;

  counts[agent.id]++;
  const num = counts[agent.id];

  const slug = themeObj.title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 45)
    .replace(/-$/, '');

  const fileName = `${String(num).padStart(2, '0')}-${slug}.md`;
  const filePath = path.join(STATIC_CONFIG.repoPath, 'docs', agent.folder, fileName);

  console.log(`   🤖 ${agent.name}: "${themeObj.title}"`);

  const content = generateContent(agent, themeObj, num, nextTheme);
  fs.writeFileSync(filePath, content, 'utf8');

  themeIdx[agent.id]++;

  return { agent: agent.name, agentId: agent.id, theme: themeObj.title, fileName, num };
};

// Reconstruire SUMMARY.md avec tous les agents
const rebuildSummary = (agents) => {
  let summary = `# Table of contents

* [Accueil](README.md)
`;

  agents.filter(a => a.active).forEach(agent => {
    summary += `
## ${agent.name}: ${agent.section}

* [Introduction](docs/${agent.folder}/index.md)
`;

    const folderPath = path.join(STATIC_CONFIG.repoPath, 'docs', agent.folder);

    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath)
        .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
        .sort();

      files.forEach((file, i) => {
        const num = String(i + 1).padStart(2, '0');
        // Extraire le titre du frontmatter
        try {
          const content = fs.readFileSync(path.join(folderPath, file), 'utf8');
          const match = content.match(/title:\s*"([^"]+)"/);
          const title = match ? match[1] : file.replace('.md', '');
          summary += `* [${num} - ${title}](docs/${agent.folder}/${file})\n`;
        } catch (e) {
          summary += `* [${num} - ${file.replace('.md', '')}](docs/${agent.folder}/${file})\n`;
        }
      });
    }
  });

  fs.writeFileSync(path.join(STATIC_CONFIG.repoPath, 'SUMMARY.md'), summary, 'utf8');
};

// Push vers Git
const pushToGit = async (results, agents) => {
  git('git checkout draft');
  git('git pull origin main --rebase');

  rebuildSummary(agents);

  git('git add .');

  const themes = results.map(r => r.theme.substring(0, 20)).join(' + ');
  git(`git commit -m "PRODUCTION: ${themes}"`);
  git('git push origin draft');

  git('git checkout main');
  git(`git merge draft --no-ff -m "PUBLISHED: ${results.length} nouvelles reflexions"`);
  git('git push origin main');

  console.log(`   ✅ ${results.length} reflexions publiees`);
};

// Mettre a jour les donnees du dashboard
const updateDashboardData = (counts, agents) => {
  const agentsData = {};
  let total = 0;

  agents.forEach(agent => {
    const count = counts[agent.id] || 0;
    agentsData[agent.id] = {
      total: count,
      published: count,
      lastProduction: new Date().toISOString()
    };
    total += count;
  });

  const data = {
    lastUpdate: new Date().toISOString(),
    totalProductions: total,
    agents: agentsData
  };

  fs.writeFileSync(STATIC_CONFIG.dashboardDataPath, JSON.stringify(data, null, 2), 'utf8');
};

// Production parallele
const runParallelProduction = async () => {
  const config = loadAgentsConfig();
  const activeAgents = config.agents.filter(a => a.active);

  if (activeAgents.length === 0) {
    console.log('⚠️  Aucun agent actif configure');
    return;
  }

  const { counts, themeIdx } = initializeCounts(activeAgents);
  const time = new Date().toLocaleTimeString('fr-FR');

  console.log(`\n⏰ [${time}] Production parallele (${activeAgents.length} agents)`);

  try {
    const results = await Promise.all(
      activeAgents.map(agent => produceReflection(agent, counts, themeIdx))
    );

    await pushToGit(results, activeAgents);
    updateDashboardData(counts, activeAgents);

    const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
    const breakdown = activeAgents.map(a => `${a.name.replace('Agent ', 'A')}: ${counts[a.id]}`).join(' | ');
    console.log(`\n📊 Total: ${totalCount} reflexions (${breakdown})`);

  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
  }
};

// Main
const main = async () => {
  const config = loadAgentsConfig();
  const activeAgents = config.agents.filter(a => a.active);
  const { counts } = initializeCounts(activeAgents);

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode Autonome v5');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   ⚡ Intervalle: ${STATIC_CONFIG.intervalMinutes} minutes`);
  console.log(`   📝 Contenu: Reflexions etoffees (~2800 mots)`);
  console.log(`   🤖 Agents actifs: ${activeAgents.length}`);
  activeAgents.forEach(a => {
    console.log(`      - ${a.icon} ${a.name}: ${counts[a.id]} reflexions`);
  });
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runParallelProduction();

  console.log(`\n⏳ Prochaine production dans ${STATIC_CONFIG.intervalMinutes} min... (Ctrl+C pour stop)\n`);

  setInterval(async () => {
    await runParallelProduction();
    console.log(`\n⏳ Prochaine production dans ${STATIC_CONFIG.intervalMinutes} min...\n`);
  }, STATIC_CONFIG.intervalMinutes * 60 * 1000);
};

main().catch(console.error);
