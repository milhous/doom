import path from 'path';
import fs from 'fs-extra';

// 当前应用路径
const appDir = fs.realpathSync(process.cwd());
// 路径或路径片段的序列解析为应用绝对路径
const resolveAppPath = appPath => path.resolve(appDir, appPath);

// nextJs配置
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

const webpack = (config, options) => {
  let svgLoaderOptions = {};

  for (const rule of config.module.rules) {
    if (rule.test && rule.options && ('' + rule.test).includes('svg')) {
      svgLoaderOptions = rule.options;

      break;
    }
  }

  // svg通过url方式加载
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: /url/,
    use: [
      {
        loader: 'next-image-loader',
        options: svgLoaderOptions,
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIDs: false,
                },
              },
            },
          ],
        },
      },
    ],
  });

  // svg通过inline方式加载
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: {not: [/url/]},
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    cleanupIDs: false,
                  },
                },
              },
            ],
          },
        },
      },
    ],
  });

  // 别名配置
  const alias = {
    '@app': resolveAppPath('./app'),
    '@libs': resolveAppPath('./app/libs'),
    '@widget': resolveAppPath('./app/widget'),
    '@affiliate': resolveAppPath('./app/affiliate'),
    '@referral': resolveAppPath('./app/referral'),
  };

  config.resolve.alias = {...config.resolve.alias, ...alias};

  return config;
};

export default {
  ...nextConfig,
  webpack,
};