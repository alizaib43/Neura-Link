import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath should match your repository name
  basePath: '/Neura-Link',
  assetPrefix: '/Neura-Link/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
