---
name: final-check
description: Runs the final AFAQO production-readiness gate after approved implementation, covering diff scope, build, runtime, responsive behavior, accessibility, motion, and regressions.
---

# Final Production Readiness Check

## Preconditions

The approved implementation is complete and its intended scope is known. This is a verification gate, not permission to fix unrelated findings.

## Checklist

1. Confirm the correct branch and review `git status`, the full diff, and changed-file list. Reject unrelated changes, generated artifacts, secrets, or unexpected dependency/configuration edits.
2. Run applicable lint and type checks, then the production build. Record exact outcomes.
3. Test the affected route and primary flow at representative mobile, tablet, and desktop widths.
4. Verify semantic structure, keyboard operation, focus visibility/order, accessible names, alternative text, contrast, and touch targets.
5. Verify normal and reduced-motion modes, ScrollTrigger lifecycle, cleanup, resize/orientation behavior, repeated mounting/navigation, and pointer/touch fallbacks.
6. Check browser console and network output for runtime errors, hydration errors, failed resources, and obvious loading regressions.
7. Confirm images, fonts, Spline/WebGL fallbacks, layout stability, primary content visibility, and acceptable interaction responsiveness.
8. Confirm the AFAQO design system, approved direction, copy, assets, and section hierarchy remain consistent.
9. Confirm no unnecessary duplication or dead code was introduced.
10. State whether every Definition of Done item in `GEMINI.md` passed, failed, or could not be verified.

Return a production-readiness verdict with evidence, changed files, checks performed, failures, unverified items, and remaining risks. Do not install packages, delete files, perform broad refactors, commit, tag, push, or deploy unless explicitly requested.
