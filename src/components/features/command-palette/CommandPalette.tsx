'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Command } from 'cmdk'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Home, FolderOpen, User, Mail, FileText, Sun, Moon, Languages } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/contexts'
import { projects } from '@/data/projects'
import { setStoredLocale } from '@/lib/locale-storage'
import { useFuzzySearch } from '@/hooks/useFuzzySearch'
import { HighlightMatch } from '@/components/features/command-palette/HighlightMatch'
import type { SearchableItem } from '@/hooks/useFuzzySearch'
import type { LucideIcon } from 'lucide-react'
import type { Locale } from '@/content/meta'

interface NavCommand {
  id: string
  label: { fr: string; en: string }
  href: string
  icon: LucideIcon
  keywords: string[]
}

const navCommands: NavCommand[] = [
  {
    id: 'home',
    label: { fr: 'Accueil', en: 'Home' },
    href: '',
    icon: Home,
    keywords: ['accueil', 'home', 'dashboard'],
  },
  {
    id: 'projects',
    label: { fr: 'Projets', en: 'Projects' },
    href: '/projects',
    icon: FolderOpen,
    keywords: ['projets', 'projects', 'portfolio'],
  },
  {
    id: 'about',
    label: { fr: 'À propos', en: 'About' },
    href: '/about',
    icon: User,
    keywords: ['about', 'à propos', 'bio'],
  },
  {
    id: 'contact',
    label: { fr: 'Contact', en: 'Contact' },
    href: '/contact',
    icon: Mail,
    keywords: ['contact', 'email', 'message'],
  },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const groupHeadingClass =
  '**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:text-muted-foreground'

const itemClass =
  'cursor-pointer rounded-md px-3 py-2 text-sm text-foreground transition-colors duration-150 ease-out hover:bg-muted/50 data-[selected=true]:bg-muted'

const themeCommands = [
  {
    id: 'theme-light',
    label: { fr: 'Mode clair', en: 'Light mode' },
    icon: Sun,
    keywords: ['light', 'clair', 'soleil', 'theme'],
    theme: 'light' as const,
  },
  {
    id: 'theme-dark',
    label: { fr: 'Mode sombre', en: 'Dark mode' },
    icon: Moon,
    keywords: ['dark', 'sombre', 'nuit', 'theme'],
    theme: 'dark' as const,
  },
]

const langCommands = [
  {
    id: 'lang-fr',
    label: { fr: 'Français', en: 'French' },
    icon: Languages,
    keywords: ['français', 'french', 'fr', 'langue', 'language'],
    locale: 'fr' as Locale,
  },
  {
    id: 'lang-en',
    label: { fr: 'Anglais', en: 'English' },
    icon: Languages,
    keywords: ['anglais', 'english', 'en', 'langue', 'language'],
    locale: 'en' as Locale,
  },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { locale } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const { setTheme } = useTheme()

  const [query, setQuery] = useState('')
  const prevOpen = useRef(open)

  const applyTheme = useCallback(
    (theme: string) => {
      track('command_executed', { type: 'theme_change', value: theme })
      setTheme(theme)
      onOpenChange(false)
    },
    [setTheme, onOpenChange]
  )

  useEffect(() => {
    if (open && !prevOpen.current) {
      track('command_palette_opened')
    }
    prevOpen.current = open
  }, [open])

  const labels = {
    placeholder: locale === 'fr' ? 'Rechercher...' : 'Search...',
    empty: locale === 'fr' ? 'Aucun résultat.' : 'No results found.',
    ariaLabel:
      locale === 'fr' ? 'Palette de commandes' : 'Command palette',
    navigationGroup: locale === 'fr' ? 'Navigation' : 'Navigation',
    projectsGroup: locale === 'fr' ? 'Projets' : 'Projects',
    preferencesGroup: locale === 'fr' ? 'Préférences' : 'Preferences',
  }

  const navigate = useCallback(
    (href: string) => {
      track('command_executed', { type: 'navigation', target: href || '/' })
      router.push(`/${locale}${href}`)
      onOpenChange(false)
    },
    [router, locale, onOpenChange]
  )

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      track('command_executed', { type: 'language_change', value: newLocale })
      if (newLocale === locale) {
        onOpenChange(false)
        return
      }
      setStoredLocale(newLocale)
      const segments = pathname.split('/')
      segments[1] = newLocale
      router.push(segments.join('/'))
      onOpenChange(false)
    },
    [locale, onOpenChange, pathname, router]
  )

  // Build unified searchable items for fuzzy search
  const searchableItems: SearchableItem[] = useMemo(() => {
    const items: SearchableItem[] = []

    // Navigation commands
    for (const cmd of navCommands) {
      items.push({
        id: cmd.id,
        label: cmd.label[locale],
        group: 'navigation',
        keywords: cmd.keywords,
        icon: cmd.icon,
        onSelect: () => navigate(cmd.href),
      })
    }

    // Project commands
    for (const project of projects) {
      items.push({
        id: project.slug,
        label: project.title,
        group: 'projects',
        keywords: project.tags,
        icon: FileText,
        onSelect: () => navigate(`/projects/${project.slug}`),
      })
    }

    // Theme commands
    for (const cmd of themeCommands) {
      items.push({
        id: cmd.id,
        label: cmd.label[locale],
        group: 'preferences',
        keywords: cmd.keywords,
        icon: cmd.icon,
        onSelect: () => applyTheme(cmd.theme),
      })
    }

    // Language commands
    for (const cmd of langCommands) {
      items.push({
        id: cmd.id,
        label: cmd.label[locale],
        group: 'preferences',
        keywords: cmd.keywords,
        icon: cmd.icon,
        onSelect: () => switchLocale(cmd.locale),
      })
    }

    return items
  }, [locale, navigate, switchLocale, applyTheme])

  const { results } = useFuzzySearch(searchableItems, query)
  const isSearching = query.length >= 2

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) setQuery('')
        onOpenChange(newOpen)
      }}
      label={labels.ariaLabel}
      shouldFilter={!isSearching}
      overlayClassName="cmdk-overlay fixed inset-0 z-[100] bg-black/50 backdrop-blur-[8px]"
      contentClassName="cmdk-content fixed inset-0 z-[100] flex items-center justify-center"
      className='w-[50%]'
    >
      <DialogTitle className="sr-only">{labels.ariaLabel}</DialogTitle>
      <DialogDescription className="sr-only">{labels.placeholder}</DialogDescription>
      <div className="w-full max-w-150 mx-auto rounded-xl border border-border bg-popover shadow-lg">
        <Command.Input
          placeholder={labels.placeholder}
          className="w-full border-b border-border bg-transparent p-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          autoFocus
          onValueChange={setQuery}
        />
        <Command.List className="max-h-75 overflow-y-auto scrollbar-hide p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
            {labels.empty}
          </Command.Empty>

          {isSearching ? (
            // Fuzzy search results — flat list with highlighting
            results.map((result) => {
              const Icon = result.item.icon
              return (
                <Command.Item
                  key={result.item.id}
                  value={result.item.id}
                  onSelect={result.item.onSelect}
                  className={itemClass}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <HighlightMatch
                      text={result.item.label}
                      matches={result.matches}
                    />
                  </span>
                </Command.Item>
              )
            })
          ) : (
            // Default grouped view
            <>
              <Command.Group heading={labels.navigationGroup} className={groupHeadingClass}>
                {navCommands.map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.id}
                    keywords={cmd.keywords}
                    onSelect={() => navigate(cmd.href)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <cmd.icon className="h-4 w-4 text-muted-foreground" />
                      {cmd.label[locale]}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading={labels.projectsGroup}
                className={groupHeadingClass}
              >
                {projects.map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={project.slug}
                    keywords={project.tags}
                    onSelect={() => navigate(`/projects/${project.slug}`)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {project.title}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading={labels.preferencesGroup}
                className={groupHeadingClass}
              >
                {themeCommands.map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.id}
                    keywords={cmd.keywords}
                    onSelect={() => applyTheme(cmd.theme)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <cmd.icon className="h-4 w-4 text-muted-foreground" />
                      {cmd.label[locale]}
                    </span>
                  </Command.Item>
                ))}
                {langCommands.map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.id}
                    keywords={cmd.keywords}
                    onSelect={() => switchLocale(cmd.locale)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <cmd.icon className="h-4 w-4 text-muted-foreground" />
                      {cmd.label[locale]}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            </>
          )}
        </Command.List>
      </div>
    </Command.Dialog>
  )
}
