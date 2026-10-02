/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The site uses plain <img> tags, so the Image Optimization API is never
    // needed. Turning it off removes the /_next/image endpoint entirely.
    unoptimized: true,
  },
};

module.exports = nextConfig;
