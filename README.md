# Vite + Vue 3 H5 模板（vite-vue3-h5-template）

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.x-brightgreen.svg" alt="Vue 3.x">
  <img src="https://img.shields.io/badge/Vite-7.x-purple.svg" alt="Vite 7.x">
  <img src="https://img.shields.io/badge/TypeScript-Support-blue.svg" alt="TypeScript Support">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License MIT">
</p>

<p align="center">
  现代化、企业级移动端 H5 模板，基于 Vue 3、Vite、TypeScript 和 Pinia 构建
</p>

---

## 项目概述

一款精心打造的企业级移动端 H5 模板，采用前沿的前端技术栈，包括 Vite、Vue
3、TypeScript 和 Pinia。本项目采用 Monorepo 架构，通过 Turbo 和 pnpm 工作区进行管理，集成了示例文档站点和可复用的 UI/工具库。

专为追求高性能、可扩展性和可维护性的移动 Web 应用开发而设计。

---

## 核心特性

- 🚀 **现代化技术栈**：Vue 3 Composition API、Vite 7、TypeScript、Pinia、UnoCSS、ECharts
- 🏗️ **Monorepo 架构**：Turbo 和 pnpm 工作区实现高效的多包管理
- 💻 **卓越开发体验**：Plop 代码生成器、ESLint/Prettier、Husky & lint-staged 保障代码质量
- 🔧 **丰富插件生态**：SVG 图标、自动组件注册、Mock 开发等
- 📱 **移动端优先**：Viewport 自适应、触摸模拟器和移动端特定优化
- 🎨 **设计系统**：集成 @miracle-web/ui 组件库
- ⚡ **性能优化**：代码分割、懒加载和构建优化

---

## 项目结构

```
.
├── apps/
│   ├── h5-template/     # 主 H5 应用源码
│   └── docs/            # 文档站点 (VitePress)
├── packages/
│   ├── eslint-config/   # 共享 ESLint 配置
│   ├── prettier-config/ # 共享 Prettier 配置
│   └── typescript-config/ # 共享 TypeScript 配置
├── package.json         # 根级包文件，包含 turbo 脚本
├── pnpm-workspace.yaml  # pnpm 工作区配置
└── turbo.json           # Turbo 构建流水线配置
```

---

## 技术栈

| 类别          | 技术                                 |
| ------------- | ------------------------------------ |
| 核心框架      | Vue 3 + Vite 7 + TypeScript          |
| 状态管理      | Pinia                                |
| 样式          | UnoCSS + Sass                        |
| 工具库        | @vueuse/core, mitt, nprogress        |
| UI 组件       | @miracle-web/ui                      |
| 代码质量      | ESLint, Prettier, Husky, lint-staged |
| 文档          | VitePress                            |
| 包管理器      | pnpm                                 |
| Monorepo 工具 | Turborepo                            |

---

## 分支策略

- `test`: 开发分支，用于日常功能开发和集成
- `master`: 稳定分支，用于生产环境发布

推荐的贡献流程：

- 使用 Commitizen/cz-git 进行约定式提交
- 合并前通过 CI 验证（类型检查、代码规范、测试等）

---

## 快速开始

### 环境要求

- Node.js: >=20.x 或 >=22.x (查看 [engines](./apps/h5-template/package.json))
- pnpm: >=8.15.6

### 安装依赖

```bash
# 如果尚未安装 pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 安装项目依赖
pnpm install
```

### 开发环境

```bash
# 启动 H5 模板开发服务器
pnpm run dev:h5

# 启动文档站点
pnpm run dev:docs

# 同时启动两者
pnpm dev
```

### 生产构建

```bash
# 生产环境构建
pnpm build

# 构建并预览 H5 模板
pnpm run build:h5
pnpm run preview
```

### 其他命令

- `pnpm run lint` / `pnpm run lint:fix`: 代码检查和自动修复
- `pnpm run new`: 使用 Plop 生成组件/页面/状态管理
- `pnpm run deps:check`: 检查过时依赖
- `pnpm run deps:update`: 更新依赖到最新版本

> 注意：项目通过 `preinstall` 钩子强制使用 pnpm

---

## 开源参考

本项目借鉴并扩展了多个优秀的开源项目：

- Vue 3 生态系统（Vite、Vue Router、Pinia、vue-tsc）
- Turborepo 和 pnpm 工作区用于 Monorepo 管理
- Miracle Web 系列（@miracle-web/ui、@miracle-web/utils）

---

## 核心贡献者

> 项目创始人及主要维护者

- TomCat (wuxingxi888) — 项目创建者 · GitHub: [wuxingxi888](https://github.com/wuxingxi888)

> 我们诚邀更多开发者加入我们的开源社区，共同完善这个项目。无论您是经验丰富的专家还是刚入门的新手，都可以在这里贡献自己的力量。

---

## 参与贡献

我们欢迎各种形式的贡献！参与方式：

1. Fork 项目并在 `test` 分支基础上创建特性分支
2. 运行 `pnpm install` 确保开发环境正常
3. 遵循约定式提交规范
4. 向 `test` 分支提交 Pull Request 并详细描述变更内容

您可以参与的工作包括但不限于：

- 修复 bug
- 添加新功能
- 完善文档
- 提出改进建议
- 帮助测试新版本

请阅读我们的贡献指南了解更多信息。

---

## 开源协议

本项目采用 MIT 协议，详情请查看 [LICENSE](./apps/h5-template/LICENSE) 文件。

---

## 加入我们的开源社区

我们诚挚邀请来自不同背景的开发者加入我们的开源社区！无论您是经验丰富的专家还是刚刚起步的新手，您的想法、代码和反馈对我们都非常宝贵。

让我们一起构建令人惊叹的项目，推动移动 Web 开发的边界。欢迎提交 issue、创建 pull
request 或分享您对改进此模板的想法。让我们一起让移动 Web 开发变得更加高效和有趣！

如果您喜欢这个项目，请不要吝啬您的 Star ⭐，这对我们是莫大的鼓励和支持！
