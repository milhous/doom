import webpack from './webpack/index.js';

// nextJs配置
const nextConfig = {
  env: {
    alchemyKey: process.env.ALCHEMY_KEY,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['public.bnbstatic.com'],
    formats: ['image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const config = {
  ...nextConfig,
  webpack,
};

export default config;
