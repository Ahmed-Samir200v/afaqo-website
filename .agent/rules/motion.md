# Motion Rules

## Motion language

Primary authored motion uses GSAP `3.15.0` with ScrollTrigger. The desired character is smooth, premium, controlled, and purposeful. Motion must clarify hierarchy, progression, spatial relationships, or feedback; it must never become visual noise.

The baseline also includes CSS transitions, pointer-driven effects, a custom WebGL canvas effect, and Spline scenes. Preserve each technology's current responsibility unless an approved implementation requires a change.

The project currently uses valid direct GSAP patterns, including `gsap.context()`, `gsap.matchMedia()`, and explicit cleanup. Evaluate lifecycle correctness from behavior, scope, cleanup, and implementation quality. Do not require migration to `@gsap/react` or `useGSAP`; such a migration would need an independently approved reason and demonstrated benefit.

## GSAP and ScrollTrigger

- Register browser-only plugins in Client Components and guard browser-specific execution.
- Scope component animation with `gsap.context()` and a stable root ref.
- Revert the context during effect cleanup. Explicitly clean up triggers, timelines, match-media contexts, observers, listeners, RAF loops, timers, and mutable inline state not owned by the context.
- Keep ScrollTrigger instances local to their owning section. Never call broad global cleanup such as killing every trigger.
- Use `gsap.matchMedia()` for materially different responsive timelines and ensure the component cleanup releases it through the owning context or explicit revert.
- Refresh ScrollTrigger only when layout-dependent assets or measurements actually change; avoid refresh loops and scroll-handler layout thrashing.
- Avoid scroll traps and gratuitous pinning. Pinned sequences must remain understandable, bounded, and usable with keyboard, touch, zoom, and short viewports.
- Animate `transform` and `opacity` where possible. Avoid continuous animation of layout, paint-heavy filters, large shadows, or properties that cause reflow.
- Use stable refs and scoped selectors. Do not query or mutate unrelated sections.

## Reduced motion and alternate input

- Use the existing `src/lib/motion-preference.ts` behavior as the canonical runtime preference layer.
- Honor `prefers-reduced-motion: reduce` and the project's supported verification overrides. Do not remove or bypass either path.
- Reduced motion must show complete content immediately or through a low-motion alternative; it must not merely pause content in an invisible or incomplete state.
- Do not create large translations, scrubbed sequences, parallax, pointer trails, or autoplay 3D motion in reduced-motion mode.
- Pointer effects must be progressive enhancement. Disable or simplify them for coarse pointers, touch-first devices, reduced motion, hidden tabs, and constrained devices when appropriate.
- Every hover interaction needs an equivalent keyboard/touch outcome when it carries information or action.

## Parallax, transitions, and immersive effects

- Keep parallax depth restrained and avoid conflicting layers or motion sickness triggers.
- Section transitions must preserve reading order and never delay access to content.
- Pause canvas/WebGL work when offscreen or when the page is hidden where feasible.
- Dispose observers, listeners, RAF loops, WebGL resources, and Spline/runtime references when no longer needed.
- Preserve no-layout-shift placeholders for lazy immersive media.
- Test animation after resize, route transitions, repeated mounting, fast scrolling, backward scrolling, and reduced-motion changes.

Do not change existing animation merely to conform stylistically. Record issues through the audit workflow and wait for an approved implementation list.
