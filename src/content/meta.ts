export type Locale = 'fr' | 'en'

export type ProjectTag =
  | 'B2B SaaS'
  | 'B2B Product'
  | 'Design System'
  | 'Finance'
  | 'CRM'
  | 'Mobile'
  | 'UX Strategy'

export type ProjectStatus = 'completed' | 'in-progress' | 'concept'

export type AvailabilityStatus = 'available' | 'in-talks' | 'unavailable'

export interface Metric {
  label: string
  value: string
  description?: string
}

export interface ContextItem {
  label: string
  value: string
  type?: 'text' | 'list' | 'metric' | 'quote' | 'link'
}

export interface ContextSection {
  sectionId: string
  label: string
  items: ContextItem[]
}

export interface ProjectMeta {
  title: string
  slug: string
  description: string
  tags: ProjectTag[]
  status: ProjectStatus
  timeline: string
  metrics?: Metric[]
  image?: string
  client?: string
  role?: string
  contextSections?: ContextSection[]
}

export interface ExperienceItem {
  year: string
  title: string
  company: string
  description: string
}

export interface AboutMeta {
  title: string
  subtitle: string
  bio: string
  photo: string
  availability: AvailabilityStatus
  skills: string[]
  experience: ExperienceItem[]
}
