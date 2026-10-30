"use client";

import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from "react";
import { optimizedImages } from "@/lib/optimized-image-manifest";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  preload?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  style?: CSSProperties;
};

const set = (variants: { src: string; width: number }[]) => variants.map(({ src, width }) => `${src} ${width}w`).join(", ");

const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
  { src, alt, fill = false, preload = false, priority = false, sizes, style, className, loading, fetchPriority, width, height, quality, ...props },
  ref,
) {
  // Kept for a compatible migration path from next/image. The static pipeline sets encoding quality.
  void quality;
  const record = optimizedImages[src];
  const critical = preload || priority || fetchPriority === "high";
  const imageStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : { height: "auto", ...style };
  // eslint-disable-next-line @next/next/no-img-element -- static export uses generated AVIF/WebP sources rather than a runtime image API.
  const image = (
    <img
      {...props}
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      width={fill ? undefined : width ?? record?.width}
      height={fill ? undefined : height ?? record?.height}
      sizes={sizes}
      loading={critical ? "eager" : loading ?? "lazy"}
      fetchPriority={critical ? "high" : fetchPriority ?? "auto"}
      decoding="async"
      style={imageStyle}
    />
  );
  if (!record?.variants.avif.length || !record?.variants.webp.length) return image;
  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={set(record.variants.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={set(record.variants.webp)} sizes={sizes} />
      {image}
    </picture>
  );
});

export default ResponsiveImage;
