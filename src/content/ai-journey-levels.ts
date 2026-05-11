import type { AiJourneyLevel, Locale } from './meta'

export const aiJourneyLevels: Record<Locale, AiJourneyLevel[]> = {
  fr: [
    {
      level: 1,
      title: 'Level 1 — Premiers pas',
      description:
        "Créer mes premiers side projects épaulé par ChatGPT.",
    },
    {
      level: 2,
      title: 'Level 2 — Découverte de Claude Code',
      description:
        "Installer mes premiers outils, travailler directement dans l'IDE, tester des frameworks.",
    },
    {
      level: 3,
      title: 'Level 3 — Structurer les workflows',
      description:
        "Créer des workflows structurés, produire des outils utilisables dans un contexte pro.",
    },
    {
      level: 4,
      title: 'Level 4 — Superpouvoirs',
      description:
        "Créer des systèmes d'agents avec lesquels je collabore au quotidien.",
    },
  ],
  en: [
    {
      level: 1,
      title: 'Level 1 — First steps',
      description:
        'Building my first side projects with ChatGPT as a partner.',
    },
    {
      level: 2,
      title: 'Level 2 — Discovering Claude Code',
      description:
        'Setting up my first tools, working directly in the IDE, testing frameworks.',
    },
    {
      level: 3,
      title: 'Level 3 — Structuring workflows',
      description:
        'Building structured workflows and shipping tools usable in a real work context.',
    },
    {
      level: 4,
      title: 'Level 4 — Superpowers',
      description:
        'Building agent systems I collaborate with every day.',
    },
  ],
}
