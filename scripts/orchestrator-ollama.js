/**
 * Think Tank Orchestra - Orchestrateur Ollama v6
 * Utilise Ollama (local, gratuit) pour generer du contenu
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const CONFIG = {
  repoPath: path.join(__dirname, '..'),
  configPath: path.join(__dirname, '..', 'config', 'agents-config.json'),
  ollamaUrl: 'http://localhost:11434'
};

// Charger la configuration
const loadConfig = () => {
  try {
    const content = fs.readFileSync(CONFIG.configPath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Erreur chargement config:', e.message);
    process.exit(1);
  }
};

// Appel API Ollama
const callOllama = (model, prompt, systemPrompt) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: model,
      prompt: prompt,
      system: systemPrompt,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 4000
      }
    });

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.response);
        } catch (e) {
          reject(new Error('Invalid response from Ollama'));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(300000); // 5 min timeout
    req.write(data);
    req.end();
  });
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
    return null;
  }
};

// Creer le dossier agent
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

// Generer le contenu via Ollama
const generateWithOllama = async (agent, theme, model) => {
  const prompt = `Redige une reflexion approfondie et structuree sur le theme suivant:

**Theme**: ${theme.title}
**Mots-cles a integrer**: ${theme.keywords.join(', ')}
**Domaine**: ${agent.section}

La reflexion doit faire environ 1500-2000 mots et suivre cette structure:

1. **Resume executif** (4-5 lignes)
2. **Introduction** avec contextualisation et enjeux
3. **Premiere partie**: Cadrage theorique (definitions, concepts cles)
4. **Deuxieme partie**: Analyse des pratiques (exemples concrets, etudes de cas)
5. **Troisieme partie**: Perspectives et recommandations
6. **Conclusion**
7. **References** (3-5 references)

Style: academique mais accessible, avec des exemples concrets francais.
Langue: francais.

IMPORTANT: Genere uniquement le contenu markdown, sans frontmatter YAML.`;

  return await callOllama(model, prompt, agent.systemPrompt);
};

// Produire une reflexion
const produceReflection = async (agent, counts, themeIdx, model) => {
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
  console.log(`      ⏳ Generation via Ollama (${model})...`);

  const generatedContent = await generateWithOllama(agent, theme, model);

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
generated_by: "ollama"
model: "${model}"
---

`;

  const fullContent = frontmatter + generatedContent + `

---

*Production IA locale - Think Tank Orchestra*
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

  const branches = git('git branch -a') || '';
  const hasDraft = branches.includes('draft');

  if (hasDraft) {
    git('git checkout draft');
    git('git pull origin draft --rebase') || git('git pull origin main --rebase');
  } else {
    git('git checkout -b draft') || git('git checkout draft');
  }

  rebuildSummary(agents);

  git('git add .');

  const themes = results.map(r => r.theme.substring(0, 25)).join(' + ');
  git(`git commit -m "PRODUCTION OLLAMA: ${themes}"`);

  git('git push origin draft') || git('git push -u origin draft');

  git('git checkout main');
  git(`git merge draft --no-ff -m "PUBLISHED: ${results.length} reflexions (Ollama)"`);
  git('git push origin main');

  console.log(`   ✅ ${results.length} reflexions publiees`);
};

// Production
const runProduction = async () => {
  const config = loadConfig();
  const model = config.settings.ollamaModel || 'mistral';
  const activeAgents = config.agents.filter(a => a.active);

  if (activeAgents.length === 0) {
    console.log('⚠️  Aucun agent actif');
    return;
  }

  const { counts, themeIdx } = initializeCounts(activeAgents);
  const time = new Date().toLocaleTimeString('fr-FR');

  console.log(`\n⏰ [${time}] Production locale (${activeAgents.length} agents)`);

  const results = [];

  for (const agent of activeAgents) {
    try {
      const result = await produceReflection(agent, counts, themeIdx, model);
      results.push(result);
    } catch (error) {
      console.error(`   ❌ Erreur ${agent.name}: ${error.message}`);
    }
  }

  if (results.length > 0) {
    await pushToGit(results, activeAgents);

    const totalWords = results.reduce((a, r) => a + r.wordCount, 0);
    console.log(`\n📊 Session: ${results.length} reflexions | ${totalWords} mots`);
  }
};

// Mode demon
const runDaemon = async () => {
  const config = loadConfig();
  const interval = config.settings.intervalMinutes || 30;
  const model = config.settings.ollamaModel || 'mistral';

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   🎭 THINK TANK ORCHESTRA - Mode Ollama');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   🤖 Modele: ${model} (local)`);
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

// Mode single
const runOnce = async () => {
  const config = loadConfig();
  const model = config.settings.ollamaModel || 'mistral';

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`   🎭 THINK TANK ORCHESTRA - Execution unique (${model})`);
  console.log('═══════════════════════════════════════════════════════════════════\n');

  await runProduction();

  console.log('\n✅ Production terminee');
};

// Main
const main = async () => {
  const args = process.argv.slice(2);

  if (args.includes('--once') || args.includes('-o')) {
    await runOnce();
  } else {
    await runDaemon();
  }
};

main().catch(console.error);
