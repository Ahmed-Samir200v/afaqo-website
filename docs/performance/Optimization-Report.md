# Homepage Performance & Technical SEO Optimization Report

Date: 2026-10-29  
Branch: `optimization/homepage-performance-seo`

## Implemented improvements

1. Kept the hero image as the only intentionally preloaded homepage image. Removed `priority` directives from selected work, services, industries, and the mid-page CTA.
2. Removed manual image preloading from the Services and Industries components. Their images retain normal browser lazy-loading and load when needed.
3. Split the custom MoltenMetal WebGL module from the initial homepage JavaScript path. It starts after the browser is idle, while retaining the existing visual treatment and reduced-motion behavior.
4. Added a stable metadata base, homepage canonical URL, Open Graph/Twitter metadata, and minimal Organization/WebSite JSON-LD.
5. Retained the existing robots and sitemap implementation.

## Measured Lighthouse comparison

| Metric | Mobile baseline | Mobile optimized | Desktop baseline | Desktop optimized |
| --- | ---: | ---: | ---: | ---: |
| Performance | 54 | 86 | 65 | 70 |
| Accessibility | 95 | 95 | 92 | 92 |
| Best Practices | 92 | 92 | 92 | 92 |
| SEO | 100 | 100 | 100 | 100 |
| FCP | 2.3s | 2.3s | 0.5s | 0.5s |
| LCP | 2.3s | 2.3s | 11.5s | 4.7s |
| TBT | 123,150ms | 100ms | 30ms | 30ms |
| CLS | 0.079 | 0.079 | 0 | 0 |
| Speed Index | 41.3s | 7.4s | 8.2s | 3.1s |
| Time to Interactive | 232.6s | 23.8s | 12.0s | 4.8s |
| Requests | 35 | 28 | 59 | 54 |
| Transfer size | 17,610KiB | 8,401KiB | 17,791KiB | 8,721KiB |

The mobile test retains the original hero image, so the unchanged 2.3s LCP is expected. The desktop LCP, request count, transfer size, and visual-completion metrics all improved. Lighthouse results vary between runs; the performance changes are also verified directly in generated HTML.

## Implementation comparison

| Check | Before | After |
| --- | --- | --- |
| Homepage modules using critical `priority` image loading | H01, H02, H04, H05, mid-page CTA | H01 hero only |
| Manual noncritical carousel preloads | Services: 4 images; Industries: 4 images | None |
| Generated noncritical homepage images | Included eager candidates from the above modules | 26 images marked `loading="lazy"` |
| Critical image preloads in generated HTML | Hero plus noncritical eager candidates | One image preload: the hero (logo preload remains intentional) |
| Hero WebGL loading | Included in startup client path | Deferred through a client-side dynamic import after idle |
| Canonical / JSON-LD | Missing | Present |

## Remaining risks

- The 1.92 MB hero JPG is still the homepage LCP candidate. Static GitHub Pages prevents built-in Next image optimization; serving a visually approved WebP/AVIF derivative is the next highest-impact media task.
- The homepage remains interaction-rich with GSAP and visual carousels. Functional mobile and throttled-device testing should be rerun in a browser capable of performance tracing before release.

