import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for tool pages with ISR
  // Each tool page revalidates every 24 hours
  experimental: {
    // Increase static generation concurrency for 500+ pages
    cpus: 4,
  },
};

export default nextConfig;
