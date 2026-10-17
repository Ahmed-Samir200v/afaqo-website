---
trigger: model_decision
description: "Apply for performance, Core Web Vitals, images, fonts, client JavaScript, loading, Spline, WebGL/canvas, or production-readiness work."
---

# Performance Rules

## Performance priorities

Protect Core Web Vitals: LCP, INP, and CLS. Treat mobile hardware and constrained networks as first-class conditions. Establish a measurement baseline before optimization and verify after changes.

## Images and assets

- Use `next/image` with correct intrinsic sizing or `fill`, accurate `sizes`, and appropriate compression.
- Prioritize only the true LCP image. Lazy-load below-the-fold imagery and immersive media.
- Do not ship duplicate encodings or oversized source assets without a documented need.
- Preserve aspect-ratio space and stable placeholders to prevent layout shift.
- Keep brand assets exact; optimization must not alter their approved appearance.

## Fonts

- Continue using `next/font` with the existing Manrope, Inter, and IBM Plex Sans Arabic variables.
- Load only necessary weights and subsets. Avoid adding external font requests or duplicate font families.
- Preserve fallbacks and dimensions that minimize text layout shift.

## JavaScript and Client Components

- Keep Server Components as the default and minimize the surface area of `"use client"`.
- Do not ship static content, large data, or libraries to the client unnecessarily.
- Lazy-load expensive below-the-fold interactions with a stable fallback when it improves initial load without harming usability.
- Avoid redundant listeners, forced synchronous layout, frequent React state updates on scroll/pointer events, and unbounded allocations.
- Use passive listeners where appropriate and throttle work to animation frames when needed.

## GSAP, WebGL, Spline, and 3D

- Scope and clean up all GSAP/ScrollTrigger work. Prefer transform and opacity.
- Pause or reduce work offscreen, on hidden pages, with reduced motion, and on constrained/touch devices when appropriate.
- Lazy-load Spline scenes and preserve fixed-size, visually compatible fallbacks. Do not make a remote 3D scene a prerequisite for primary content or navigation.
- Three.js is not part of the current AFAQO stack. It is an optional future technology requiring explicit justification and approval, including bundle-impact analysis and a fallback plan.
- The current `MoltenMetal` effect is custom WebGL/canvas code. Preserve context cleanup, observer cleanup, DPR caps, resize discipline, and graceful failure.
- Limit texture resolution, draw calls, shader complexity, DPR, and simultaneous animated canvases. Test thermal and battery behavior on mobile-class hardware.

## Layout and loading

- Reserve space for images, canvases, Spline, and dynamic content.
- Avoid layout-affecting animation and late font/style injection.
- Keep critical content renderable without waiting for decorative scripts or 3D scenes.
- Verify that lazy loading does not create content jumps, late focus targets, or inaccessible placeholders.
- Do not optimize by removing accessibility, reducing content correctness, or degrading approved visual quality without human approval.

## Verification

For approved performance work, compare production builds and browser measurements before and after. Record tested route, viewport, device/profile, cache state, metrics, bundle changes, and limitations. Performance claims require evidence.
