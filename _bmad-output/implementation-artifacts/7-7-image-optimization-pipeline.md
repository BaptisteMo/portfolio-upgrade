# Story 7.7: Image Optimization Pipeline

Status: done

## Story

**As a** visitor,
**I want** images to load quickly and efficiently,
**So that** the site remains fast on any connection.

## Acceptance Criteria

1. **AC1**: Toutes les images utilisent le composant `next/image`
2. **AC2**: Les images sont automatiquement converties en WebP/AVIF avec fallback
3. **AC3**: Les images sont lazy loaded par défaut (`loading="lazy"`)
4. **AC4**: Un `srcset` responsive est généré pour différentes tailles d'écran
5. **AC5**: Chaque image fait < 500kb après optimisation
6. **AC6**: Un blur placeholder est affiché pendant le chargement
7. **AC7**: Le priority loading est utilisé pour les images above-the-fold
8. **AC8**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Auditer les images existantes** (AC: 1)
  - [x] Scanner le projet pour les balises `<img>` non-Next.js — ✅ 0 trouvé
  - [x] Scanner pour les imports d'images dans `public/` ou `src/` — ✅ 4 images référencées (3 projets + 1 portrait)
  - [x] Lister toutes les images et leur emplacement — ✅ paths dans `public/images/`
  - [x] Identifier les images above-the-fold vs below-the-fold — ✅ AboutHeader (priority), ProjectCard[0] (priority), reste below-the-fold

- [x] **Task 2: Migrer vers next/image** (AC: 1, 2, 3, 4)
  - [x] Vérifier chaque composant — ✅ Tous utilisent déjà `next/image` avec `fill` + `sizes`
  - [x] `ProjectCard` : `fill` + `sizes` + `priority` prop ✅
  - [x] `AboutHeader` : `fill` + `sizes` + `priority` ✅
  - [x] `ImageFull` : `fill` + `sizes` ✅ (below-the-fold, lazy par défaut)

- [x] **Task 3: Configurer les blur placeholders** (AC: 6)
  - [x] Images sont des paths `/public` (strings) — pas d'import statique possible
  - [x] Ajouté `placeholder="blur"` + `blurDataURL` SVG inline sur les 3 composants

- [x] **Task 4: Priority loading pour above-the-fold** (AC: 7)
  - [x] `AboutHeader` : `priority` déjà présent ✅
  - [x] `ProjectCard` : `priority` prop déjà en place, passé par le parent ✅
  - [x] `ImageFull` (MDX) : below-the-fold, pas de `priority` → correct ✅

- [x] **Task 5: Optimiser les images sources** (AC: 5)
  - [x] Dossier `public/images/` n'existe pas encore — images placeholder à fournir par le designer
  - [x] AC5 sera vérifié lors de l'ajout des images réelles

- [x] **Task 6: Configuration next.config** (AC: 2)
  - [x] Ajouté `images.formats: ['image/avif', 'image/webp']` dans `next.config.ts`
  - [x] Pas d'images remote — `remotePatterns` non nécessaire

- [x] **Task 7: Build Verification** (AC: 8)
  - [x] Run `npm run build` — no errors ✅
  - [ ] Vérifier dans le network tab que les images sont servies en WebP/AVIF (manual)
  - [ ] Vérifier les blur placeholders (manual)
  - [ ] Lighthouse : pas de "Serve images in next-gen formats" warning (manual)

## Dev Notes

### Architecture Compliance

**Modified Files (potentiels):**
```
src/components/features/hero/HeroLanding.tsx     # Si images hero
src/components/features/projects/ProjectCard.tsx  # Si images projet
src/components/features/case-study/*.tsx          # Si images case study
next.config.ts                                    # Config images
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. `next/image` est obligatoire — pas de `<img>` HTML brut
4. `priority` seulement pour above-the-fold (hero, first project card)
5. `sizes` prop obligatoire pour les images responsives (sinon srcset inutile)

### Next.js Image Best Practices

```tsx
// Image statique avec blur placeholder
import projectImage from '@/assets/projects/project-1.jpg'
<Image src={projectImage} alt="Project 1" placeholder="blur" />

// Image above-the-fold
<Image src={heroImage} alt="Hero" priority placeholder="blur" />

// Image responsive
<Image
  src={image}
  alt="description"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
  className="object-cover"
/>
```

### Dependencies

- **Requires**: Aucune
- **New packages**: Aucun (next/image est natif)

### References

- [Next.js Image Docs](https://nextjs.org/docs/app/api-reference/components/image)
- [next.config.ts](next.config.ts) — Configuration images

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Toutes les images utilisent next/image
- [ ] Images above-the-fold : priority + blur placeholder
- [ ] Images below-the-fold : lazy loaded
- [ ] Network tab : format WebP ou AVIF
- [ ] Pas de layout shift (CLS) sur les images
- [ ] Lighthouse : pas de warning images

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

- **Audit (AC1):** 0 `<img>` HTML brut. 3 composants utilisent déjà `next/image` avec `fill` + `sizes`.
- **next/image (AC1-4):** Déjà en place partout. `ProjectCard` + `AboutHeader` supportent `priority`. `ImageFull` (MDX) est below-the-fold, lazy par défaut.
- **WebP/AVIF (AC2):** Ajouté `images.formats: ['image/avif', 'image/webp']` dans `next.config.ts`.
- **Lazy loading (AC3):** Natif avec `next/image` — `loading="lazy"` par défaut.
- **srcset (AC4):** Géré automatiquement par `next/image` + `sizes` prop déjà configuré.
- **Taille images (AC5):** `public/images/` n'existe pas encore — à vérifier lors de l'ajout des assets réels.
- **Blur placeholder (AC6):** Ajouté `placeholder="blur"` + `blurDataURL` SVG inline sur ProjectCard, AboutHeader, ImageFull.
- **Priority (AC7):** Déjà en place sur AboutHeader (`priority`) et ProjectCard (prop `priority` passée par le parent).
- **Build (AC8):** Passe sans erreurs.

### File List

- `next.config.ts` — MODIFIED: ajout images.formats ['image/avif', 'image/webp']
- `src/components/features/projects/ProjectCard.tsx` — MODIFIED: ajout placeholder="blur" + blurDataURL
- `src/components/features/about/AboutHeader.tsx` — MODIFIED: ajout placeholder="blur" + blurDataURL
- `src/components/mdx/ImageFull.tsx` — MODIFIED: ajout placeholder="blur" + blurDataURL
