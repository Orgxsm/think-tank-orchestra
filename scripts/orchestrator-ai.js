/**
 * Think Tank Orchestra - Orchestrateur IA v6
 * Utilise Claude API pour generer du vrai contenu
 */

const Anthropic = require('@anthropic-ai/sdk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  repoPath: path.join(__dirname, '..'),
  configPath: path.join(__dirname, '..', 'config', 'agents-config.json'),
  envPath: path.join(__dirname, '..', '.env')
};

// Charger les variables d'environnement depuis .env
const loadEnv = () => {
  try {
    if (fs.existsSync(CONFIG.envPath)) {
      const envContent = fs.readFileSync(CONFIG.envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
  } catch (e) {
    console.error('Erreur chargement .env:', e.message);
  }
};

loadEnv();

// Verifier la cle API
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY non definie');
  console.error('   Creez un fichier .env avec: ANTHROPIC_API_KEY=votre_cle');
  process.exit(1);
}

// Initialiser le client Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Charger la configuration des agents
const loadConfig = () => {
  try {
    const content = fs.readFileSync(CONFIG.configPath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Erreur chargement config:', e.message);
    process.exit(1);
  }
};

// Compter les fichiers existants
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

// Initialiser les compteurs
const initializeCounts = (agents) => {
  const counts = {};
  const themeIdx = {};
  agents.forEach(agent => {
    const existingCount = countExistingFiles(agent.folder);
    counts[agent.id] = existingCount;
    themeIdx[agent.id] = existingCount;
  });
  return { counts, themeIdx };
};

// Commandes Git
const git = (cmd) => {
  try {
    return execSync(cmd, {
      cwd: CONFIG.repoPath,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (e) {
    console.error(`Git error: ${e.message}`);
    return null;
  }
};

// Creer le dossier agent si necessaire
const ensureAgentFolder = (agent) => {
  const folderPath = path.join(CONFIG.repoPath, 'docs', agent.folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });

    const indexContent = `# ${agent.section}

## Presentation

${agent.description}

## Themes explores

${agent.themes.map(t => `- **${t.title}**`).join('\n')}

---

*${agent.name} - Think Tank Orchestra*
`;
    fs.writeFileSync(path.join(folderPath, 'index.md'), indexContent, 'utf8');
    console.log(`   📁 Dossier cree: ${agent.folder}`);
  }
};

// Generer le contenu via Claude API
const generateWithClaude = async (agent, theme, settings) => {
  const prompt = `Redige une reflexion approfondie et structuree sur le theme suivant:

**Theme**: ${theme.title}
**Mots-cles a integrer**: ${theme.keywords.join(', ')}
**Domaine**: ${agent.section}

La reflexion doit faire environ 2500-3000 mots et suivre cette structure:

1. **Resume executif** (5-6 lignes)
2. **Introduction** avec contextualisation et enjeux
3. **Premiere partie**: Cadrage theorique et conceptuel (definitions, cadres theoriques, etat de l'art)
4. **Deuxieme partie**: Analyse des pratiques (cartographie, etudes de cas, facteurs de reussite, obstacles)
5. **Troisieme partie**: Perspectives et recommandations (pour les acteurs, les reseaux, les politiques publiques)
6. **Conclusion**
7. **References bibliographiques** (5-7 references reelles et pertinentes)

Style: academique mais accessible, avec des exemples concrets francais et europeens.
Langue: francais (sans accents sur les majuscules pour compatibilite).

IMPORTANT: Ne genere que le contenu markdown, sans le frontmatter YAML (il sera ajoute automatiquement).`;

  try {
    const response = await anthropic.messages.create({
      model: settings.model || 'claude-sonnet-4-20250514',
      max_tokens: settings.maxTokens || 4000,
      system: agent.systemPrompt,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text;
  } catch (error) {
    console.error(`   ❌ Erreur API Claude: ${error.message}`);
    throw error;
  }
};

// Produire une reflexion
const produceReflection = async (agent, counts, themeIdx, settings) => {
  ensureAgentFolder(agent);

  const currentThemeIdx = themeIdx[agent.id] % agent.themes.length;
  const theme = agent.themes[currentThemeIdx];
  const nextTheme = agent.themes[(currentThemeIdx + 1) % agent.themes.length];

  counts[agent.id]++;
  const num = counts[agent.id];

  const slug = theme.title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 45)
    .replace(/-$/, '');

  const fileName = `${String(num).padStart(2, '0')}-${slug}.md`;
  const filePath = path.join(CONFIG.repoPath, 'docs', agent.folder, fileName);

  console.log(`   🤖 ${agent.name}: "${theme.title}"`);
  console.log(`      ⏳ Generation en cours via Claude API...`);

  // Generer le contenu via Claude
  const generatedContent = await generateWithClaude(agent, theme, settings);

  // Construire le frontmatter
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toLocaleTimeString('fr-FR');
  const wordCount = generatedContent.split(/\s+/).length;

  const frontmatter = `---
title: "${theme.title}"
agent: "${agent.name}"
date: "${date}"
time: "${time}"
status: "published"
theme: "${agent.section}"
numero: ${num}
wordcount: ${wordCount}
keywords: [${theme.keywords.map(k => `"${k}"`).join(', ')}]
generated_by: "claude-api"
model: "${settings.model || 'claude-sonnet-4-20250514'}"
---

`;

  const fullContent = frontmatter + generatedContent + `

---

*Production IA - Think Tank Orchestra*
*Agent: ${agent.name}*
*Prochaine reflexion: ${nextTheme.title}*
`;

  fs.writeFileSync(filePath, fullContent, 'utf8');
  console.log(`      ✅ Genere: ${fileName} (${wordCount} mots)`);

  themeIdx[agent.id]++;

  return {
    agent: agent.name,
    agentId: agent.id,
    theme: theme.title,
    fileName,
    num,
    wordCount
  };
};

// Reconstruire SUMMARY.md
const rebuildSummary = (agents) => {
  let summary = `# Table of contents

* [Accueil](README.md)
`;

  agents.filter(a => a.active).forEach(agent => {
    summary += `
## ${agent.name}: ${agent.section}

* [Introduction](docs/${agent.folder}/index.md)
`;

    const folderPath = path.join(CONFIG.repoPath, 'docs', agent.folder);

    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath)
        .filter(f => f.match(/^\d{2}-.*\.md$/) && f !== 'index.md')
        .sort();

      files.forEach((file, i) => {
        const num = String(i + 1).padStart(2, '0');
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

  fs.writeFileSync(path.join(CONFIG.repoPath, 'SUMMARY.md'), summary, 'utf8');
};

// Push vers Git
const pushToGit = async (results, agents) => {
  console.log('\n   📤 Push vers GitHub...');

  // Verifier si la branche draft existe
  const branches = git('git branch -a') || '';
  const hasDraft = branches.includes('draft');

  if (hasDraft) {
    git('git checkout draft');
    git('git pull origin draft --rebase') || git('git pull origin main --rebase');
  } else {
    // Creer la branche draft si elle n'existe pas
    git('git checkout -b draft') || git('git checkout draft');
  }

  rebuildSummary(agents);

  git('git add .');

  const themes = results.map(r => r.theme.substring(0, 25)).join(' + ');
  const commitMsg = `PRODUCTION IA: ${themes}`;
  git(`git commit -m "${commitMsg}"`);

  git('git push origin draft') || git('git push -u origin draft');

  git('git checkout main');
  git(`git merge draft --no-ff -m "PUBLISHED: ${results.length} reflexions generees par IA"`);
  git('git push origin main');

  console.log(`   ✅ ${results.length} reflexions publiees sur GitHub`);
};

// Production sequentielle (pour eviter rate limits)
const runProduction = async () => {
  const config = loadConfig();
  const settings = config.settings;
  const activeAgents = config.agents.filter(a => a.active);

  if (activeAgents.length === 0) {
    console.log('⚠️  Aucun agent actif');
    return;
  }

  const { counts, themeIdx } = initializeCounts(activeAgents);
  const time = new Date().toLocaleTimeString('fr-FR');

  console.log(`\n⏰ [${time}] Production IA (${activeAgents.length} agents)`);

  const results = [];

  // Production sequentielle pour eviter les rate limits
  for (const agent of activeAgents) {
    try {
      const result = await produceReflection(agent, counts, themeIdx, settings);
      results.push(result);

      // Pause entre les agents pour eviter rate limits
      if (activeAgents.indexOf(agent) < activeAgents.length - 1) {
        console.log('      ⏸️  Pause 5s...');
        await new Promise(r => setTimeout(r, 5000));
      }
    } catch (error) {
      console.error(`   ❌ Erreur agent ${agent.name}: ${error.message}`);
    }
  }

  if (results.length > 0) {
    await pushToGit(results, activeAgents);

    const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
    const totalWords = results.reduce((a, r) => a + r.wordCount, 0);
    console.log(`\n📊 Total: ${totalCount} reflexions | Cette session: ${totalWords} mots generes`);
  }
};

// Mode demon (execution periodique)
const runDaemon = async () => {
  const config = loadConfig();
  const interval = config.settings.intervalMinutes || 30;

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode IA v6');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   🤖 Modele: ${config.settings.model}`);
  console.log(`   ⏱️  Intervalle: ${interval} minutes`);
  console.log(`   📝 Agents actifs: ${config.agents.filter(a => a.active).length}`);
  config.agents.filter(a => a.active).forEach(a => {
    const count = countExistingFiles(a.folder);
    console.log(`      - ${a.icon} ${a.name}: ${count} reflexions`);
  });
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runProduction();

  console.log(`\n⏳ Prochaine production dans ${interval} min... (Ctrl+C pour stop)\n`);

  setInterval(async () => {
    await runProduction();
    console.log(`\n⏳ Prochaine production dans ${interval} min...\n`);
  }, interval * 60 * 1000);
};

// Mode single (une seule execution)
const runOnce = async () => {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Execution unique');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runProduction();

  console.log('\n✅ Production terminee');
};

// Point d'entree
const main = async () => {
  const args = process.argv.slice(2);

  if (args.includes('--once') || args.includes('-o')) {
    await runOnce();
  } else {
    await runDaemon();
  }
};

main().catch(console.error);
