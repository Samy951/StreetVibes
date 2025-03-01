/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    domains: ["sweatscollective.com"],
  },
};

module.exports = nextConfig;
