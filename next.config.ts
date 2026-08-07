import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * AVIF first, WebP as the fallback. Order matters: the first format the
     * browser's Accept header matches is the one served.
     *
     * The source screenshots are already WebP (recompressed from full-page
     * PNG captures), so this is a second, request-time pass on top of that.
     * AVIF encodes slower but lands ~20% under WebP, and the result is cached
     * per format, so only the first request for a given size pays for it.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
