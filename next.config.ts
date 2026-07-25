import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  // NOTE: /bewerbung → /de 308 redirect is added in the cleanup phase,
  // after the /bewerbung route directory is removed (else it shadows the live page).
};

export default withNextIntl(nextConfig);
