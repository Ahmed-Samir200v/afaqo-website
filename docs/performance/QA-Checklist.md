# Image pipeline QA checklist

- [x] Source masters preserved and unmodified.
- [x] AVIF, WebP, and original fallback generated for every tracked raster asset.
- [x] `ResponsiveImage` retains existing layout props and defaults noncritical images to lazy loading.
- [x] Homepage LCP hero retains eager/high-priority delivery.
- [x] Browser verification at desktop and 390px: AVIF selected, no broken images, no horizontal overflow.
- [x] Browser route check: `/`, `/work/`, `/services/`, `/industries/`, `/technology-ai/`, `/simulxr/`, and `/work/industrial-training-experience/` reported no broken images or overflow.
- [x] Equivalent Lighthouse mobile/desktop results recorded in `Image-Optimization-Report.md`.
- [x] TypeScript and production build run after integration.
- [x] ESLint run; only pre-existing React state-in-effect warnings remain.
