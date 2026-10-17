# Workflow: Responsive Check

## Goal

Verify that layout, content, interaction, and motion remain complete and usable across viewport and input conditions.

## Procedure

1. Identify the route, sections, expected behavior, existing breakpoints, and fluid sizing rules.
2. Test representative widths near 320, 375, 640, 768, 900, 1024, 1080, 1440, and a wide desktop where relevant. Check immediately below and above affected breakpoints.
3. Test short and tall viewports, portrait and landscape where relevant, browser zoom, and long/translated content risks.
4. Verify no unintended horizontal overflow, clipping, overlap, unreadable lines, collapsed controls, or unsafe fixed/pinned regions.
5. Verify navigation, calls to action, focus order, touch targets, hover-independent behavior, images, Spline/canvas fallbacks, and content order.
6. Verify animation and ScrollTrigger behavior after resizing and orientation change, including reduced motion and coarse-pointer/touch conditions.
7. Check the browser console for errors and hydration warnings.

Report each issue with viewport, reproduction steps, evidence, severity, and affected file. During an audit, do not modify files. During approved implementation, fix only approved responsive issues and rerun this workflow.
