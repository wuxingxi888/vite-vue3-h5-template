/**
 * @name ConfigRestartPlugin
 * @description 按需引入样式文件
 */

import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

export const configStyleImportPlugin = () => {
	return createStyleImportPlugin({
		resolves: [VantResolve()]
	})
}
