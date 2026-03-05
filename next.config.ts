import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Neura-Link',
  assetPrefix: '/Neura-Link/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
