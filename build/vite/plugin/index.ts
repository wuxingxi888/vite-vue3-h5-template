import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configStyleImportPlugin } from './styleImport'
import { configAutoImportPlugin } from './autoImport'
import { configAutoComponentsPlugin } from './autocomponents'
import { configCompressPlugin } from './compress'
import { configImageminCompressPlugin } from './imageminCompress'
import { configVisualizerConfig } from './visualizer'
import { configProgressPlugin } from './progress'
import { configLegacyPlugin } from './legacy'
import { configCdnImportPlugin } from './cdnImport'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, mode: string) {
	const { VITE_ENV, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

	const vitePlugins: (Plugin | Plugin[])[] = [
		// vue支持
		vue(),
		// JSX支持
		vueJsx({
			include: /\.(jsx|tsx)/
		})
	]
	// 自动按需引入样式
	vitePlugins.push(configStyleImportPlugin())

	// 自动按需引入组件
	vitePlugins.push(configAutoComponentsPlugin())

	// 自动按需引入依赖
	vitePlugins.push(configAutoImportPlugin())

	// es兼容性支持
	vitePlugins.push(configLegacyPlugin())

	// 编译开启
	if (isBuild) {
		// CDN导入
		vitePlugins.push(configCdnImportPlugin())

		// 开启.gz压缩  rollup-plugin-gzip （nginx也需要配合修改）
		vitePlugins.push(
			configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
		)

		// 图片压缩（此插件需使用魔法下载，根据实际情况使用）
		vitePlugins.push(configImageminCompressPlugin())
	}

	// 构建时显示进度条
	vitePlugins.push(configProgressPlugin())

	// 打包分析rollup-plugin-visualizer
	vitePlugins.push(configVisualizerConfig())

	return vitePlugins
}
