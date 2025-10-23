import type { DefaultTheme } from "vitepress";

const introduce: DefaultTheme.SidebarItem = {
  text: "项目介绍",
  collapsed: false,
  items: [
    { text: "vite基础配置", link: "/guide/introduce/viteConfig" },
    { text: "vite插件集成", link: "/guide/introduce/vitePlugin" },
    { text: "vite环境变量", link: "/guide/introduce/environment" },
    { text: "H5适配方案", link: "/guide/introduce/viewport" },
    { text: "UI组件库", link: "/guide/introduce/miracle-ui" },
    { text: "Pinia 状态管理", link: "/guide/introduce/pinia" },
    { text: "vue-router", link: "/guide/introduce/router" },
    { text: "axios 封装", link: "/guide/introduce/axios" },
    { text: "alias 别名", link: "/guide/introduce/alias" },
    { text: "proxy 跨域", link: "/guide/introduce/proxy" },
    { text: "统一开发规范", link: "/guide/introduce/lint" },
    { text: "utils工具", link: "/guide/introduce/utils" },
    { text: "plop代码模版生成", link: "/guide/introduce/plop" },
    { text: "H5和原生交互", link: "/guide/introduce/interaction" }
  ]
};

export default introduce;
