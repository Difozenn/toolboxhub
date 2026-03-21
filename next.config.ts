import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 301 redirect from old .vercel.app domain to toolboxhub.net
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "toolboxhub.vercel.app",
          },
        ],
        destination: "https://toolboxhub.net/:path*",
        permanent: true,
      },
    ];
  },

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(svg|png|jpg|jpeg|gif|ico|webp|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  experimental: {
    cpus: 4,
  },
};

export default nextConfig;
