# 安装与运行

## 环境要求

在开始之前，请确保您的开发环境中已经安装了以下软件：

- **Node.js**: 版本 (推荐 18+ LTS 版本)
- **pnpm**: 版本 (推荐 8+)
- **Git**: 版本控制工具

您可以使用以下命令检查是否已安装这些工具：

```bash
node -v
pnpm -v
git --version
```

如果尚未安装，请参考官方文档进行安装：

- [Node.js 安装指南](https://nodejs.org/zh-cn/download/)
- [pnpm 安装指南](https://pnpm.io/zh/installation)
- [Git 安装指南](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

## 项目获取

克隆项目仓库到本地：

```bash
git clone https://github.com/wuxingxi888/miracle-vue-h5-template.git
cd miracle-vue-h5-template
```

## 依赖安装

本项目使用 pnpm 作为包管理工具，并且是 Monorepo 结构，因此只需在根目录执行一次安装命令：

```bash
pnpm install
```

这将会自动安装所有应用（H5 模板和文档站点）所需的依赖。

## 开发模式

### 启动所有应用

```bash
pnpm run dev
```

该命令会同时启动 H5 模板应用和文档站点。

### 单独启动 H5 应用

```bash
pnpm run dev:h5
```

H5 应用将在默认的 3000 端口启动，您可以通过浏览器访问 `http://localhost:3000` 查看效果。

### 单独启动文档站点

```bash
pnpm run dev:docs
```

文档站点将在默认的 5173 端口启动，您可以通过浏览器访问 `http://localhost:5173` 查看文档。

## 构建项目

### 构建所有应用

```bash
pnpm run build
```

### 单独构建 H5 应用

```bash
pnpm run build:h5
```

构建后的文件位于 `apps/h5-template/dist` 目录下。

### 单独构建文档站点

```bash
pnpm run build:docs
```

构建后的文件位于 `apps/docs/.vitepress/dist` 目录下。

## 预览构建结果

### 预览 H5 应用

```bash
pnpm run preview:h5
```

### 预览文档站点

```bash
pnpm run preview:docs
```

## 其他常用命令

### 类型检查

```bash
pnpm run type-check
```

### 代码格式化

```bash
pnpm run lint:fix
```

### 清理构建产物

```bash
# 清理所有构建产物
pnpm run clean

# 清理 H5 应用构建产物
pnpm run clean:h5

# 清理文档站点构建产物
pnpm run clean:docs
```

### 更新依赖

```bash
# 检查过时的依赖
pnpm run deps:check

# 更新所有依赖到最新版本
pnpm run deps:update
```

## 项目配置

### 环境变量

项目支持通过环境变量进行配置，在 `apps/h5-template` 目录下可以找到以下文件：

- `.env` - 默认环境变量
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `.env.test` - 测试环境变量

### Vite 配置

Vite 的配置文件位于 `apps/h5-template/vite.config.ts`，您可以根据需要进行自定义配置。

### UnoCSS 配置

UnoCSS 的配置文件位于 `apps/h5-template/uno.config.ts`，您可以在这里配置预设、快捷方式等。

## 项目开发

### 创建新页面

您可以使用内置的 plop 模板来快速创建新页面：

```bash
pnpm run new
```

按照提示选择创建页面，输入页面名称即可自动生成相关文件。

### 添加新路由

路由配置位于 `apps/h5-template/src/router` 目录下：

1. 在 `modules.ts` 文件中添加新的路由配置
2. 页面组件放在 `apps/h5-template/src/views` 目录下

### 状态管理

全局状态管理使用 Pinia，在 `apps/h5-template/src/store` 目录下：

1. 在 `modules` 目录下创建新的 store 模块
2. 在 `index.ts` 中注册模块

### 组件开发

全局组件放在 `apps/h5-template/src/components` 目录下：

1. 创建新的组件文件夹
2. 组件会通过 `unplugin-vue-components` 自动按需引入

### 工具函数

工具函数放在 `apps/h5-template/src/utils` 目录下，可以根据功能分类放置在不同子目录中。

## 注意事项

1. 请务必使用 pnpm 作为包管理工具，避免使用 npm 或 yarn
2. 不要手动修改 `pnpm-lock.yaml` 文件
3. 推荐使用 VS Code 并安装推荐的插件以获得最佳开发体验
4. 提交代码前请确保通过了 lint 检查
5. 遵循 Git 提交规范，使用 `git cz` 进行规范化提交
