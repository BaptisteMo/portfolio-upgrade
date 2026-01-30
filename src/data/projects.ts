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
    slug: 'la-wooferie',
    title: 'La Wooferie',
    description:
      'Plateforme de réservation pour pension canine avec système de gestion intégré.',
    image: '/images/projects/la-wooferie.jpg',
    tags: ['B2B SaaS', '0→1'],
    status: 'completed',
  },
  {
    slug: 'khora',
    title: 'Khora',
    description: 'Design System complet pour startup EdTech en Série A.',
    image: '/images/projects/khora.jpg',
    tags: ['Design System', 'B2B SaaS'],
    status: 'completed',
  },
  {
    slug: 'nexus-crm',
    title: 'Nexus CRM',
    description:
      "Refonte UX d'un CRM B2B avec réduction de 35% du temps de saisie.",
    image: '/images/projects/nexus-crm.jpg',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },
]
