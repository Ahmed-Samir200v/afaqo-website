# Homepage Performance Baseline Audit

Date: 2026-10-29  
Scope: `/` on the production-exported Next.js site.

## Method and limitation

Lighthouse 13.6.0 was run locally against the static Next export with its default mobile throttling and desktop preset. The baseline used commit `d10e820`; the optimized build used this branch. Field data and INP at the 75th percentile were not available, so no field Core Web Vitals are claimed.

## Architecture discovered

| Area | Evidence |
| --- | --- |
| Framework | Next.js 16.4.2, React 19.3, App Router, static export |
| Hosting | GitHub Pages workflow exporting `out/` |
| Styling | CSS Modules plus component-scoped inline styles and global CSS |
| Motion | GSAP + ScrollTrigger; a custom WebGL `MoltenMetal` canvas; Spline loaded only when its final CTA enters the viewport |
| Image delivery | `next/image` with `images.unoptimized: true`, so original public assets are served by the static host |
| Fonts | locally bundled through `next/font/local` |

## Confirmed baseline bottlenecks

| Priority | Finding | Evidence | Risk |
| --- | --- | --- |
| High | Non-LCP images were marked `priority` across Selected Work, Services, Industries and the mid-page CTA. | Five homepage modules contained priority directives beyond the hero. | Low |
| High | Services and Industries issued manual `new Image()` preloads for every carousel image. | `H04-Services.tsx` and `H05-Industries.tsx`. | Low |
| High | The LCP hero is a 2,009,392-byte JPG and static export disables Next image transformations. | `public/images/hero/afaqo-hero-desktop.jpg`. | Medium |
| Medium | A custom WebGL canvas began at homepage startup alongside GSAP hero choreography. | `H01-Hero.tsx` statically imported `MoltenMetal.tsx`. | Low |
| Medium | Homepage bundles use multiple client components with individual ScrollTrigger registrations. | Home sections H01, H02, H03, H05, H06, H09 and the CTA. | Medium |
| Medium | Several homepage imagery files exceed 1 MB; responsive compression is limited by static-host delivery. | Asset inventory under `public/images`. | Medium |

## Baseline SEO observations

- Homepage had a unique title and description, crawlable routes, robots, and sitemap.
- The homepage lacked a canonical URL, Twitter card data, and Organization/WebSite structured data.
- `metadataBase` depended on an environment variable, causing the production build to warn when it was unset.

## Measured Lighthouse baseline

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 54 | 65 |
| Accessibility | 95 | 92 |
| Best Practices | 92 | 92 |
| SEO | 100 | 100 |
| FCP | 2.3s | 0.5s |
| LCP | 2.3s | 11.5s |
| TBT | 123,150ms | 30ms |
| CLS | 0.079 | 0 |
| Speed Index | 41.3s | 8.2s |
| Time to Interactive | 232.6s | 12.0s |
| Requests | 35 | 59 |
| Transfer size | 17,610KiB | 17,791KiB |

The unusually high mobile blocking result was reproduced before the mobile WebGL guard was added. It confirms that the decorative canvas was a material mobile main-thread cost.

## Baseline build evidence

- Production build completed successfully before changes on the same host.
- Browser console inspection returned no errors on the static homepage.

