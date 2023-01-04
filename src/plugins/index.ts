import { nutuiPlugins } from './nutui'
import NativeCallJs from '@/services/nativeCallJs'

window.NativeCallJs = NativeCallJs

export const installPlugins = (app) => {
	nutuiPlugins(app)
}
