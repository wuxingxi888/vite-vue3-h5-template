# Vite 环境变量配置

在现代前端开发中，环境变量是区分不同运行环境（开发、测试、生产等）配置的重要手段。本项目基于 Vite 构建，充分利用了 Vite 提供的环境变量支持。

## 环境变量加载机制

项目通过 Vite 的 [loadEnv] 函数加载环境变量：

```ts
// 加载env环境 (root目录下的 .env开头的环境文件)
const env = loadEnv(mode, root);
// 将env环境变量转换为对象
const viteEnv = wrapperEnv(env);
```

其中 [wrapperEnv] 是一个自定义函数，用于将环境变量字符串值转换为适当的类型（布尔值、字符串等）。

## 环境文件命名规范

项目支持以下环境文件：

- [.env] - 所有环境通用配置
- [.env.development] - 开发环境配置
- [.env.production] - 生产环境配置
- [.env.test] - 测试环境配置

## 环境变量前缀规范

为了防止环境变量冲突，Vite 规定只有以 `VITE_`
为前缀的变量才会被注入到客户端代码中。项目中使用的主要环境变量包括：

- `VITE_ENV` - 环境标识
- `VITE_PORT` - 开发服务器端口
- `VITE_PUBLIC_PATH` - 应用基础路径
- `VITE_GLOB_APP_TITLE` - 应用标题
- `VITE_GLOB_APP_SHORT_NAME` - 应用简称
- `VITE_USE_MOCK` - 是否启用 Mock 数据
- `VITE_OUTPUT_DIR` - 构建输出目录
- `VITE_GLOB_API_URL` - API 接口地址
- `VITE_GLOB_API_URL_PREFIX` - API 接口前缀
- `VITE_GLOB_UPLOAD_URL` - 文件上传地址
- `VITE_GLOB_IMG_URL_PREFIX` - 图片资源地址前缀
- `VITE_PROXY` - 代理配置
- `VITE_BUILD_COMPRESS` - 构建压缩方式
- `VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE` - 是否删除原始文件

## 环境变量使用方式

在项目代码中，可以通过 `import.meta.env` 对象访问环境变量：

```ts
const getEnvConfig = (): Readonly<GlobConfig> => {
  const env = { ...import.meta.env } as unknown as GlobEnvConfig;
  return {
    title: env.VITE_GLOB_APP_TITLE,
    apiUrl: env.VITE_GLOB_API_URL,
    shortName: env.VITE_GLOB_APP_SHORT_NAME,
    // ...
  };
};
```

## 环境判断工具

项目还提供了便捷的环境判断工具函数：

```ts
const getEnvMode = (): string => {
  return import.meta.env.MODE;
};

const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};

const isProdMode = (): boolean => {
  return import.meta.env.PROD;
};
```

这些工具函数可以帮助我们在代码中根据不同的环境执行不同的逻辑。

## 自定义环境变量处理

项目通过 [wrapperEnv]
函数对环境变量进行处理，将字符串形式的布尔值（'true'/'false'）转换为真正的布尔值，并将处理后的变量同时赋值给返回对象和
`process.env` 对象。

```ts
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
```

这种方式使得在项目中使用环境变量更加方便和类型安全。

## 总结

通过合理使用 Vite 的环境变量机制，我们的项目能够：

1. 在不同环境下使用不同的配置
2. 安全地管理敏感信息（如 API 密钥等）
3. 方便地切换服务地址和配置参数
4. 实现构建时的条件编译（如生产环境移除 console 和 debugger）

这些特性大大增强了项目的灵活性和可维护性。
