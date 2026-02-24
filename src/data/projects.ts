// Re-export types from meta.ts for backward compatibility
export type { ProjectTag as ProjectTagType, ProjectMeta, ProjectStatus } from '@/content/meta'
import type { ProjectTag, ProjectStatus } from '@/content/meta'

// Legacy Project interface for backward compatibility with ProjectGrid
export interface Project {
  slug: string
  title: string
  description: string
  image?: string
  tags: ProjectTag[]
  status: ProjectStatus
}

// Default projects array (French locale) for backward compatibility
// This will be replaced by MDX-based fetching in Story 3.3
export const projects: Project[] = [
    {
    slug: 'klub',
    title: 'Klub!',
    description:
      "Refonte totale d'une application B2B utilisé par plus de 20 000 users",
    image: '/images/projects/klub/banner.jpg',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },
  {
    slug: 'atlas',
    title: 'Atlas',
    description:
      "Repenser la lisibilité d’un outil financier interne critique : clarifier un produit dense, aligner les métiers et remettre le design au cœur des arbitrages",
    image: '/images/projects/atlas/banner.jpg',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },
    {
    slug: 'design-system',
    title: 'Design system',
    description:
      "Structurer et unifier la conception des outils internes de la DSI : poser un design system transversal, accélérer l’implémentation front et installer une culture design pragmatique.",
    image: '/images/projects/design-system/banner.png',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },   
  {
    slug: 'enedis',
    title: 'Enedis',
    description:
      "Mission de cadrage UX : transformer un suivi Excel fragile en une vision partagée, priorisée et exploitable pour lancer le développement d’un outil de pilotage multi-équipes",
    image: '/images/projects/enedis/banner.png',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },
  
]
