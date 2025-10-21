# Vite 插件集成

Vite 基于原生 ES 模块提供了丰富的内建功能，如速度快到惊人的模块热更新（HMR），使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

本项目为了提升开发体验和构建效率，集成了多种实用的 Vite 插件。

## 核心插件

### vue()

提供 Vue 3 单文件组件支持。

### vueJsx()

提供 Vue 3 JSX 支持（官方预设）。

### eslintPlugin()

提供 ESLint 支持，用于在开发过程中实时检测代码质量问题。

### UnoCSS()

集成 UnoCSS，提供原子化 CSS 功能，按需生成样式以减小打包体积。

## 按需加载插件

### configAutoImportPlugin()

基于 `unplugin-auto-import` 实现自动按需引入依赖，例如 Vue、Vue Router 等常用 API，无需手动 import。

### configAutoComponentsPlugin()

基于 `unplugin-vue-components`
实现 Vue 组件的自动按需引入，包括项目内的自定义组件和第三方 UI 组件库。

### configStyleImportPlugin()

基于 `vite-plugin-style-import` 实现样式的按需引入，避免全量导入样式文件。

## 构建优化插件

### configCompressPlugin()

基于 `vite-plugin-compression` 实现 `.gz` 压缩，在构建时生成压缩文件，需要服务器配置支持。

### configImageminCompressPlugin()

基于 `vite-plugin-imagemin` 实现图片压缩，有效减小图片资源体积。

### configVisualizerConfig()

基于 `rollup-plugin-visualizer` 实现打包体积分析，帮助开发者了解打包结果并优化包体积。

## 开发辅助插件

### configProgressPlugin()

在构建过程中显示进度条，提供更好的构建反馈。

### configLegacyPlugin()

提供对旧浏览器的兼容性支持。

### configSvgIconsPlugin()

提供 SVG 雪碧图支持，便于管理和使用 SVG 图标。

### configMockPlugin()

提供 Mock 数据支持，方便前后端分离开发。

### configHtmlPlugin()

提供 HTML 模板注入功能，可以在 HTML 文件中使用环境变量。

### configCdnImportPlugin()

提供 CDN 导入支持，可在生产环境中通过 CDN 引入大型依赖库以减小打包体积。

## 插件配置策略

项目中的插件通过 [build/vite/plugin/index.ts]
文件集中管理，根据开发环境和生产环境的不同需求动态加载插件。

```ts
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // ...
}
```

这种设计使我们能够：

1. 根据环境变量动态启用/禁用插件
2. 区分开发和生产环境的插件配置
3. 更好地组织和维护插件配置

## 总结

通过合理集成这些 Vite 插件，我们的项目具备了以下能力：

- 自动化的代码引入（Auto Import）
- 高效的构建压缩（Compression）
- 完善的开发调试工具（Eruda 控制台等）
- 详细的构建分析（Visualizer）
- 良好的浏览器兼容性（Legacy 支持）
- 便捷的资源管理（SVG Icons、CDN 等）

这些插件共同构成了一个现代化、高效且易于维护的前端开发环境。
