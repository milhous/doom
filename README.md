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

3. app/layout header 中引入计算根元素 html 的 font-size 值逻辑的 js。

> 注: js 放入项目根路径 public 中。

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
    <html>
      <head>
        <script src="flexible.js" />
      </head>
      <body>{children}</body>
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

## 查阅 [SVG 配置](./docs/svg.md)

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
