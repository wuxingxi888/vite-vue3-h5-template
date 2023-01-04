/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { Plugin } from 'vite'
import viteCompression from 'vite-plugin-compression'

export function configCompressPlugin(
	compress: 'gzip' | 'brotli' | 'none',
	deleteOriginFile = false
): Plugin | Plugin[] {
	const compressList = compress.split(',')

	const plugins: Plugin[] = []

	if (compressList.includes('gzip')) {
		plugins.push(
			viteCompression({
				threshold: 1024000, // 超过1mb开始压缩
				ext: '.gz',
				deleteOriginFile
			})
		)
	}

	if (compressList.includes('brotli')) {
		plugins.push(
			viteCompression({
				threshold: 1024000, // 超过1mb开始压缩
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile
			})
		)
	}
	return plugins
}
