# Pinia 状态管理

下一代 vuex，使用极其方便，ts 兼容好

目录结构

```bash
├── store
│   ├── modules
│   │   └── app.ts
│   ├── index.js
```

目前 pinia 分为两种编程模式,options API 和 Composition API，我们这边都会列举出来实现的业务逻辑效果是一样的，提供大家思路

### options API:

```javascript
import { defineStore } from 'pinia'
import { isEnvProd } from '@/config'
import { encrypt, decrypt } from '@/utils/encrypt'

export interface IAppState {
	token: string
	openInstallInstance: OpenInstall | null
}

export const useAppStore = defineStore({
	id: 'app',
	state: () =>
		({
			token: '',
			openInstallInstance: null
		} as IAppState),
	actions: {
		setToken(token: string) {
			this.token = `Bearer ${token}`
		},
		setOpenInstall(instance: OpenInstall) {
			this.openInstallInstance = instance
		}
	},
	// 开启数据缓存
	persist: {
		key: 'app',
		storage: window.sessionStorage,
		serializer: {
			serialize: isEnvProd ? encrypt : JSON.stringify,
			deserialize: isEnvProd ? decrypt : JSON.parse
		}
	}
})
```

### Composition API:

```javascript
export const useAppStore = defineStore("app", () => {
	const token = ref("");
	const openInstallInstance = (ref < OpenInstall) | (null > {});

	const setToken = (token: any) => {
		token.value = `Bearer ${token}`;
	};

	setOpenInstall = (instance: OpenInstall) => {
		openInstallInstance.value = instance;
	};
	return {
		token,
		openInstallInstance,
		setToken,
		setOpenInstall,
	};
});
```

使用

```html
<script lang="ts" setup>
	import { useAppStore } from "@/store/modules/app";
	const appStore = useAppStore();
	appStore.setToken("");
</script>
```

### 数据加密

如果是正式环境下 sessionStorage 或者 localStorage 都会加密

```javascript
// 开启数据缓存
	persist: {
		key: 'app',
		storage: window.sessionStorage,
		serializer: {
			serialize: isEnvProd ? encrypt : JSON.stringify,
			deserialize: isEnvProd ? decrypt : JSON.parse
		}
	}
```
