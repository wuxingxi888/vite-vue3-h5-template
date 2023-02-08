/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

export function configStyleImportPlugin(isBuild: boolean) {
	// return createStyleImportPlugin({
	// resolves: [VantResolve()],
	// libs: [
	// 	// If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
	// 	{
	// 		libraryName: 'vant',
	// 		esModule: true,
	// 		resolveStyle: (name) => {
	// 			return `../es/${name}/style`
	// 		}
	// 	}
	// ]
	// })
}
