import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale, ProjectMeta, AboutMeta } from '@/content/meta'

const contentDirectory = path.join(process.cwd(), 'src/content')

function validateProjectMeta(data: Record<string, unknown>): ProjectMeta {
  const required = ['title', 'slug', 'description', 'tags', 'status', 'timeline', 'metrics']
  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Missing required frontmatter field: ${field}`)
    }
  }
  return data as unknown as ProjectMeta
}

function validateAboutMeta(data: Record<string, unknown>): AboutMeta {
  const required = ['title', 'subtitle', 'bio', 'photo', 'availability', 'skills', 'experience']
  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Missing required about frontmatter field: ${field}`)
    }
  }
  return data as unknown as AboutMeta
}

/**
 * Get a single project by slug and locale
 */
export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<{ meta: ProjectMeta; content: string }> {
  const filePath = path.join(contentDirectory, locale, 'projects', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Project not found: ${slug} (${locale})`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const meta = validateProjectMeta(data)

  return { meta, content }
}

/**
 * Get all projects for a locale
 */
export async function getAllProjects(locale: Locale): Promise<ProjectMeta[]> {
  const projectsDir = path.join(contentDirectory, locale, 'projects')

  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const filenames = fs.readdirSync(projectsDir)

  const projects = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(projectsDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return validateProjectMeta(data)
    })

  return projects
}

/**
 * Get about page content for a locale
 */
export async function getAboutContent(
  locale: Locale
): Promise<{ meta: AboutMeta; content: string }> {
  const filePath = path.join(contentDirectory, locale, 'about.mdx')

  if (!fs.existsSync(filePath)) {
    throw new Error(`About content not found for locale: ${locale}`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const meta = validateAboutMeta(data)

  return { meta, content }
}

/**
 * Get all project slugs (for static generation)
 */
export function getAllProjectSlugs(): string[] {
  const projectsDir = path.join(contentDirectory, 'fr', 'projects')

  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const filenames = fs.readdirSync(projectsDir)

  return filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace('.mdx', ''))
}

/**
 * Get all locales
 */
export function getAllLocales(): Locale[] {
  return ['fr', 'en']
}
