# Vite 基础配置

本项目基于 Vite 构建，Vite 是一个由原生 ES 模块驱动的新型前端构建工具，能够显著提升前端开发体验和构建性能。

## 配置概览

项目中的 Vite 配置文件位于
[apps/h5-template/vite.config.ts]，该文件导出一个函数，根据不同的命令（dev/serve 或 build）和模式（development 或 production）返回相应的配置对象。

```ts
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 配置逻辑
});
```

## 核心配置项详解

### 基础配置

```ts
base: VITE_PUBLIC_PATH,
root,
```

- `base`: 应用的基础路径，从环境变量 `VITE_PUBLIC_PATH` 获取
- `root`: 项目根目录

### 插件配置

```ts
plugins: createVitePlugins(viteEnv, isBuild),
```

插件通过 `createVitePlugins` 函数统一管理，根据环境变量和构建状态动态加载不同插件。

### 路径别名

```ts
resolve: {
  alias: [
    {
      find: '@',
      replacement: pathResolve('src')
    }
  ]
},
```

配置路径别名，将 `@` 指向 `src` 目录，方便模块导入。

### CSS 配置

```ts
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
      charset: false,
      additionalData: `@use "@/styles/index.scss" as *;`,
      modifyVars: {},
      javascriptEnabled: true
    }
  },
  postcss: {
    plugins: [
      autoprefixer({
        // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
      }),
      postcssPxToViewProtConfig()
    ]
  }
},
```

- 配置 SCSS 预处理器，启用现代编译器 API
- 自动导入全局样式文件 `@/styles/index.scss`
- 使用 PostCSS 插件：
  - `autoprefixer`: 为 CSS 属性添加浏览器前缀
  - `postcssPxToViewProtConfig`: 处理像素单位转换

### 开发服务器配置

```ts
server: {
  host: true,
  open: true,
  hmr: true, // 开启热更新
  port: Number(VITE_PORT),
  proxy: createProxy(),
  // 预热文件以降低启动期间的初始页面加载时长
  warmup: {
    // 预热的客户端文件：首页、views、 components
    clientFiles: ['./index.html', './src/{views,components}/*']
  }
},
```

- `host`: 设置为 true 允许外部访问
- `open`: 启动时自动打开浏览器
- `hmr`: 开启热模块替换
- `port`: 从环境变量 `VITE_PORT` 获取端口号
- `proxy`: 通过 `createProxy` 函数配置代理
- `warmup`: 预热关键文件，提升启动速度

### 构建配置

```ts
build: createBuild(viteEnv),
```

构建配置通过 `createBuild` 函数生成，根据环境变量进行优化。

### ESBuild 配置

```ts
esbuild: {
  // 使用esbuild来构建去掉console和debugger，
  drop: mode === 'production' ? ['console', 'debugger'] : []
},
```

在生产环境中移除 `console` 和 `debugger` 语句，优化构建结果。

### 全局常量

```ts
define: {
  __APP_INFO__: JSON.stringify(__APP_INFO__)
},
```

定义全局常量 `__APP_INFO__`，包含应用信息和构建时间。

## 环境变量支持

项目使用 `loadEnv` 加载环境变量，并通过 `wrapperEnv` 函数将环境变量转换为配置对象：

```ts
const env = loadEnv(mode, root);
const viteEnv = wrapperEnv(env);
```

这使得项目可以轻松地在不同环境中使用不同的配置。

## 总结

本项目的 Vite 配置充分考虑了移动端 H5 应用的开发需求，包括：

- 路径别名简化模块导入
- CSS 预处理器和后处理器支持
- 移动端像素单位自动转换
- 开发服务器热更新和代理配置
- 生产环境优化（移除调试代码等）
- 环境变量支持实现多环境配置

这些配置使得开发者能够专注于业务开发，而无需过多关注构建配置的细节。
