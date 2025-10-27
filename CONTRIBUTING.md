# 贡献指南

感谢您有兴趣为 vite-vue3-h5-template 项目做贡献！

## 分支策略

本项目使用两个主要分支：

- `[main](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/node_modules/.pnpm/@vue+runtime-dom@3.5.22/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts#L1153-L1153)`: 稳定分支，包含已发布或即将发布的稳定代码
- `[test](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/apps/h5-template/src/views/test/index.vue#L1-L17)`: 开发分支，用于集成新功能和 bug 修复

所有贡献都应该提交到 [test](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/apps/h5-template/src/views/test/index.vue#L1-L17) 分支，我们会定期将测试通过的更改合并到 [main](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/node_modules/.pnpm/@vue+runtime-dom@3.5.22/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts#L1153-L1153) 分支。

## 贡献方式

我们欢迎各种形式的贡献！参与方式：

1. Fork 项目并在 [test](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/apps/h5-template/src/views/test/index.vue#L1-L17) 分支基础上创建特性分支
2. 运行 `pnpm install` 确保开发环境正常
3. 遵循约定式提交规范
4. 向 [test](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/apps/h5-template/src/views/test/index.vue#L1-L17) 分支提交 Pull Request 并详细描述变更内容

您可以参与的工作包括但不限于：

- 修复 bug
- 添加新功能
- 完善文档
- 提出改进建议
- 帮助测试新版本

## 开发环境设置

1. 确保您已安装 Node.js (建议 LTS 版本，>=16) 和 pnpm (>=8.15.6)
2. Fork 并克隆仓库
3. 安装依赖：
   ```bash
   pnpm install
   ```
4. 启动开发服务器：
   ```bash
   pnpm run dev:h5     # 启动 H5 应用开发服务器
   pnpm run dev:docs   # 启动文档站点
   ```

## 代码规范

- 使用项目统一的 ESLint 和 Prettier 规则
- 遵循 Conventional Commits 提交规范
- 确保代码通过所有测试和类型检查

## 提交 Pull Request

当您准备好提交 Pull Request 时，请确保：

1. 目标分支是 [test](file:///Users/wuxingxi/Desktop/node-libs/vite-vue3-h5-template/apps/h5-template/src/views/test/index.vue#L1-L17) 分支
2. 包含清晰的描述，说明所做的更改及其目的
3. 包含相关的测试（如果适用）
4. 已经通过了所有 CI 检查

我们会尽快审查您的 Pull Request。感谢您的贡献！