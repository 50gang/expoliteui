import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [ new URL('https://res.cloudinary.com/dlvfxs9u1/image/upload/**')]
  }
};

export default nextConfig;
