import { Component } from 'vue';

// 定义路由过渡配置的类型
interface TransitionConfig {
	enable: boolean;  	// 是否启用过渡效果
	name?: string; 		// 过渡效果的名称，默认可以为空
}

// 定义路由元信息 (meta) 的类型
interface MetaInfo {
	title?: string; 				// 页面标题，
	keepAlive: boolean; 			// 缓存
	index: number; 					// 页面层级索引
	transition: TransitionConfig; 	// 过渡动画配置
}

// 定义带有 meta 的 RouteRecordRaw 类型
export interface RouteRecordWithMeta {
	path: string;
	name?: string;
	redirect?: string;
	component?: Component;
	meta?: MetaInfo;
}

// 定义一个共享的 transition 配置
const sharedTransition = {
	enable: true,
	name: ''
}

// 定义一个函数用于生成 meta 配置
function generateMeta(title: string, keepAlive: boolean, index: number, transitionConfig: TransitionConfig): MetaInfo {
	return {
		title: title || '默认页面标题',
		keepAlive: keepAlive,
		index: index,
		transition: transitionConfig
	}
}

export const defaultRouter: Array<RouteRecordWithMeta> = [
	{ path: '/:catchall(.*)', redirect: '/404' },
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home.vue'),
		meta: generateMeta('首页', true, 1, sharedTransition)
	},
	{
		path: '/system',
		name: 'system',
		component: () => import('@/views/system/index.vue'),
		meta: generateMeta('系统信息', false, 3, sharedTransition)
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404/index.vue'),
		meta: generateMeta('404', false, 10, sharedTransition)
	},
	{
		path: '/website',
		name: 'website',
		component: () => import('@/components/Website/index.vue'),
		meta: generateMeta('', false, 1, sharedTransition)
	}
]
