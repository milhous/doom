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
