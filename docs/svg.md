## SVG 配置

在 next.config.js 中自定义 webpack 配置，支持 url 和 inline 方式加载。

> 注: loader 不支持 swc-loader，rule 不支持 generator dataUrl

```js
const nextConfig = {
  ...
}

const webpack = (config) => {
  let svgLoaderOptions = {};

  for (const rule of config.module.rules) {
    if (rule.test && rule.options && ("" + rule.test).includes("svg")) {
      svgLoaderOptions = rule.options;

      break;
    }
  }

  // 通过url方式加载
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: /url/,
    use: [
      {
        loader: "next-image-loader",
        options: svgLoaderOptions,
      },
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                },
              },
            },
            // 解决ID被移除后svg可能不显示问题
            'prefixIds'
          ],
        },
      },
    ],
  });

  // 通过inline方式加载
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] },
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false
                  },
                },
              },
              // 解决ID被移除后svg可能不显示问题
              'prefixIds'
            ],
          },
        },
      },
    ],
  });

  return config;
};

export default {
  ...nextConfig,
  webpack,
};
```

svg 体积过大时, 建议使用 url , 避免使用 inline, 导致 js 体积大, 页面需要较长时间加载才能显示。

> 为了区分导入类型, url 导入时, 导入名首字母小写. inline 导入时, 导入名首字母大写.

```
# svg 体积较大时，比如 banner
import Image from 'next/image';
import svg from './assets/file.svg?url'

<Image src={svg.src} width={200} height={200} priority />

# svg 体积较小时，比如 icon
import Svg from './assets/file.svg'

<Svg width="200" height="200" />
```
