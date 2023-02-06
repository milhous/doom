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
