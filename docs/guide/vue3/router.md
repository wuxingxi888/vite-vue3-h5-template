# vue-router

本案例采用 `history` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `hash` 模式， `vue.config.js` 中的 `publicPath` 要做对应的**修改**

前往:[vue.config.js 基础配置](#base)

```javascript
// 路由
import { RouteRecordRaw } from 'vue-router'

export const defaultRouter: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('@/views/home.vue'),
		meta: {
			title: '首页',
			keepAlive: false,
			index: 1,
			transition: {
				enable: true,
				name: ''
			}
		}
	},
	{
		path: '/system',
		name: 'system',
		component: () => import('@/views/system/index.vue'),
		meta: {
			title: '系统信息',
			keepAlive: false,
			index: 3,
			transition: {
				enable: true,
				name: 'van-fade'
			}
		}
	}
]

// 路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { defaultRouter } from './modules/default'
import { setDocumentTitle } from '@/utils'

const routes = [...defaultRouter]

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
	setDocumentTitle(to.meta.title as string)

	next()
})

export default router
```

### H5 页面跳转动画

根据 meta 标签里面的 transition 对象配置是否开启转场动画，也可以指定 vant 自带的动画效果（可以自定义动画）

```javascript
meta: {
			title: '系统信息',
			keepAlive: false,
			index: 3,
			transition: {
				enable: true,
				name: 'van-fade'
			}
		}
```

``App.vue 里面执行动画效果 （动画逻辑：首先看`transition.enable`是否开启动画，如开启就执行`transition.name` 指定动画 如果该字段为空，则执行默认动画效果）

```javascript
router.beforeEach((to: any, from: any) => {
	if (!to.meta.transition.enable) {
		transitionName.value = "";
	} else {
		if (to.meta.transition.name) {
			transitionName.value = to.meta.transition.name;
		} else if (to.meta.index > from.meta.index) {
			transitionName.value = "van-slide-left";
		} else if (to.meta.index < from.meta.index) {
			transitionName.value = "van-slide-right";
		}
	}
});
```
