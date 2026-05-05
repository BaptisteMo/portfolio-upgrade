import type { AiJourneyLevel, Locale } from './meta'

export const aiJourneyLevels: Record<Locale, AiJourneyLevel[]> = {
  fr: [
    {
      level: 0,
      title: 'Level 0 — Premiers pas',
      description:
        "Découverte des LLM, prompts, outils grand public. Comprendre ce qu'on peut faire avec l'IA en moins d'une heure.",
    },
    {
      level: 1,
      title: 'Level 1 — Sortir du chat',
      description:
        "RAG, fenêtres de contexte, embeddings : connecter l'IA à ses propres données et dépasser le simple chat.",
    },
    {
      level: 2,
      title: 'Level 2 — Agents qui agissent',
      description:
        "Tool use, boucles d'agent, orchestration multi-étapes. L'IA passe du conseil à l'action.",
    },
    {
      level: 3,
      title: 'Level 3 — Superpouvoirs',
      description:
        'MCP, sub-agents, skills custom : étendre Claude Code et construire son propre stack agentique.',
    },
  ],
  en: [
    {
      level: 0,
      title: 'Level 0 — First steps',
      description:
        'LLMs, prompts, consumer tools. Understanding what AI can do in under an hour.',
    },
    {
      level: 1,
      title: 'Level 1 — Beyond chat',
      description:
        'RAG, context windows, embeddings: plugging AI into your own data and moving past plain chat.',
    },
    {
      level: 2,
      title: 'Level 2 — Agents that act',
      description:
        'Tool use, agent loops, multi-step orchestration. AI moves from advice to action.',
    },
    {
      level: 3,
      title: 'Level 3 — Superpowers',
      description:
        'MCP, sub-agents, custom skills: extending Claude Code and building your own agentic stack.',
    },
  ],
}
