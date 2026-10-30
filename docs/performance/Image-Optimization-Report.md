# Image optimization report

## Scope and safeguards

- All 41 Git-tracked raster assets under `public/images` are catalogued and have AVIF/WebP responsive derivatives.
- Source masters remain unchanged. Untracked `public/brand/Branding Book/` files are intentionally excluded.
- SVG logos/icons/graphics remain vector assets.
- Derivatives are resized only; no crop, color, exposure, grading, or aspect-ratio modification is applied.

## Delivery model

`ResponsiveImage` replaces static-export `next/image` delivery throughout the site. It emits a `picture` sequence: AVIF → WebP → original source fallback, carries existing `sizes`, and keeps the current `fill`, object fit, and object position behavior. Only the existing verified hero retains high-priority delivery; below-the-fold media remains lazy.

## Measured asset totals

The authoritative per-file inventory and byte sizes are generated in `Image-Inventory.md`; the machine-readable manifest is `public/images/optimized/image-manifest.json`.

| Metric | Before | After | Reduction |
|---|---:|---:|---:|
| Tracked raster masters | 74,242 KiB | 74,242 KiB | 0% (preserved) |
| Responsive derivative set | — | 34,218 KiB | New delivery layer |
| Homepage transfer, mobile Lighthouse | 8,401 KiB | 3,887 KiB | 53.7% |
| Homepage transfer, desktop Lighthouse | 8,721 KiB | 4,392 KiB | 49.6% |
| Homepage hero delivered at 390 px | 1,962 KiB JPEG | 34.5 KiB AVIF (640w) | 98.2% |
| Homepage hero delivered at wide desktop | 1,962 KiB JPEG | 129.3 KiB AVIF (1440w) | 93.4% |

The pre-existing 1.92 MiB homepage hero now has width-constrained AVIF/WebP candidates. Browser verification selected the 640w AVIF at 390px and the 1440w AVIF at a wide desktop viewport. The original JPEG remains the fallback.

### Equivalent Lighthouse checks

| Profile | Performance | LCP | FCP | CLS | TBT | Speed Index | Requests | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile before image delivery | 86 | 2.3s | 2.3s | 0.079 | 100ms | 7.4s | 28 | 8,401 KiB |
| Mobile after image delivery | 86 | 2.3s | 2.3s | 0.079 | 170ms | 6.4s | 28 | 3,887 KiB |
| Desktop before image delivery | 70 | 4.7s | 0.5s | 0 | 30ms | 3.1s | 54 | 8,721 KiB |
| Desktop after image delivery | 72 | 4.4s | 0.5s | 0 | 0ms | 2.6s | 57 | 4,392 KiB |

The page preserves the earlier WebGL deferral; it was not altered in this work.

## Visual review criteria

The pipeline retains exact source aspect ratios and does not crop. Visual QA checks at 390, 768, 1024, 1440 and 1920 px focus on crop, gradients, lighting, material texture, alpha edges, object position, layout stability, and fallback availability. Any source that displays compression artifacts should be tuned in the script rather than replaced.

## Remaining recommendations

1. Commission a dedicated approved 1200 × 630 Open Graph asset; do not reuse responsive hero derivatives as a social card.
2. Keep cinematic/dark source images at the current AVIF quality 80 and WebP quality 86; increase only a particular asset if review shows banding.
3. Re-run the pipeline whenever an approved master changes and inspect the generated manifest diff.

## Largest remaining delivered candidates

The largest individual responsive candidates are the Industrial Training source, `Image Sequence_001_0000.jpg`, `Project Scope.png`, and the Oil & Gas/Manufacturing imagery. Their largest responsive candidates range from approximately 240–356 KiB; they remain below the delivered 1.92 MiB hero master and are lazy-loaded outside the initial viewport.
