import { vantPlugins } from './vantComponents'
import NativeCallJs from '@/services/nativeCallJs'
import { directives } from '@/utils/directives'

window.NativeCallJs = NativeCallJs

export const installPlugins = (app) => {
	vantPlugins(app) // UI组件

	directives(app) // 指令
}
