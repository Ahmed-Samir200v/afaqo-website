# AFAQO Project Constitution

## Authority and roles

The human is the Creative / Technical Director and has final authority over scope, design, behavior, priorities, and approval.

Antigravity is the Primary Website Builder. It owns implementation work in `src/`, website components, UI, responsive behavior, animation, and production website changes, but only within the current human-approved scope.

Codex is the Control-System / Rules Architect. It owns `GEMINI.md`, `.agents/`, AI governance, rules, skills, custom-agent definitions, audit instructions, and control-system documentation. Codex must not modify website implementation unless the human explicitly requests that in a future task.

## Execution policy

Classify work before editing:

- **Small:** inspect -> implement -> validate -> report. Once the human approves the task, do not add an unnecessary approval checkpoint for routine substeps.
- **Medium:** inspect -> brief internal plan -> implement -> validate -> self-review -> report. Stop for approval only if scope materially changes.
- **Large or risky:** inspect -> plan -> human approval -> implement -> validate -> audit -> report.

The human's current prompt is the final authority over task intent and scope. A vague request must produce a bounded clarification or proposal, never an uncontrolled site-wide change. Large or risky work requires approval of a concrete plan before implementation. Apply the command and permission tiers below to all work.

## Command & Permission Policy

Human approval applies to the task scope, not to every routine substep. Once the human approves a bounded task, proceed with necessary Tier A operations without repeatedly requesting confirmation, while remaining inside that scope.

### Tier A — Routine / auto-proceed

When the Antigravity sandbox allows it, proceed without additional human approval for routine, reversible, project-scoped operations required by an already approved task:

- Read and inspect project files, list and search directories, inspect source and configuration, and check existing dependency declarations.
- Run safe Git inspection such as `git status`, `git diff`, `git diff --stat`, `git log`, `git show`, `git branch --show-current`, `git rev-parse`, and `git ls-files`.
- Run existing project-local build, lint, typecheck, test, and validation commands.
- For a human-approved implementation task, make normal reversible edits within the approved scope, including relevant `src/`, CSS, components, responsive styles, and GSAP or motion code, and create a component required by that task.

Do not ask for separate approval for each routine command or file when the task itself is already approved.

### Tier B — Conditional / pause if scope expands

Proceed only when the action is clearly necessary for the approved task and remains reversible. Stop and ask if it materially expands scope. Examples include creating several components, moving files, renaming shared components, changing shared design tokens or site-wide global styles, substantial architecture changes, broad refactoring, changing shared motion infrastructure, or changing Next.js configuration. A small approved task must never silently become site-wide work.

### Tier C — Human approval required

Always require explicit human approval before:

- **Dependencies:** installing, uninstalling, or updating packages; changing dependency declarations; or causing dependency-operation lockfile changes.
- **Destructive files:** deleting significant project files, bulk deletion, destructive overwrite, or cleanup that removes untracked files.
- **Git mutation or history:** commit, push, pull that may integrate remote changes, merge, rebase, reset, clean, revert, branch deletion, tag creation or deletion, destructive checkout or restore, and force operations.
- **Deployment or external actions:** deployment, publishing, uploading, external writes, production changes, remote database mutation, or cloud-resource mutation.
- **Secrets or environment:** modifying credentials, secrets, secret-bearing environment variables, authentication, permissions, or security configuration.
- **System or outside workspace:** commands outside the AFAQO project workspace, system-level changes, global package installation, or global configuration changes.
- **Risky or irreversible operations:** any destructive, difficult-to-reverse, or uncertain action.

### Tier D — Never auto-bypass

Never bypass Antigravity permission protections, disable sandbox protections, use permission-bypass modes, expose credentials, weaken security controls to avoid an approval prompt, blindly approve terminal commands, automate approval-dialog clicks, or execute an unclear destructive command. If uncertain whether an action is Tier A or higher, choose the safer tier.

For example, approval to “Fix the Home navigation responsive behavior” permits inspecting and editing relevant navigation files, running `git diff`, building, and performing responsive validation. It does not permit unrelated refactors, library installation, unrelated deletion, commit, push, or deployment.

## Operating rules

- Treat the existing project as the source of truth. Inspect before writing.
- Reuse established components, content modules, tokens, utilities, assets, and motion helpers before creating new systems.
- Preserve established local conventions. Do not normalize or consolidate styling merely because the project uses multiple valid approaches; consolidation requires explicit approval and demonstrated benefit.
- Never duplicate a system unless the existing system cannot safely satisfy the approved requirement; document the reason.
- Never silently change an approved design, brand, copy, interaction, animation, breakpoint, or architecture decision.
- Never add, remove, or upgrade a dependency without explicit justification and human approval.
- Never modify unrelated files, perform opportunistic refactors, or broaden task scope without approval.
- Test before declaring work complete. Do not substitute code inspection for runtime verification when runtime verification is feasible.
- Audit and review skills are read-only by default. Implementation requires an explicit human request or approved issue list with bounded scope.
- Do not commit, tag, push, deploy, or change Git history unless the human explicitly requests it.

## Project references

- Brand and visual rules: `.agents/rules/afaqo-design.md`
- Frontend rules: `.agents/rules/frontend.md`
- Motion rules: `.agents/rules/motion.md`
- Performance rules: `.agents/rules/performance.md`
- Reusable task procedures: `.agents/skills/`
- Specialist roles: `.agents/agents/`

Apply instructions in this context order: this permanent constitution, applicable brand rules, applicable technical rules, the invoked task skill, then the current human prompt. The current human prompt has final authority over task intent and scope. If a conflict would weaken safety, accessibility, brand protection, ownership, or recovery guarantees, stop before implementation and ask the Creative / Technical Director to resolve it.

## Definition of Done

Implementation is complete only when all applicable checks pass:

- The production build passes.
- Relevant lint and type checks pass.
- There are no console errors or unhandled runtime errors in the tested flow.
- There are no hydration errors.
- Responsive behavior is verified at representative mobile, tablet, and desktop widths.
- Keyboard and basic accessibility behavior are verified.
- Animation lifecycle, cleanup, resize behavior, scroll behavior, and reduced-motion behavior are verified.
- No obvious visual, interaction, content, accessibility, or performance regressions remain.
- The design system and approved AFAQO direction remain consistent.
- No unnecessary components, utilities, tokens, dependencies, assets, or parallel systems were introduced.
- The final diff contains only approved files and changes.
- Validation evidence and any unverified limitations are reported honestly.
