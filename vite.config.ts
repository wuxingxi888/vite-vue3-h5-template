/*
 * @Author: 吴星喜 wuxingxi888@163.com
 * @Date: 2023-01-05 16:37:32
 * @LastEditors: 吴星喜 wuxingxi888@163.com
 * @LastEditTime: 2023-02-08 15:54:32
 * @FilePath: /vite-vue3-h5-template/vite.config.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { wrapperEnv, getNowTime, createBuildJson } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import { createBuild } from './build/vite/build'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg
// 应用信息
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: getNowTime()
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd() // 当前工作目录
	const isBuild = command === 'build' // 是否是构建 serve
	const env = loadEnv(mode, root) // 加载env环境
	const viteEnv = wrapperEnv(env)

	const { VITE_PUBLIC_PATH, VITE_ENV } = viteEnv

	createBuildJson(VITE_ENV)

	return {
		base: VITE_PUBLIC_PATH,
		root,
		plugins: createVitePlugins(viteEnv, isBuild, mode),
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
					additionalData: `
						@import "@/styles/base.scss";
						@import "@/styles/mixin.scss";
						@import "@/styles/variables.scss";
					`
				}
			}
		},
		server: {
			host: true,
			hmr: true, //开启热更新
			proxy: createProxy()
		},
		build: createBuild(viteEnv),
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		}
	}
})
