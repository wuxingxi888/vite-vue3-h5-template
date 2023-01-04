import { RouteRecordRaw } from 'vue-router'

export const defaultRouter: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('@/views/demo.vue'),
		meta: { title: '示例', keepAlive: false, transition: 'van-fade' }
	}
]
