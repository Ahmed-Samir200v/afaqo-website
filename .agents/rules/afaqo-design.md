---
trigger: always_on
description: "Permanent AFAQO brand, visual-system, typography, palette, and asset-protection rules."
---

# AFAQO Design Rules

## Brand foundation

- Brand: **AFAQO**
- Positioning: **Creative Technology Company**
- Core statement: **We turn complex ideas into immersive experiences.**
- Location statement: **CAIRO — WORKING GLOBALLY.**
- Visual direction: creative corporate, editorial, immersive, technically precise, premium, and generous with negative space.

The current implementation expresses the positioning as `CREATIVE TECHNOLOGY / IMMERSIVE EXPERIENCES`. Its hero body says that AFAQO transforms ideas, spaces, and complex challenges into immersive digital experiences. Preserve this live wording unless copy changes are explicitly approved; the core statement above is strategic direction, not permission to replace current copy.

## Verified implementation values

The values below were verified in `src/app/globals.css` and `src/app/layout.tsx` on the PRE-RAPS baseline:

- Deep Navy: `#050D24`
- Electric Blue: `#0866FF`
- Electric Cyan: `#00D1FF`
- Soft Ivory: `#F9F8F4` — implemented light brand surface
- Supporting White: `#FFFFFF`
- Display type: Manrope, weights 300-600
- Body and UI type: Inter, weights 400-500
- Arabic type: IBM Plex Sans Arabic, weights 400-600

Fonts are loaded with `next/font/google` and exposed through CSS variables. Reuse those variables. Do not add a second font-loading system.

The global token layer also defines dark and light surfaces, text and border colors, fluid type sizes, page gutters, section spacing, radii, durations, easings, and content widths. Use those tokens before introducing local constants. Existing section-specific values and styling approaches may remain. Do not normalize or consolidate them merely because multiple approaches exist; consolidation requires explicit approval and demonstrated benefit.

## Composition and visual behavior

- Preserve the alternating Deep Navy and Soft Ivory editorial rhythm.
- Favor clear hierarchy, large display typography, disciplined grids, precise alignment, and purposeful negative space.
- Electric Blue is the primary accent. Electric Cyan is a restrained secondary signal.
- Preserve the established fluid sizing approach with `clamp()` and existing responsive thresholds unless a change is approved and tested.
- Keep interaction and motion premium, controlled, and subordinate to content.
- Do not add decoration that competes with brand assets, content hierarchy, or immersive media.
- New UI must work in the existing light and dark contexts and retain visible focus treatment.

## Brand asset protection

Files under `public/brand/` and approved supplied project imagery are source assets. Never redraw, regenerate, retype, distort, recolor, crop destructively, trace, or approximate the AFAQO logo or brand marks. Preserve aspect ratio and clear space. Use the correct light or dark asset for the background. Any asset replacement or transformation requires explicit human approval.

## Known implementation differences

- The implemented light brand surface is Soft Ivory `#F9F8F4`, with Supporting White `#FFFFFF` used where established.
- The current hero uses `CREATIVE TECHNOLOGY / IMMERSIVE EXPERIENCES`; it does not present the exact phrase “Creative Technology Company.”
- The exact core statement is not current page copy; its meaning is represented by the longer hero body.
- The styling system is hybrid: Tailwind CSS v4 is loaded, while much of the site uses global CSS, CSS custom properties, inline styles, embedded media queries, and one CSS module. Do not assume utility classes are the sole styling convention.
