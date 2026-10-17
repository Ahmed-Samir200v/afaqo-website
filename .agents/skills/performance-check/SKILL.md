---
name: performance-check
description: Measures and reports AFAQO production performance, Core Web Vitals, loading, JavaScript, image, animation, Spline, and WebGL risks. Measurement-only unless optimization is explicitly approved.
---

# Performance Check

## Default mode

Measure and report. Do not optimize or modify files without explicit human approval.

## Procedure

1. Record branch, commit, route, device/viewport, network and CPU profile, cache state, and whether the run is local or deployed.
2. Use a production build when authorized and feasible. Confirm the build and page load without console or hydration errors.
3. Measure LCP, INP, and CLS where tooling permits; inspect the LCP element and major long tasks.
4. Review initial JavaScript, Client Component boundaries, image requests and dimensions, font requests, caching, and below-the-fold loading.
5. Inspect GSAP/ScrollTrigger counts and cleanup, continuous RAF work, event frequency, layout reads/writes, WebGL/canvas activity, Spline loading, and offscreen behavior.
6. Test a mobile-class profile, reduced motion, touch/coarse pointer, and failure or delayed loading of decorative 3D media.
7. For approved implementation, compare before and after measurements across enough runs to avoid treating noise as fact.

Report measurements, evidence, suspected cause, user impact, confidence, and recommended next action. Do not install packages, delete files, perform broad refactors, commit, or deploy unless explicitly requested.
