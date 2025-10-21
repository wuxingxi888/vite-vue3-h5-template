### 1、为什么有多个组件库？

本模版想做到的是尽可能的开箱即用，不用去看别的文档引入相关组件库，毕竟做减法比做加法要容易些，如你不需要某个功能可以删除相关代码。

### 2、我可以用在个人或公司的项目吗？

模版基于 MIT License,你可以根据自己的需求用到不同的项目里，如果对你有帮助点个 star 支持一下呗 🌟

### 3、我是一个新手，有什么好的学习建议吗？

过来人的经验就是熟读文档可以少走很多弯路，很多的人文档没读熟就开始动手，出了问题也不知道如何去解决，墙裂建议先把[文档](https://cn.vuejs.org/)熟读

### 4、为什么使用 Turborepo 构建 Monorepo 项目？

Turborepo 是一个高性能的构建系统，专门为 JavaScript 和 TypeScript 代码库设计。使用它有以下优势：

- **统一管理**：可以在一个仓库中管理多个相关项目，共享配置和依赖
- **依赖优化**：智能的任务调度和缓存机制，避免重复构建，提升构建速度
- **版本同步**：更容易在项目间同步依赖版本，减少版本冲突
- **代码共享**：方便在项目间共享代码和组件

### 5、移动端适配方案是如何实现的？

本项目采用 `postcss-mobile-forever` 插件进行移动端适配：

- 使用 vw/vh 单位实现响应式布局
- 自动将 px 单位转换为 vw 单位
- 支持设置设计稿基准宽度（默认 375px）
- 可配置是否保留某些 px 不转换
- 支持设置最大宽度，避免在大屏设备上过度拉伸

### 6、如何自定义主题？

项目支持主题切换功能，可以通过以下方式自定义主题：

1. 在 `src/styles/variables.scss` 中修改 SCSS 变量
2. 在 `src/store/modules/theme.ts` 中配置主题相关状态
3. 使用 `useTheme` hook 来动态切换主题
4. 主题配置会自动持久化保存到本地存储中

### 7、如何添加新的页面路由？

添加新页面路由有以下步骤：

1. 在 `src/views` 目录下创建页面组件
2. 如果是主菜单页面，在 `src/router/menu.ts` 中添加路由配置
3. 如果是功能页面，在 `src/router/modules.ts` 中添加路由配置
4. 确保为页面组件设置正确的 `name` 选项用于 keep-alive 缓存控制

### 8、如何进行代码规范检查和格式化？

项目集成了完整的代码规范工具链：

- **ESLint**：用于检查 JavaScript/TypeScript 代码质量
- **Prettier**：用于代码格式化
- **Stylelint**：用于检查样式代码质量
- **Commitlint**：用于规范 Git 提交信息

可以通过以下命令进行操作：

```bash
# 检查代码规范
pnpm run lint

# 自动修复代码格式问题
pnpm run lint:fix

# Git 提交时会自动检查暂存区文件并修复
```

### 9、构建优化有哪些策略？

项目在构建优化方面做了以下处理：

- **Tree Shaking**：自动移除未使用的代码
- **代码分割**：通过动态导入实现按需加载
- **资源压缩**：自动压缩 JavaScript、CSS 和图片资源
- **预加载优化**：使用 Vite 的预热功能优化启动速度
- **环境变量**：支持不同环境的构建配置

### 10、如何处理跨域问题？

项目支持两种方式处理跨域：

1. **开发环境代理**：在 `vite.config.ts` 中配置 proxy 代理
2. **生产环境 CORS**：在服务端设置 CORS 头部

开发环境代理配置示例：

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### 11、如何使用 Pinia 进行状态管理？

项目使用 Pinia 作为状态管理库，具有以下特点：

- 轻量级，无额外嵌套
- 支持 TypeScript 类型推断
- 支持模块热更新
- 可通过插件实现状态持久化

创建 store 的基本步骤：

1. 在 `src/store/modules` 中创建 store 文件
2. 使用 `defineStore` 定义 store
3. 在组件中通过 `useStore` 使用 store

### 12、如何使用 UnoCSS 原子化 CSS？

UnoCSS 是一个即时按需的原子 CSS 引擎，使用方式：

- 直接在 class 中使用原子类：`class="text-red p-2"`
- 支持属性模式：`p="2" text="red"`
- 支持变体组：`class="hover:(bg-red text-white)"`
- 支持自定义快捷方式和规则

项目中已配置常用快捷方式：

- `m-0-auto`：外边距为0并居中
- `wh-full`：宽高100%
- `flex-center`：flex布局并居中
