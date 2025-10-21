/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
export function configHtmlPlugin(env: ViteEnv): Plugin | Plugin[] {
	const plugins: Plugin[] = []

	const { VITE_GLOB_APP_TITLE } = env

	const htmlPlugin = createHtmlPlugin({
		minify: true,
		inject: {
			data: {
				title: VITE_GLOB_APP_TITLE
			}
		}
	}) as Plugin[]

	if (htmlPlugin) {
		plugins.push(...htmlPlugin)
	}

	return plugins
}
