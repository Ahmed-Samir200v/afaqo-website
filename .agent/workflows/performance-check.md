# Workflow: Performance Check

## Goal

Measure production behavior and identify evidence-based performance risks without confusing development-mode overhead with production results.

## Procedure

1. Record branch, commit, route, device/viewport, network/CPU profile, cache state, and whether the run is local or deployed.
2. Use a production build. Confirm the build and page load without console or hydration errors.
3. Measure LCP, INP, and CLS where tooling permits; inspect the LCP element and major long tasks.
4. Review initial JavaScript, Client Component boundaries, image requests and dimensions, font requests, caching, and below-the-fold loading.
5. Inspect GSAP/ScrollTrigger counts and cleanup, continuous RAF work, event frequency, layout reads/writes, WebGL/canvas activity, Spline loading, and offscreen behavior.
6. Test a mobile-class profile, reduced motion, a touch/coarse-pointer path, and failure or delayed loading of decorative 3D media.
7. Compare before/after measurements for implementation work. Repeat enough runs to avoid presenting a single noisy result as fact.

Report measurements, evidence, suspected cause, user impact, confidence, and recommended next action. In read-only mode, make no changes. Do not claim an improvement without comparable measurements.
