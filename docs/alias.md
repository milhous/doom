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

2. 在 webpack/alias.js 中 添加 alias 规则，用于 next.config 自定义 webpack 配置。

> 遍历 app 和 pages 目录中的文件夹，加入到 alias 配置中，方便 scss 的 @use、@import 和 url 引用。

```js
import { getFolder } from "./utils.js";

// 获取配置
const getConfig = (map) => {
  const config = {};

  for (const [name, dir] of map.entries()) {
    config[`@${name}`] = dir;
  }

  return config;
};

// 别名配置
const alias = () => {
  const appFolder = getFolder("app");
  const pageFolder = getFolder("pages");
  const aliasConfig = { ...getConfig(appFolder), ...getConfig(pageFolder) };

  return aliasConfig;
};

export default alias;
```
