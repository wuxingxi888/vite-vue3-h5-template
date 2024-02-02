// 引入全局样式
import '@/styles/index.scss'
// 引入全局vue api
import 'vue-global-api'

import { vantPlugins } from './vantComponents'
import NativeCallJs from '@/services/nativeCallJs'
import { directives } from '@/utils/directives'
import { useDevtool } from './devtool'

window.NativeCallJs = NativeCallJs

export const installPlugins = (app) => {
	vantPlugins(app) // UI组件
	useDevtool()
	directives(app) // 指令
}
