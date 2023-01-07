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
				name: 'fade'
			}
		}
	}
]
