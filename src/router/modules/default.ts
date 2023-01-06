import { RouteRecordRaw } from 'vue-router'

export const defaultRouter: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '',
		component: () => import('@/views/demo.vue'),
		meta: {
			title: '示例',
			keepAlive: false,
			index: 1,
			transition: {
				enable: true,
				name: ''
			}
		}
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('@/views/test.vue'),
		meta: {
			title: '测试',
			keepAlive: false,
			index: 2,
			transition: {
				enable: true,
				name: 'fade'
			}
		}
	}
]
