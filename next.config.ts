import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // Allow all images temporarily
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
