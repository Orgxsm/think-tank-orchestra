# Think Tank Orchestra

Systeme d'orchestration d'agents IA pour generer des reflexions structurees, publiees automatiquement sur GitBook.

## Nos agents

| Agent | Specialite |
|-------|------------|
| Agent Tiers-Lieux | Espaces collaboratifs, coworking, gouvernance participative |
| Agent Durabilite | Economie circulaire, transition ecologique, solidarite |
| Amelia | Innovation sociale, design thinking, tech for good |

## Installation

```bash
# Cloner le repo
git clone https://github.com/Orgxsm/think-tank-orchestra.git
cd think-tank-orchestra

# Installer les dependances
npm install

# Configurer la cle API
cp .env.example .env
# Editez .env et ajoutez votre ANTHROPIC_API_KEY
```

## Utilisation

```bash
# Mode demon (production continue toutes les 30 min)
npm start

# Execution unique
npm run once

# Mode legacy (template sans IA)
npm run legacy
```

## Configuration des agents

Editez `config/agents-config.json` pour :
- Activer/desactiver des agents (`"active": true/false`)
- Ajouter de nouveaux themes
- Modifier les prompts systeme
- Changer l'intervalle de production

### Ajouter un nouvel agent

```json
{
  "id": "agent-5",
  "name": "Mon Agent",
  "icon": "🎯",
  "section": "Mon Domaine",
  "folder": "agent-5-mon-domaine",
  "active": true,
  "description": "Description de l'agent...",
  "systemPrompt": "Tu es un expert en...",
  "themes": [
    {
      "title": "Theme 1",
      "keywords": ["mot1", "mot2", "mot3"]
    }
  ]
}
```

## Structure du projet

```
think-tank-orchestra/
├── config/
│   └── agents-config.json    # Configuration des agents
├── docs/
│   ├── agent-1-tierslieux/   # Reflexions Agent Tiers-Lieux
│   ├── agent-2-durabilite/   # Reflexions Agent Durabilite
│   └── agent-3-innovation/   # Reflexions Amelia
├── scripts/
│   ├── orchestrator-ai.js    # Orchestrateur avec Claude API
│   └── orchestrator.js       # Version legacy (template)
├── .env.example              # Template configuration
├── package.json
├── SUMMARY.md                # Table des matieres GitBook
└── README.md
```

## GitBook

Le repo est synchronise avec GitBook. Chaque push sur `main` declenche une mise a jour automatique du site.

---

*Think Tank Orchestra v6 - Propulse par Claude API*
