import { RouteRecordRaw } from 'vue-router'

export const defaultRouter: Array<RouteRecordRaw> = [
	{ path: '/:catchall(.*)', redirect: '/404' },
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
	},
	{
		path: '/404',
		name: '/404',
		component: () => import('@/views/404/index.vue'),
		meta: {
			title: '404',
			keepAlive: false,
			index: 1,
			transition: {
				enable: true,
				name: 'van-fade'
			}
		}
	}
]
