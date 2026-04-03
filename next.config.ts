import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gegify.com",
      },
      {
        protocol: "https",
        hostname: "adsaify.com",
      },
    ],
  },
};

export default nextConfig;
