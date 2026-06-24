import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow loading images from any domain (for local/static images this is fine)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
