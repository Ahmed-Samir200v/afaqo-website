# Homepage Optimization QA Checklist

Date: 2026-10-29

## Completed

- [x] Production build completed after the performance and SEO changes.
- [x] TypeScript completed without errors.
- [x] Targeted ESLint completed without errors.
- [x] Full ESLint completed with four pre-existing warnings and no errors.
- [x] Generated homepage has a canonical URL, social metadata, and Organization/WebSite JSON-LD.
- [x] Generated homepage now has one critical hero image preload; below-the-fold images are lazy loaded.
- [x] Homepage browser console had no errors after reload.
- [x] Mobile rendering at 390×844 had no horizontal overflow and no console errors.
- [x] Lighthouse mobile and desktop measurements were taken before and after optimization using equivalent local static-export runs.
- [x] Existing motion preferences remain respected; the decorative WebGL layer is skipped for reduced motion.
- [x] Existing homepage content, layout, navigation, and animation choreography were retained.

## Browser checks performed

- [x] Homepage loaded from the production static export at `http://localhost:3001/`.
- [x] Hero, page title, canonical, lazy images, JSON-LD, and runtime console verified.

## Remaining validation recommended before release

- [ ] Repeat Lighthouse in CI or PageSpeed Insights against the deployed domain to include GitHub Pages network behavior.
- [ ] Validate touch interactions, dropdowns, and all home-section animations at 390px, 768px, 1024px, 1440px, and 1920px.
- [ ] Use real-user monitoring if available to confirm LCP and INP at the 75th percentile.

