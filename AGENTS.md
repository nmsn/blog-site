# AGENTS.md

## Purpose

This file tells AI coding agents how to safely work in this repository.

The project started from `tailwind-nextjs-starter-blog`, but it now has custom homepage-to-shell transition behavior. Do not assume upstream template structure or default page flow.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4.2.1
- **Content**: content-collections + MDX
- **Animation**: motion (framer-motion fork) 12.36.0
- **WebGL**: ogl 1.0.11 (for Particles component)
- **Package Manager**: pnpm (required)

## Commands

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `pnpm dev`          | Start development server (localhost:3000) |
| `pnpm build`        | Build for production                      |
| `pnpm start`        | Start production server                   |
| `pnpm lint`         | Run ESLint                                |
| `pnpm lint:fix`     | Run ESLint with auto-fix                  |
| `pnpm tsc --noEmit` | Type check without emitting files         |

## Core Architecture

### Route groups

- `app/(home)`:
  Landing experience only.
  This is not a normal content page. It is the animated entry surface.

- `app/(main)`:
  Persistent content shell.
  All regular content routes render inside this shell.

### Current UX model

- Home shows a centered logo and landing navigation.
- Entering content routes should transition from home into the shell.
- Inside the shell, only the right content area should change when navigating between content pages.
- Returning from the shell to `/` should animate back to the homepage, not hard cut if possible.

## Files That Control Important Behavior

### Home transition

- `app/(home)/page.tsx`
- `components/home/HomeHero.tsx`
- `app/(home)/Header.tsx`

These files control:

- homepage layout
- logo position and motion
- homepage particles
- timing before routing into the shell

If you change transition timing here, verify the shell handoff still matches.

### Shell structure

- `app/(main)/layout.tsx`
- `components/shell/ShellFrame.tsx`
- `components/shell/SidebarShell.tsx`
- `components/shell/ShellNav.tsx`
- `components/shell/ShellParticles.tsx`
- `components/shell/ShellContentTransition.tsx`

These files control:

- left sidebar shell
- angled divider
- shell particles
- shell-to-home return behavior
- right-side content transitions

Do not add old-style global `Header` / `Footer` back into `(main)`.

### Reused content layouts

- `layouts/ListLayoutWithTags.tsx`
- `layouts/AuthorLayout.tsx`
- `layouts/PostLayout.tsx`
- `layouts/PostSimple.tsx`
- `layouts/PostBanner.tsx`

These were originally designed for a more traditional blog layout. When updating them, keep in mind they now render inside the shell, not as full-page standalone screens.

## Navigation Rules

Navigation source:

- `data/headerNavLinks.ts`

Current shell nav intentionally excludes:

- `/`
- `/travel`

Reason:

- `/` belongs to the landing experience, not shell nav
- `/travel` is not currently a stable implemented content route

If you add or restore routes, update both home and shell nav behavior together.

## Transition Handoff Rules

The current home/shell transition uses `sessionStorage` flags.

Known keys:

- `shell-entry`
- `home-entry`

If you change one side of the transition, update the other side too.
Do not change only `HomeHero` or only `ShellFrame` and assume the flow will remain correct.

## Particles Rules

Primary implementation:

- `components/ui/Particles.tsx`

Requirements:

- homepage particles must cover the full landing background
- shell particles must fill the angled sidebar region
- particle canvas must respond to container size changes, not only window resize

Preserve `ResizeObserver`-based resizing behavior when editing particle code.

## Styling / UX Constraints

When modifying UI in this repo:

- Preserve the dark left shell / lighter right content contrast
- Preserve the angled divider as a core visual pattern
- Avoid flat pure-white content slabs unless intentionally redesigning the shell
- Avoid reintroducing generic template chrome that conflicts with the custom shell
- Prefer cohesive motion over isolated flashy animations

## Safe Change Strategy

When implementing features, prefer this order:

1. Get routing/content behavior correct without animation
2. Add shell content transitions
3. Add or refine home/shell transition timing
4. Tune particle behavior and micro-interactions last

This reduces animation-routing bugs.

## What Agents Should Check Before Finishing

At minimum, verify changed files with:

- `pnpm lint` - Run ESLint on all files
- `pnpm tsc --noEmit` - Type check without emitting files

If the change affects transitions, routing, shell layout, or particles, manual browser verification is strongly recommended.

## Environment Variables

See `.env.example` for required environment variables. Copy it to `.env.local` for local development.

Currently, this project does not require mandatory environment variables for basic functionality.

## What Agents Should Avoid

- Do not treat `(home)` as a regular static page
- Do not duplicate `/blog`, `/about`, etc. under a second route group with the same URL
- Do not hard-cut between home and shell if the task is about preserving motion continuity
- Do not break the handoff between home transition state and shell transition state
- Do not remove the angled divider without explicit redesign intent
- Do not use npm or yarn; use pnpm only

## Error Handling

When encountering issues:

1. **Build errors**: Run `pnpm build` to identify compilation issues
2. **Type errors**: Run `pnpm tsc --noEmit` to check TypeScript errors
3. **Lint errors**: Run `pnpm lint` and fix reported issues
4. **Hydration errors**: Check for client/server mismatches in components
5. **Transition bugs**: Verify `sessionStorage` keys (`shell-entry`, `home-entry`) are set correctly

## Content Structure

Blog posts are stored in `data/blog/` as MDX files. Each post requires frontmatter:

```yaml
---
title: 'Post Title'
date: '2024-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: 'Brief summary'
---
```

After adding or modifying content, restart the dev server if `content-collections` does not pick up the new generated types immediately.
