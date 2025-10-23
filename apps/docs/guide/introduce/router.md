# Vue Router 路由管理

Vue
Router 是 Vue.js 官方的路由管理器，用于构建单页面应用（SPA）。它深度集成 Vue.js 核心，使得用 Vue.js 构建单页面应用变得轻而易举。

## 为什么选择 Vue Router

本项目选择 Vue Router 作为路由管理方案，主要基于以下优势：

1. **官方支持**：Vue.js 官方推荐的路由管理器
2. **深度集成**：与 Vue.js 核心深度集成，提供无缝开发体验
3. **组件化路由**：路由配置与组件映射，符合 Vue 组件化思想
4. **嵌套路由**：支持复杂的嵌套路由结构
5. **路由守卫**：提供全面的导航控制
6. **动态路由**：支持动态路由匹配和懒加载
7. **完善的 TypeScript 支持**：提供完整的类型定义

## 项目集成

项目在 [src/router/index.ts] 中配置了 Vue Router：

```ts
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { createRouterGuards } from "./router-guards";
import routeModuleList from "./modules";
import { ErrorPageRoute, LoginRoute, RootRoute } from "@/router/base";
import menuRouteList from "./menu";
import { useRouteStoreWidthOut } from "@/store/modules/route";

// 普通路由
export const baseRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, ErrorPageRoute];

// 所有路由
export const allRoutes = [...baseRouter, ...menuRouteList, ...routeModuleList];

const routeStore = useRouteStoreWidthOut();
routeStore.setMenus(menuRouteList);
routeStore.setRouters(allRoutes);

const { VITE_HASH_ROUTE = "false", VITE_PUBLIC_PATH } = import.meta.env;

const history =
  VITE_HASH_ROUTE === "true"
    ? createWebHashHistory(VITE_PUBLIC_PATH as string)
    : createWebHistory(VITE_PUBLIC_PATH as string);

const router = createRouter({
  history,
  routes: allRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
```

在 [src/main.ts] 中挂载路由：

```ts
async function bootstrap() {
  const app = createApp(App);
  // 挂载路由
  setupRouter(app);
  // ...
  app.mount("#app", true);
}
```

## 路由结构

项目采用模块化路由结构，将路由分为几个部分：

### 基础路由 (base.ts)

定义应用的基础路由，包括根路由、登录路由和错误页面路由：

```ts
export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const ErrorPageRoute: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: PageEnum.ERROR_PAGE_NAME,
  component: Layout,
  meta: {
    title: "ErrorPage",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "ErrorPageSon",
      component: () => import("@/views/exception/404.vue"),
      meta: {
        title: "ErrorPage",
      },
    },
  ],
};
```

### 菜单路由 (menu.ts)

定义应用的主要菜单路由，这些路由会显示在底部导航栏中：

```ts
const menuRouteList: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          title: "主控台",
          icon: "i-mage:dashboard-2-fill",
          keepAlive: true,
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
      // 其他菜单项...
    ],
  },
];
```

### 模块路由 (modules.ts)

定义应用的其他功能页面路由：

```ts
const routeModuleList: Array<RouteRecordRaw> = [
  {
    path: "/pullRefreshList",
    name: "PullRefreshList",
    meta: {
      title: "列表刷新加载",
      keepAlive: false,
    },
    component: () => import("@/views/example/pullRefreshList/index.vue"),
  },
  // 其他功能路由...
];
```

## 路由守卫

项目在 [src/router/router-guards.ts] 中实现了路由守卫，用于权限控制和页面状态管理：

```ts
// 路由白名单
const whitePathList = [PageEnum.BASE_LOGIN];

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start();

    // 白名单直接访问
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    // 检查用户认证状态
    const userStore = useUserStore();
    const token = computed(() => userStore.getToken);

    if (!token.value) {
      next(PageEnum.BASE_LOGIN);
      return;
    }

    next();
  });

  router.afterEach((to, _, failure) => {
    // 设置页面标题
    document.title = (to?.meta?.title as string) || document.title;

    // 管理页面缓存
    const routeStore = useRouteStoreWidthOut();
    const keepAliveComponents = routeStore.keepAliveComponents;
    const currentComName: any = to.matched.find(item => item.name === to.name)?.name;

    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive) {
      const index = routeStore.keepAliveComponents.findIndex(name => name === currentComName);
      if (index !== -1) {
        keepAliveComponents.splice(index, 1);
      }
    }

    routeStore.setKeepAliveComponents(keepAliveComponents);
    NProgress.done();
  });
}
```

## 页面缓存

项目通过 [keep-alive] 组件和路由元信息实现页面缓存功能：

```vue
<template>
  <routerView v-slot="{ Component, route }">
    <keep-alive :include="keepAliveComponents">
      <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" :key="route.fullPath" />
  </routerView>
</template>
```

通过在路由配置中设置 `meta.keepAlive` 属性来控制页面是否需要缓存：

```ts
{
  path: '/editNickname',
  name: 'EditNickname',
  meta: {
    title: '修改昵称(该页面已缓存)',
    keepAlive: true
  },
  component: () => import('@/views/mine/EditNickname.vue')
}
```

## 路由模式

项目支持两种路由模式：

1. **History 模式**：使用 HTML5 History API 实现 URL 美化
2. **Hash 模式**：使用 URL hash 实现路由切换

通过环境变量 `VITE_HASH_ROUTE` 控制路由模式：

```ts
const history =
  VITE_HASH_ROUTE === "true"
    ? createWebHashHistory(VITE_PUBLIC_PATH as string)
    : createWebHistory(VITE_PUBLIC_PATH as string);
```

## 动态路由

项目支持动态导入组件，实现路由懒加载：

```ts
component: () => import("@/views/dashboard/index.vue");
```

这种方式可以将组件分割成不同的代码块，按需加载，提高应用的初始加载性能。

## 路由跳转

在组件中使用路由跳转：

```vue
<script setup lang="ts">
  import { useRouter, useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute();

  // 编程式导航
  router.push("/dashboard");
  router.push({ name: "Dashboard" });
  router.go(-1);

  // 获取路由参数
  const userId = route.params.id;
  const query = route.query;
</script>
```

## 最佳实践

1. **模块化管理**：将路由按功能模块划分，便于维护
2. **权限控制**：通过路由守卫实现页面访问权限控制
3. **懒加载**：使用动态导入实现组件懒加载，优化性能
4. **页面缓存**：合理使用 keep-alive 和路由元信息实现页面缓存
5. **路由命名**：为路由命名，便于维护和使用
6. **元信息**：使用路由元信息存储页面标题、图标等额外信息

Vue Router 为项目提供了强大而灵活的路由管理能力，使得单页面应用的开发变得更加简单和高效。
