// 引入全局样式
import '@/styles/index.scss'
// 引入全局vue api
import 'vue-global-api'

import { vantPlugins } from './vantComponents'
import NativeCallJs from '@/services/nativeCallJs'
import { directives } from '@/utils/directives'
import { useDevtool } from './devtool'
import { useUpdater } from './updater'
import { useLoadScript } from './loadScript'

window.NativeCallJs = NativeCallJs

export const installPlugins = (app) => {
	vantPlugins(app) // UI组件
	directives(app)  // 指令
	useDevtool()     // 禁止开发工具
	useUpdater()     // 检测更新
	useLoadScript()  // 动态脚本加载
}
