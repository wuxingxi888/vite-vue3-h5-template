import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteVConsole } from 'vite-plugin-vconsole'
import legacyPlugin from '@vitejs/plugin-legacy'
import * as path from 'path'
import { configStyleImportPlugin } from './styleImport'
import { configAutoImportPlugin } from './autoImport'
import { configAutoComponentsPlugin } from './autocomponents'
import { configCompressPlugin } from './compress'
import { configImgCompressPlugin } from './imgCompress'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, mode: string) {
	const { VITE_ENV, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

	const vitePlugins: (Plugin | Plugin[])[] = [
		// have to
		vue(),
		// have to
		vueJsx({
			include: /\.(jsx|tsx)/
		}),
		viteVConsole({
			entry: [path.resolve('src/main.ts')], // 每个页面的入口文件，和上面不一样的地方，这里是一个数组
			localEnabled: mode !== 'production',
			enabled: mode !== 'production',
			config: {
				maxLogNumber: 1000,
				theme: 'dark'
			}
		}),
		legacyPlugin({
			targets: ['chrome 52'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			renderLegacyChunks: true,
			polyfills: [
				'es.symbol',
				'es.array.filter',
				'es.promise',
				'es.promise.finally',
				'es/map',
				'es/set',
				'es.array.for-each',
				'es.object.define-properties',
				'es.object.define-property',
				'es.object.get-own-property-descriptor',
				'es.object.get-own-property-descriptors',
				'es.object.keys',
				'es.object.to-string',
				'web.dom-collections.for-each',
				'esnext.global-this',
				'esnext.string.match-all'
			]
		})
	]
	// vite-plugin-style-import
	vitePlugins.push(configStyleImportPlugin(isBuild))

	// unplugin-vue-components
	vitePlugins.push(configAutoComponentsPlugin())

	// unplugin-auto-import
	vitePlugins.push(configAutoImportPlugin())

	// The following plugins only work in the production environment
	if (isBuild) {
		// rollup-plugin-gzip
		vitePlugins.push(
			configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
		)

		// image compress
		vitePlugins.push(configImgCompressPlugin())
	}
	return vitePlugins
}
