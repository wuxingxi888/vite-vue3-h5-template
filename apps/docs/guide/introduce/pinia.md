# Pinia 状态管理

Pinia 是 Vue
3 的轻量级状态管理库，也是 Vue 官方推荐的状态管理方案。它比 Vuex 更简洁、更易用，同时提供了更好的 TypeScript 支持。

## 为什么选择 Pinia

本项目选择 Pinia 作为状态管理方案，主要基于以下优势：

1. **简洁的 API**：相比 Vuex，Pinia 的 API 更加简洁直观
2. **完整的 TypeScript 支持**：提供完整的类型推断，开发体验更佳
3. **模块化设计**：天然支持模块化，无需嵌套模块
4. **轻量级**：体积更小，性能更好
5. **Vue Devtools 支持**：提供良好的开发调试体验
6. **服务端渲染支持**：支持 SSR 场景

## 项目集成

项目在 [src/store/index.ts] 中配置了 Pinia，并集成了 [pinia-plugin-persistedstate]
插件用于状态持久化：

```ts
import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(piniaPluginPersistedstate);

export function setupStore(app: App<Element>) {
  app.use(store);
}
```

在 [src/main.ts] 中挂载状态管理：

```ts
async function bootstrap() {
  const app = createApp(App);
  // 挂载状态管理
  setupStore(app);
  // ...
  app.mount('#app', true);
}
```

## 核心模块

项目中定义了多个状态管理模块，分别用于管理不同类型的数据：

### 用户模块 (user.ts)

管理用户相关的状态，包括用户信息和认证令牌：

```ts
export const useUserStore = defineStore('app-user-store', {
  state: () => ({
    userInfo: {
      userId: '',
      username: '',
      nickname: '',
      avatar: '',
      cover: '',
      gender: 0,
      phone: '',
    },
    token: '',
  }),
  getters: {
    getUserInfo: state => state.userInfo,
    getToken: state => state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token || '';
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    async Login(params: LoginParams) {
      // 登录逻辑
    },
    async GetUserInfo() {
      // 获取用户信息
    },
    async Logout() {
      // 登出逻辑
    },
  },
  persist: {
    key: 'CURRENT-USER',
    storage: window.localStorage,
    // 生产环境使用加密存储
  },
});
```

### 主题模块 (theme.ts)

管理应用主题相关的状态：

```ts
export const useThemeStore = defineStore('app-theme-store', {
  state: () => ({
    themeMode: 'light', // 主题模式
    themeColor: '#1976d2', // 主题色
    themeColorList: [], // 主题色列表
    isPageAnimate: true, // 是否开启动画
    pageAnimateType: 'fade-slide', // 动画类型
  }),
  getters: {
    getThemeMode(): 'light' | 'dark' {
      return this.themeMode;
    },
    getThemeColor(): string {
      return this.themeColor;
    },
    // ...
  },
  actions: {
    setThemeMode(mode: 'light' | 'dark'): void {
      this.themeMode = mode;
    },
    setPageAnimateType(type: string): void {
      this.pageAnimateType = type;
    },
  },
  persist: {
    key: 'THEME-SETTING',
    storage: window.localStorage,
  },
});
```

### 路由模块 (route.ts)

管理路由相关的状态，包括菜单和缓存组件：

```ts
export const useRouteStore = defineStore('app-route-store', {
  state: () => ({
    menus: [], // 菜单列表
    routers: [], // 路由列表
    keepAliveComponents: [], // 需要缓存的组件
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
  },
  actions: {
    setRouters(routers: RouteRecordRaw[]) {
      this.routers = routers;
    },
    setMenus(menus: RouteRecordRaw[]) {
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: string[]) {
      this.keepAliveComponents = compNames;
    },
  },
});
```

### 应用模块 (app.ts)

管理全局应用状态：

```ts
export const useAppStore = defineStore('app-global-store', {
  state: () => ({
    openEruda: false, // 是否开启 Eruda 调试工具
  }),
  getters: {
    getOpenEruda(): boolean {
      return this.openEruda;
    },
  },
  actions: {
    setOpenEruda(openEruda: boolean) {
      this.openEruda = openEruda;
      // 动态加载或移除 Eruda 脚本
    },
  },
});
```

## 状态持久化

项目使用 [pinia-plugin-persistedstate]
插件实现状态持久化，可以将指定的状态存储到 localStorage 或 sessionStorage 中。

```ts
persist: {
  key: 'THEME-SETTING',
  storage: window.localStorage,
  serializer: {
    serialize: isProdMode()
      ? (value: StateTree) => {
          return encryptAES(value)
        }
      : JSON.stringify,
    deserialize: isProdMode()
      ? (value: string) => {
          return JSON.parse(decryptAES(value))
        }
      : JSON.parse
  }
}
```

在生产环境中，项目还对持久化数据进行了加密处理，提高数据安全性。

## 使用示例

在组件中使用 Pinia store：

```vue
<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/theme';

  // 获取 store 实例
  const userStore = useUserStore();
  const themeStore = useThemeStore();

  // 访问状态
  const userInfo = userStore.getUserInfo;
  const themeMode = themeStore.getThemeMode;

  // 调用 actions
  userStore.setToken('new-token');
  themeStore.setThemeMode('dark');

  // 使用解构赋值访问状态
  const { nickname, avatar } = userStore.getUserInfo;
</script>
```

使用 computed 属性保持响应性：

```ts
import { computed } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();

// 保持响应性的 getter
const themeColor = computed(() => themeStore.getThemeColor);

// 双向绑定的 computed
const themeMode = computed({
  get: () => themeStore.getThemeMode,
  set: val => themeStore.setThemeMode(val),
});
```

## 热更新支持

项目为所有 store 模块添加了热更新支持，提高开发体验：

```ts
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
```

## 最佳实践

1. **模块化组织**：按功能将状态划分为不同的模块
2. **命名规范**：store 名称使用 `useXxxStore` 格式
3. **状态持久化**：合理使用持久化插件，敏感数据加密存储
4. **类型安全**：充分利用 TypeScript 类型推断
5. **避免直接修改状态**：通过 actions 修改状态，保持状态变更的可追踪性

Pinia 为项目提供了强大而灵活的状态管理能力，使得复杂应用的状态管理变得更加简单和可维护。
