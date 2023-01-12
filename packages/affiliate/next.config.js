const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true
}

const webpack = (config) => {
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
    use: [{
      loader: 'next-image-loader',
      options: svgLoaderOptions,
    }, {
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
    }]
  });

  // svg通过inline方式加载 
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] },
    use: [{
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
        }
      },
    }],
  });

  return config;
};
  
export default {
  ...nextConfig,
  webpack
};