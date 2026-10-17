---
name: implement
description: Implements a bounded, explicitly approved AFAQO website change and validates it. Use only when the human has requested implementation or approved a specific issue list.
---

# Controlled Implementation

## Entry requirement

Do not modify code without an explicit human implementation request or approved issue list. Each item must have a clear outcome and bounded scope. If approval or intent is ambiguous, stop before writing.

## Procedure

1. Verify the branch, HEAD, working tree, recovery point, and applicable instructions.
2. Restate the approved issues, acceptance criteria, affected files, dependencies, and validation plan.
3. Inspect the existing implementation and reuse established components, tokens, utilities, content modules, and motion patterns.
4. Implement the smallest coherent solution. Do not fix adjacent findings or refactor unrelated code.
5. Do not change dependencies, configuration, brand assets, approved copy, or architecture unless specifically approved.
6. Validate types and lint as relevant, then run the production build.
7. Test affected behavior at representative mobile, tablet, and desktop widths, including keyboard, reduced motion, resize, and relevant touch/pointer paths.
8. Check the console for runtime and hydration errors. Review the final diff for scope, secrets, generated files, duplication, and regressions.
9. Report changed files, behavior, validation evidence, and remaining limitations.

Do not install packages, delete files, perform broad refactors, commit, tag, push, or deploy unless the human explicitly requests the exact action. If the approved solution requires materially broader scope, stop and return evidence and a revised proposal.
