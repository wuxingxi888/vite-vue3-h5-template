import fs from 'fs'
import path from 'path'

/**
 * 是否是 dev 环境
 * @export
 * @param {string} mode
 * @return {*}  {boolean}
 */
export function isDevFn(mode: string): boolean {
	return mode === 'development'
}

/**
 *  是否是 prod 环境
 * @export
 * @param {string} mode
 * @return {*}  {boolean}
 */
export function isProdFn(mode: string): boolean {
	return mode === 'production'
}

// 读取所有环境变量配置文件到process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
	const ret: any = {}

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n')
		realName = realName === 'true' ? true : realName === 'false' ? false : realName

		ret[envName] = realName
		if (typeof realName === 'string') {
			process.env[envName] = realName
		} else if (typeof realName === 'object') {
			process.env[envName] = JSON.stringify(realName)
		}
	}
	return ret
}

// 获取当前时间
export const getNowTime = () => {
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
	const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`
	const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`
	const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`
	const seconds = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`
	return `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`
}
