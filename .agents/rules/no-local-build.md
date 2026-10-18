---
trigger: always_on
description: "Strictly disallows the agent from running local production builds (npm run build, next build). Enforces typecheck, lint, and CI-based build verification."
---

# Local Build Restriction Rule

## Policy: Local builds are strictly disallowed

The agent is strictly prohibited from executing local production build commands on the development machine.

### Disallowed Commands
The agent must **NEVER** run:
- `npm run build`
- `npx next build`
- `next build`
- Any command or script that triggers a local Next.js production build or static export.

### Rationale
- Production builds (`next build`) are resource-intensive, consume excessive CPU, memory, and disk I/O on the local environment, and can lock the `.next` directory.
- The repository has an automated CI/CD pipeline (`.github/workflows/deploy.yml`) that runs `npm run build` and exports static assets in GitHub Actions on push and workflow dispatch.
- Local verification does not require full bundle generation or static HTML export.

### Mandatory Local Validation Alternatives
When validating code changes, the agent must use non-build verification methods:
1. **TypeScript Typecheck:** Run `npx tsc --noEmit` to verify type safety and catch compiler errors without emitting build artifacts.
2. **ESLint:** Run `npm run lint` to verify code quality and rule conformance.
3. **Local Dev Server:** If runtime visual verification is needed, use `npm run dev` with appropriate lifecycle management, never `next build` / `npm run build`.
4. **Static Code Inspection:** Carefully review component structures, props, imports, responsive styles, and diffs.

### Build Verification Delegation
Production build validation is exclusively delegated to the GitHub Actions CI workflow. If build or export errors occur in CI, inspect the workflow logs and address them using static analysis, typechecking, and linting locally.
