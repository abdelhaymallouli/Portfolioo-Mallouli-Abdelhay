import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/* Points the plugin at the request config; without it, `getRequestConfig`
   is never loaded and every server component renders the default locale. */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [380, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default withNextIntl(nextConfig);
