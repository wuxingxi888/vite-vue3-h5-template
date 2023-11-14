import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacyPlugin from '@vitejs/plugin-legacy'
import { configStyleImportPlugin } from './styleImport'
import { configAutoImportPlugin } from './autoImport'
import { configAutoComponentsPlugin } from './autocomponents'
import { configCompressPlugin } from './compress'
import { configImgCompressPlugin } from './imgCompress'
import { ConfigVisualizerConfig } from './visualizer'
import { ConfigProgressPlugin } from './progress'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, mode: string) {
	const { VITE_ENV, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

	const vitePlugins: (Plugin | Plugin[])[] = [
		// vue支持
		vue(),
		// JSX支持
		vueJsx({
			include: /\.(jsx|tsx)/
		}),
		// es兼容性支持
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
	// 自动按需引入样式
	vitePlugins.push(configStyleImportPlugin())

	// 自动按需引入组件
	vitePlugins.push(configAutoComponentsPlugin())

	// 自动按需引入依赖
	vitePlugins.push(configAutoImportPlugin())

	// 编译开启
	if (isBuild) {
		// 开启.gz压缩  rollup-plugin-gzip
		vitePlugins.push(
			configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
		)

		// 图片压缩
		vitePlugins.push(configImgCompressPlugin())
	}

	// 构建时显示进度条
	vitePlugins.push(ConfigProgressPlugin())

	// 打包分析rollup-plugin-visualizer
	vitePlugins.push(ConfigVisualizerConfig())

	return vitePlugins
}
