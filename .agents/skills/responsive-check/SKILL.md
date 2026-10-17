---
name: responsive-check
description: Inspects AFAQO responsive layout, interaction, and motion across representative viewports and input types. Use for responsive QA; inspection-only unless fixes are explicitly approved.
---

# Responsive Check

## Default mode

Inspection only. Do not modify files unless the human explicitly approves responsive implementation scope.

## Procedure

1. Identify the route, sections, expected behavior, existing breakpoints, and fluid sizing rules.
2. Test representative widths near 320, 375, 640, 768, 900, 1024, 1080, and 1440 pixels, plus a wide desktop where relevant. Check immediately below and above affected breakpoints.
3. Test short and tall viewports, portrait and landscape where relevant, browser zoom, and long or translated content risks.
4. Verify no unintended horizontal overflow, clipping, overlap, unreadable lines, collapsed controls, or unsafe fixed/pinned regions.
5. Verify navigation, calls to action, focus order, touch targets, hover-independent behavior, images, Spline/canvas fallbacks, and content order.
6. Verify animation and ScrollTrigger behavior after resizing and orientation change, including reduced motion and coarse-pointer/touch conditions.
7. Check the browser console for errors and hydration warnings.

Report each issue with viewport, reproduction steps, evidence, severity, and affected file. Do not install packages, delete files, perform broad refactors, commit, or deploy unless explicitly requested.
