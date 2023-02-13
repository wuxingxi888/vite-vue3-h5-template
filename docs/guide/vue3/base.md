# vite.config.ts 基础配置

如果你的 `Vue Router` 模式是 hash

```javascript
publicPath: './',
```

如果你的 `Vue Router` 模式是 history 这里的 publicPath 和你的 `Vue Router` `base` **保持一致**

```javascript
const { VITE_PUBLIC_PATH, VITE_ENV } = viteEnv
base: VITE_PUBLIC_PATH,
```

项目完整的 vite.config.ts 配置

```javascript
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { wrapperEnv, getNowTime, createBuildJson } from "./build/utils";
import { createVitePlugins } from "./build/vite/plugin";
import { createProxy } from "./build/vite/proxy";
import { createBuild } from "./build/vite/build";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
// 应用信息
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: getNowTime(),
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd(); // 当前工作目录
	const isBuild = command === "build"; // 是否是构建 serve
	const env = loadEnv(mode, root); // 加载env环境
	const viteEnv = wrapperEnv(env);

	const { VITE_PUBLIC_PATH, VITE_ENV } = viteEnv;

	createBuildJson(VITE_ENV);

	return {
		base: VITE_PUBLIC_PATH,
		root,
		plugins: createVitePlugins(viteEnv, isBuild, mode),
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
					additionalData: `
						@import "@/styles/base.scss";
						@import "@/styles/mixin.scss";
						@import "@/styles/variables.scss";
						@import "@nutui/nutui/dist/styles/variables.scss";
					`,
				},
			},
		},
		server: {
			host: true,
			hmr: true, //开启热更新
			proxy: createProxy(),
		},
		build: createBuild(viteEnv),
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
	};
});
```
