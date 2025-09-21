import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // If you deploy under a sub-path (e.g., /Portfolio), you can set NEXT_PUBLIC_BASE_PATH
  // in the environment to ensure runtime asset URLs are prefixed accordingly.
  // Alternatively, you can set next.js basePath here permanently.
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
  },
};

export default nextConfig;
