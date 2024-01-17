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
