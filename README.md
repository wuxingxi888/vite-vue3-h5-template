# vite-vue3-h5-template

[vite-vue3-h5-template](https://github.com/wuxingxi888/vite-vue3-h5-template)，是基于 vite4 + vue3 + TypeScript + pinia + sass + ( Vant4 or NutUI ) + viewport 适配方案 + axios 封装，构建移动端快速开发模版

<div style="display: flex; justify-content: center;">
 <img src="https://s2.loli.net/2023/02/15/UM9QzYfFvLXk7hg.png" width="200" style="display:inline; ">
</div>

## node 版本要求

本示例 Node.js v16.6.0，你也可以使用[nvm](https://github.com/nvm-sh/nvm)或[nvm-windows](https://github.com/coreybutler/nvm-windows)在同一台电脑上管理多个 node 版本。

## 包管理器

本项目采用 pnpm 包管理器,如果没有请先安装 pnpm。

## 启动项目

master 分支代码为稳定版本，test 分支代码是最新版

```js

// 拉取项目
git clone https://github.com/wuxingxi888/vite-vue3-h5-template.git

// 进入项目目录
cd vite-vue3-h5-template

// 全局安装 pnpm
npm i -g pnpm

// 安装依赖
pnpm install

// 启动项目
pnpm dev

// 本地预览打包的项目
pnpm preview

// 打包 test 环境
pnpm build:test

// 打包 prod 环境
pnpm build:prod

```

<span id="top">目录</span>

-   [√ vite](#vite)
-   [√ 配置多环境变量](#env)
-   [√ viewport 适配方案](#viewport)
-   [√ 多 UI 组件库供选择](#ui)
-   [√ Pinia 状态管理](#Pinia)
-   [√ vue-router 4](#router)
-   [√ axios 封装及接口管理](#axios)
-   [√ vite.config.ts 基础配置](#base)
-   [√ alias](#alias)
-   [√ proxy 跨域](#proxy)
-   [√ Eslint+Pettier+stylelint 统一开发规范 ](#lint)

### <span id="vite">✅ vite </span>

基于原生 ES 模块提供了丰富的内建功能，如速度快到惊人的模块热更新（HMR），使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。更多关于[vite](https://cn.vitejs.dev/guide/)

模版集成了如下的 vite 插件

-   unplugin-auto-import（按需加载，自动引入）
-   unplugin-vue-components（按需加载，自动引入组件）
-   vite-plugin-compression（开启.gz 压缩）
-   vite-plugin-eruda（控制台，方便移动端调试）
-   vite-plugin-imagemin（图片压缩）
-   vite-plugin-progress（构建显示进度条）
-   vite-plugin-style-import（按需引入样式文件）
-   rollup-plugin-visualizer（打包体积分析）

### <span id="env">✅ 配置多环境变量 </span>

`package.json` 里的 `scripts` 配置 `dev` `prod` `build:test` `build:prod`

通过 `--mode xxx` 来执行不同环境

-   通过 `pnpm dev` 启动本地环境参数 , 执行 `development`
-   通过 `pnpm prod` 启动正式环境参数 , 执行 `production`

通过 `build --mode  xxx` 来打包不同环境

-   通过 `pnpm build:test` 打包测试环境参数 , 执行 `test`
-   通过 `pnpm build:prod` 打包正式环境参数 , 执行 `prod`

```javascript
"scripts": {
    "dev": "vite --mode development",
    "prod": "vite --mode production",
    "build:test": "vue-tsc --noEmit && vite build --mode test && esno ./src/utils/build.ts",
    "build:prod": "vue-tsc --noEmit && vite build --mode production && esno ./src/utils/build.ts",
}
```

### <span id="viewport">✅ viewport 适配方案 </span>

不用担心，项目已经配置好了 `viewport` 适配，下面仅做介绍：

-   [cnjm-postcss-px-to-viewport](https://github.com/cnjm/postcss-px-to-viewport) 是一款 `postcss` 插件，用于将单位转化为 `vw`， 现在很多浏览器对`vw`的支持都很好，适配首选方案。

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: { overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'] },
    'cnjm-postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      include: [],
      exclude: [], // 设置忽略文件，用正则做目录名匹配
      customFun: ({ file }) => {
        // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
        const designWidth = judgeComponent(file) ? 375 : 750;
        return designWidth;
      },
  },
};
```

**新手必看，老鸟跳过**

很多小伙伴会问我，适配的问题, 因为我们使用的是 Vant UI，所以必须根据 Vant UI 375 的设计规范走，一般我们的设计会将 UI 图上传到蓝湖，我们就可以需要的尺寸了。下面就大概普及一下 rem。

我们知道 `1rem` 等于 `html` 根元素设定的 `font-size` 的 `px` 值。Vant UI 设置 `rootValue: 37.5` , 你可以看到在 iPhone 6 下看到 （ `1rem 等于 37.5px` ）：

```html
<html data-dpr="1" style="font-size: 37.5px;"></html>
```

切换不同的机型，根元素可能会有不同的 `font-size` 。当你写 css px 样式时，会被程序换算成 `rem` 达到适配。

因为我们用了 Vant 的组件，需要按照 `rootValue: 37.5` 来写样式。

举个例子：设计给了你一张 750px \* 1334px 图片，在 iPhone6 上铺满屏幕, 其他机型适配。

-   当`rootValue: 75` , 样式 `width: 750px;height: 1334px;` 图片会撑满 iPhone6 屏幕，这个时候切换其他机型，图片也会跟着撑满。
-   当`rootValue: 37.5` 的时候，样式 `width: 375px;height: 667px;` 图片会撑满 iPhone6 屏幕。

也就是 iphone 6 下 375px 宽度写 CSS。其他的你就可以根据你设计图，去写对应的样式就可以了。

当然，想要撑满屏幕你可以使用 100%，这里只是举例说明。

```html
<img class="image" src="https://s2.loli.net/2023/02/15/UM9QzYfFvLXk7hg.png" />

<style>
	/* rootValue: 75 */
	.image {
		width: 750px;
		height: 1334px;
	}

	/* rootValue: 37.5 */
	.image {
		width: 375px;
		height: 667px;
	}
</style>
```

### <span id="ui">✅ 多 UI 组件库供选择 </span>

Vite 构建工具，使用 vite-plugin-style-import 和 unplugin-vue-components/vite 实现按需引入。

#### 安装插件

```bash
yarn add vite-plugin-style-import -D
yarn add unplugin-vue-components/vite -D
```

#### 使用组件库

nutUI 没有按需加载的 resolvers，style 需要自己配置按需加载

在 `config/vite/plugins/styleImport.ts` 设置

```javascript
  // 按需加载样式文件
  ...
    createStyleImportPlugin({
      resolves: [NutuiResolve()],
    }),
  ...
```

项目在 `src/plugins/nutUI.ts` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用

```javascript
// 按需全局引入nutUI组件
import Vue from "vue";
import { Button, Cell, CellGroup } from "@nutui/nutui";
export const nutUiComponents = [Button, Cell, CellGroup];

// 在main.ts文件中引入
nutUiComponents.forEach((item) => {
	app.use(item);
});
```

vant 可以使用组件按需加载

在`config/vite/plugins/component.ts`下

```javascript
import { VueUseComponentsResolver, VantResolver } from 'unplugin-vue-components/resolvers';
...
resolvers: [VantResolver()],
...
```

#### 不需要某个组件库

nutUI 需删除`src/plugins/nutUI.ts`和`main.ts`文件下的引入

vant 只需删除对应的 resolvers 即可

删除后需全局搜索删除不需要的组件，避免报错

### <span id="Pinia">✅ Pinia 状态管理</span>

下一代 vuex，使用极其方便，ts 兼容好

目录结构

```bash
├── store
│   ├── modules
│   │   └── user.js
│   ├── index.js
```

使用

```html
<script lang="ts" setup>
	import { useAppStore } from "@/store/modules/app";
	const appStore = useAppStore();
	appStore.setToken("");
</script>
```

### <span id="router">✅ Vue-router </span>

本案例采用 `history` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `hash` 模式， `vue.config.js` 中的 `publicPath` 要做对应的**修改**

前往:[vue.config.js 基础配置](#base)

```javascript
import Vue from "vue";
import { createRouter, createWebHistory, Router } from "vue-router";

Vue.use(Router);
export const router = [
	{
		name: "root",
		path: "/",
		redirect: "/home",
		component: () => import("@/layout/basic/index.vue"),
	},
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
```

更多:[Vue Router](https://router.vuejs.org/zh/introduction.html)

### <span id="axios">✅ Axios 封装及接口管理</span>

`utils/request.ts` 封装 axios , 开发者需要根据后台接口做修改。

-   `JSONbig` 解决超过 16 位数字精度丢失问题
-   `config.loading` 在接口里配置是否开启 loading 动画
-   `config.headers!.common['Authorization']` 请求头携带 token
-   `service.interceptors.response.use` 接口响应处理 如 错误提示，重新登陆

```javascript
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import JSONbig from 'json-bigint' //解决超过 16 位数字精度丢失问题
import { showToast, showLoadingToast, closeToast } from 'vant/lib/toast'
import { showDialog } from 'vant/lib/dialog'
import { useAppStore } from '@/store/app'
import router from '@/router/index'

export class StatusCode {
	static SUCCESS = '200'
	static ERROR = 400
	static OUTDATE_TOKEN = 1001
}

const service = axios.create({
	timeout: 6000,
	transformResponse: [
		(data) => {
			try {
				return JSON.parse(JSON.stringify(JSONbig.parse(data)))
			} catch (err) {
				return { data }
			}
		}
	]
})

// Request interceptors
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// 加载动画
		if (config.loading) {
			showLoadingToast({
				message: '加载中...',
				forbidClick: true
			})
		}
		const appStore = useAppStore()
		if (appStore.token) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			config.headers!.common['Authorization'] = appStore.token
		}
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

// Response interceptors
service.interceptors.response.use(
	async (response: AxiosResponse) => {
		closeToast()
		const res = response.data
		if (res.code === StatusCode.SUCCESS) {
			return response.data
		} else {
			if (res.code === StatusCode.OUTDATE_TOKEN) {
				// token 失效
				showDialog({
					message: '登录失效，请重新登录',
					theme: 'round-button'
				}).then(() => {
					router.replace('/')
				})
				return Promise.reject(res)
			} else {
				showToast(res.msg)
				return Promise.reject(res)
			}
		}
	},
	(error: any) => {
		showToast(error.response ? `请求异常${error.response.status}` : '网络超时，请刷新重试')
		return Promise.reject(error)
	}
)

export default service
```

### 使用

```javascript
/**
 * post请求
 */
export const fetchAuthCode = (data: AuthCode) => {
	return (
		request <
		IResponseType >
		{
			url: envConfig.baseApi + "xxxxx",
			method: "post",
			data,
			loading: true,
		}
	);
};

/**
 * get请求
 */
export const fetchTagList = () => {
	return (
		request <
		IResponseType >
		{
			url: envConfig.baseApi + "xxxxxx",
			method: "get",
			loading: false,
		}
	);
};
```

### <span id="base">✅ vite.config.ts 基础配置 </span>

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

### <span id="alias">✅ 配置 alias 别名 </span>

```javascript
resolve: {
  alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
},
```

### <span id="proxy">✅ 配置 proxy 跨域 </span>

```javascript
server: {
    proxy: {
        '/api': {
            target: 'https://baidu.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
},
```

### <span id="lint">✅ Eslint+Pettier+stylelint 统 ˜ 开发规范 </span>

根目录下的`.eslintrc.js`、`.stylelint.config.js`、`.prettier.config.js`内置了 lint 规则，帮助你规范地开发代码，有助于提高团队的代码质量和协作性，可以根据团队的规则进行修改

# 关于我

扫描添加下方的微信并备注加交流群，交流学习，及时获取代码最新动态。

 <div style="display: flex; justify-content: flex-start; align-items: center;">
    <img src="https://s2.loli.net/2023/02/15/BhiFcTgrt5aXvKO.jpg" width="100" style="display:inline; ">
    <img src="https://s2.loli.net/2023/02/15/6GfBpXMNLZqH7sV.jpg" width="100" style="display:inline; ">
</div>
如果对你有帮助送我一颗珍贵的小星星（づ￣3￣）づ╭❤～
