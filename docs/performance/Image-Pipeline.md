# AFAQO image pipeline

This static-export site cannot use the Next.js runtime image optimization API. It ships responsive, pre-generated files instead.

## Add an approved image

1. Place the approved master in `public/images/`; do not overwrite an existing master.
2. Use the original path in the component as before.
3. Run `npm run optimize-images`.
4. Commit the generated files in `public/images/optimized/`, the manifest, and the inventory update.
5. Use `ResponsiveImage` for raster assets. It selects AVIF first, then WebP, then the original source as a browser fallback.

The script only processes Git-tracked raster assets and never deletes or overwrites a source master. It uses source modification times to skip unchanged derivatives. SVGs remain SVGs.

## Delivery rules

- `preload`/`priority` is reserved for a verified LCP image only.
- All other images remain lazy by default.
- Always pass a precise `sizes` value for `fill` images.
- Preserve the approved container aspect ratio and `objectFit`/`objectPosition`; responsive files are resized only, never cropped.
- Do not point social metadata to responsive display assets. Keep a separately approved 1200 × 630 social card when one is available.
