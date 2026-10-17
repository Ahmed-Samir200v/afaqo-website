---
trigger: glob
description: "AFAQO Next.js, React, TypeScript, CSS, responsive, accessibility, and dependency rules."
globs: "src/**/*.ts, src/**/*.tsx, src/**/*.css, next.config.*, tsconfig*.json, package.json, package-lock.json"
---

# Frontend Rules

## Verified stack

- Next.js `16.4.2`, App Router
- React and React DOM `19.3.0`
- TypeScript `5.9.3` in strict, no-emit mode
- Tailwind CSS `4.3.3` via `@import "tailwindcss"` and `@tailwindcss/turbopack`
- npm with `package-lock.json`
- Path alias: `@/*` -> `src/*`
- Next.js Cache Components and partial prefetching are enabled

Use installed Next.js documentation under `node_modules/next/dist/docs/` before changing framework behavior or relying on version-sensitive APIs.

## Current architecture

- `src/app/` owns the root layout, global styles, metadata, and homepage composition.
- `src/components/layout/` owns header, navigation, mobile menu, and footer.
- `src/components/sections/home/` owns homepage sections.
- `src/components/ui/` owns reusable immersive UI primitives.
- `src/content/` owns typed editorial content by domain.
- `src/lib/` owns shared behavior such as motion preference.

Keep content in existing content modules when it is already data-driven. Preserve numbered section naming and page order unless an approved change requires otherwise.

## Implementation rules

- Inspect existing components and utilities before creating a new abstraction.
- Prefer composition and extension over copying a component or reimplementing behavior.
- Keep Server Components as the default. Use Client Components only for state, effects, event handlers, browser APIs, GSAP, WebGL, or other client-only behavior.
- Keep client boundaries as narrow as practical. Do not move static content or layout into the client without need.
- Use strict TypeScript. Avoid `any`, unsafe casts, suppressed errors, and duplicated interfaces. Model reusable content and props explicitly.
- Use semantic landmarks and native controls. Preserve heading order, link/button meaning, keyboard access, focus management, focus visibility, and useful accessible names.
- Use `next/image` for project imagery unless a verified technical constraint prevents it. Supply accurate `alt`, dimensions or `fill`, and responsive `sizes`; reserve priority loading for true above-the-fold/LCP media.
- Use `next/link` for internal navigation.
- Reuse global CSS variables and established styles. A new token or styling method requires a clear gap and consistent naming.
- Treat Tailwind as available, not mandatory. Match the surrounding file's established style rather than rewriting it during unrelated work. Do not normalize or consolidate the project's multiple styling approaches without explicit approval and demonstrated benefit.
- Preserve the responsive model: fluid `clamp()` sizing plus existing breakpoints around 640, 768, 900, 1024, and 1080 pixels where locally established.
- Do not encode essential interaction only in hover or pointer motion. Touch and keyboard paths must remain complete.
- Keep imports, files, and component names aligned with the current domain structure.
- Remove code made obsolete by the approved change, but do not conduct unrelated cleanup. Do not leave commented-out alternatives, duplicate assets, or dead components.
- Never change `package.json`, the lockfile, Next.js configuration, or dependency graph without explicit approval.

## Validation

For implementation work, run relevant lint/type validation and a production build. Verify representative routes and interactions in a browser. Check the console for runtime and hydration errors. Report checks that could not be run.
