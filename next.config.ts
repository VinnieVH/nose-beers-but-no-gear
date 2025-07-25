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
        hostname: 'wow.zamimg.com',
        port: '',
        pathname: '/uploads/screenshots/normal/**',
      },
      {
        protocol: 'https',
        hostname: 'conquestcapped.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assetsio.gnwcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c4.wallpaperflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'render.worldofwarcraft.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
