---
name: audit
description: Performs a complete read-only AFAQO website audit and produces an evidence-based issue list for human approval. Use when asked to audit, inspect, review, or identify website problems without fixing them.
---

# Read-Only Website Audit

## Safety boundary

This skill is strictly read-only. Do not create, modify, move, rename, delete, format, stage, commit, install, upgrade, deploy, or change configuration. Do not apply fixes while auditing. If required inspection would alter project state, stop and report the constraint.

## Procedure

1. Confirm repository path, branch, HEAD, and working-tree state. Preserve existing user work.
2. Read `GEMINI.md`, applicable `.agents/rules/`, repository instructions, package metadata, and relevant installed framework documentation.
3. Map routes, layouts, components, content sources, styling systems, assets, client boundaries, motion systems, and external runtime dependencies.
4. Inspect representative desktop, tablet, and mobile behavior without changing files.
5. Check semantics, keyboard access, focus, contrast, alternative text, reduced motion, hydration/console output, loading behavior, and failure states.
6. Check motion lifecycle, ScrollTrigger ownership, listeners, observers, canvases, Spline fallbacks, image behavior, and likely Core Web Vitals risks.
7. Report findings with severity, evidence, affected files/locations, user impact, confidence, and the smallest plausible remediation.
8. Separate confirmed defects from risks, design questions, and unverified observations.

Return a prioritized issue list for human approval, checks performed, and limitations. Do not begin implementation.
