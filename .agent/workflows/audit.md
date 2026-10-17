# Workflow: Read-Only Website Audit

## Purpose

Produce an evidence-based issue list for human review. This workflow is strictly read-only.

## Prohibited actions

Do not create, modify, move, rename, delete, format, stage, commit, install, upgrade, build with write-producing fixes, or change configuration. Do not apply fixes while auditing. If a necessary inspection would modify tracked or untracked project state, stop and report the constraint.

## Procedure

1. Confirm repository path, branch, HEAD, and working-tree state. Preserve existing user changes.
2. Read `GEMINI.md`, `.agent/rules/`, repository instructions, package metadata, and relevant installed framework documentation.
3. Map routes, layouts, components, content sources, styling systems, assets, client boundaries, motion systems, and external runtime dependencies.
4. Inspect representative desktop, tablet, and mobile behavior without changing files.
5. Check semantics, keyboard access, focus, contrast, alternative text, reduced motion, hydration/console output, loading behavior, and failure states.
6. Check motion lifecycle, ScrollTrigger ownership, listeners, observers, canvases, Spline fallbacks, image behavior, and likely Core Web Vitals risks.
7. Report findings with severity, evidence, affected files/locations, user impact, confidence, and the smallest plausible remediation.
8. Separate confirmed defects from risks, design questions, and unverified observations.

## Output

Return a prioritized issue list for approval. Include checks performed and limitations. Make no modifications and do not create an implementation branch or commit.
