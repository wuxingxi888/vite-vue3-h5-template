# 项目结构

## 整体架构

本项目是一个基于 [Turborepo](https://turbo.build/repo)
的 Monorepo 项目，采用了现代化的前端技术栈，主要包含两个部分：

1. **H5 移动端应用** (`apps/h5-template`) - 基于 Vue 3 + TypeScript + Vite 的移动端 H5 模板
2. **项目文档** (`apps/docs`) - 基于 VitePress 的文档站点

## 技术栈

### 核心框架

- [Vue 3](https://v3.cn.vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型安全
- [Vite](https://cn.vitejs.dev/) - 新一代前端构建工具，极速的开发体验
- [Vue Router](https://router.vuejs.org/zh/) - Vue.js 的官方路由管理器

### 状态管理

- [Pinia](https://pinia.vuejs.org/) - Vue 的轻量级状态管理库
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) -
  Pinia 持久化存储插件

### UI 和样式

- [UnoCSS](https://unocss.dev/) - 即时按需的原子 CSS 引擎
- [@miracle-web/ui](https://github.com/wuxingxi888/miracle-web-ui) - 自定义移动端 UI 组件库
- Sass - CSS 扩展语言

### 工具库

- [@vueuse/core](https://vueuse.org/) - 实用的 Vue Composition API 工具集
- [mitt](https://github.com/developit/mitt) - 轻量级事件发射器
- [axios](https://axios-http.com/) - Promise 基的 HTTP 客户端
- [lodash-es](https://lodash.com/) - JavaScript 工具库

### 开发工具

- [ESLint](https://eslint.org/) - JavaScript/TypeScript 代码质量检查工具
- [Prettier](https://prettier.io/) - 代码格式化工具
- [Husky](https://typicode.github.io/husky/) +
  [Lint-staged](https://github.com/okonet/lint-staged) - Git 提交钩子
- [Commitizen](https://github.com/commitizen/cz-cli) + [Commitlint](https://commitlint.js.org/) -
  Git 提交规范工具

### 构建与部署

- [Turborepo](https://turbo.build/repo) - 高性能的构建系统
- [VitePress](https://vitepress.dev/) - 由 Vite 和 Vue 驱动的静态站点生成器
- [PostCSS](https://postcss.org/) - CSS 处理工具

## H5 模板目录结构

```
h5-template/
├── build/                    # 构建相关配置
│   └── vite/                 # Vite 插件配置
├── mock/                     # Mock 数据
├── public/                   # 静态资源
├── src/                      # 源代码
│   ├── api/                  # 接口请求
│   ├── assets/               # 静态资源
│   ├── components/           # 全局组件
│   ├── enums/                # 枚举常量
│   ├── hooks/                # 自定义 Hooks
│   ├── layout/               # 布局组件
│   ├── plugins/              # 插件配置
│   ├── router/               # 路由配置
│   ├── services/             # JS 与原生交互服务
│   ├── store/                # 状态管理
│   ├── styles/               # 全局样式
│   ├── utils/                # 工具函数
│   ├── views/                # 页面视图
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── types/                    # 类型定义
├── .env*                     # 环境变量配置
├── index.html                # HTML 模板
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
└── uno.config.ts             # UnoCSS 配置
```

## 功能特性

### 1. 移动端适配

- 使用 `postcss-mobile-forever` 进行移动端适配
- 支持各种屏幕尺寸的设备
- 提供了常用的移动端组件

### 2. 性能优化

- 使用 Vite 进行快速冷启动和热更新
- 代码分割和懒加载
- 图片压缩和资源优化
- Tree-shaking 减少打包体积

### 3. 开发体验

- 完整的 TypeScript 类型支持
- ESLint + Prettier 保证代码风格一致
- Git Hooks 确保提交代码质量
- Commit 规范化提交日志

### 4. 状态管理

- 使用 Pinia 进行全局状态管理
- 支持持久化存储状态

### 5. 路由管理

- 基于 Vue Router 的动态路由
- 支持路由守卫
- 路由懒加载

### 6. 样式方案

- 使用 UnoCSS 原子化 CSS
- 支持 SCSS 预处理器
- 提供常用样式 Mixins 和 Variables

### 7. 组件库

- 内置多种移动端常用组件
- 支持按需引入
- 可扩展的组件系统

### 8. 工具集成

- Mock 数据支持
- 网络请求封装
- 常用工具函数集合
- 原生能力调用封装
