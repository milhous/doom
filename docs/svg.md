## SVG 配置

在 next.config.js 中自定义 webpack 配置，支持 url 和 inline 方式加载。

> 注: loader 不支持 swc-loader，rule 不支持 generator dataUrl

1. 安装相关依赖

```node

yarn add -D svgo-loader @svgr/webpack

```

2. 在 webpack/files.js 中 添加 svg 规则，用于 next.config 自定义 webpack 配置。

```js
let svgLoaderOptions = {};

for (const rule of rules) {
  if (rule.test && rule.options && ("" + rule.test).includes("svg")) {
    svgLoaderOptions = rule.options;

    break;
  }
}

// 文件配置
const fileConfig = [];

// svg通过url方式加载
fileConfig.push({
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
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          "prefixIds",
        ],
      },
    },
  ],
});

// svg通过inline方式加载
fileConfig.push({
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
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            "prefixIds",
          ],
        },
      },
    },
  ],
});
```

3. 使用建议，当 svg 体积过大时使用 url , 避免使用 inline, 使其打包到 js 中，导致 js 体积变大。

> 为了区分导入类型, url 导入时, 导入名首字母小写. inline 导入时, 导入名首字母大写.

```
# svg 体积较大时，比如 banner
import Image from 'next/image';
import banner from './assets/banner.svg?url'

<Image src={banner.src} width={200} height={200} priority />

# svg 体积较小时，比如 icon
import Banner from './assets/banner.svg'

<Banner width="200" height="200" />
```
