# Workflow: Controlled Implementation

## Entry requirement

Do not modify code without a human-approved issue list or an equally explicit implementation request. Each approved item must have a clear outcome and bounded scope. If approval or intent is ambiguous, stop before writing.

## Procedure

1. Verify the branch, HEAD, working tree, recovery point, and applicable instructions.
2. Restate the approved issues, acceptance criteria, affected files, dependencies, and validation plan.
3. Inspect the existing implementation and reuse established components, tokens, utilities, content modules, and motion patterns.
4. Implement the smallest coherent solution. Do not fix adjacent audit findings or refactor unrelated code.
5. Do not change dependencies, configuration, brand assets, approved copy, or architecture unless specifically approved.
6. Validate types/lint as relevant, then run the production build.
7. Test the affected behavior at representative mobile, tablet, and desktop widths, including keyboard, reduced motion, resize, and relevant touch/pointer paths.
8. Check the console for runtime and hydration errors. Review the final diff for scope, secrets, generated files, duplication, and accidental regressions.
9. Report changed files, behavior, validation evidence, and remaining limitations. Do not commit or deploy unless explicitly requested.

If implementation reveals that the approved solution would require materially broader scope, stop and return the evidence and revised proposal for approval.
