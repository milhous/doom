# doom

Module Federation in Next.js

## CSS 配置

#### 支持 sass

```js
yarn add -D sass
```

#### 支持 rem

1. 安装相关依赖

```node

yarn add -D browserslist autoprefixer postcss postcss-pxtorem postcss-normalize

```

2. 创建 postcss.config.js，如果 package.json 属性 type 为 module（.js 结尾或没有任何扩展名的文件将作为 ES 模块进行加载），则文件后缀改为 .cjs。

```js
const browserslist = [
  "last 1 version",
  "> 1%",
  "maintained node versions",
  "not dead",
];

module.exports = {
  plugins: {
    autoprefixer: {
      grid: "autoplace",
      cascade: true,
      remove: true,
      // 解决各个应用无需在package.json配置Browserslist
      overrideBrowserslist: browserslist,
    },
    "postcss-pxtorem": {
      rootValue: 100,
      unitPrecision: 2,
      propList: ["*"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
      exclude: /node_modules/i,
    },
    "postcss-normalize": {
      browsers: browserslist.join(","),
    },
  },
};
```

3. app/layout 加入计算根元素 html 的 font-size 值逻辑。

> 注: 当 Script 在 layout body 中时，strategy 才能设置为 beforeInteractive，插入到 head 中。

```js
import Script from "next/script";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="flexible" strategy="beforeInteractive">
          {`
            var setFontSize = function() {
              var width = document.documentElement.clientWidth;
              width = width > 768 ? 768 : width;
              var fontSize = (width / 768) * 100;
              var html = document.querySelector('html');

              if (!!html) {
                html.style.fontSize = fontSize + 'px';
              }
            };

            setFontSize();

            window.addEventListener('resize', setFontSize);
          `}
        </Script>
      </body>
    </html>
  );
}
```

#### 支持 Normalize CSS

全局样式引入 normalize.css

```scss
@import "normalize.css";

.test {
  font-size: 16px;
}
```

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
              name: "preset-default",
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
                name: "preset-default",
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

## Alias 配置

1. tsconfig.json 配置，用于 ts & tsx 的 import 引用。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["app/*"]
    }
  }
}
```

2. next.config.js 配置，用于 scss 的 @use、@import 和 url 引用。

```js
import path from 'path';
import fs from 'fs-extra';

// 当前应用路径
const appDir = fs.realpathSync(process.cwd());
// 路径或路径片段的序列解析为应用绝对路径
const resolveAppPath = (appPath) => path.resolve(appDir, appPath);

const nextConfig = {
  ...
}

const webpack = (config) => {
  ...

  config.resolve.alias['@app'] = resolveAppPath('./app');

  return config;
}

export default {
  ...nextConfig,
  webpack,
};
```

## i18n 配置

1. 安装相关依赖

```node

yarn add next-i18next react-i18next i18next

yarn add i18next-browser-languagedetector i18next-chained-backend i18next-fs-backend i18next-http-backend

```

2. 创建 next-i18next.config.js
