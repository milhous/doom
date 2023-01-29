import webpack from './webpack/index.js';

// nextJs配置
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['public.bnbstatic.com'],
  },
};

const config = {
  ...nextConfig,
  webpack,
};

export default config;
