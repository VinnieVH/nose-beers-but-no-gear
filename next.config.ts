import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wow.zamimg.com',
        port: '',
        pathname: '/images/wow/icons/large/**',
      },
      {
        protocol: 'https',
        hostname: 'assetsio.gnwcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
