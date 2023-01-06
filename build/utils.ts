import { IConfig } from '@/config'
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

// 获取当前日期
export const getCurrentDate = () => {
	const time = new Date()
	const a = time.toLocaleDateString()
	const x = a.split('/')
	if (x[1].length < 2) {
		x[1] = '0' + x[1]
	}
	if (x[2].length < 2) {
		x[2] = '0' + x[2]
	}
	return x.join('')
}

// 版本号自增
export const updateVersion = (build: IConfig): IConfig => {
	if (getCurrentDate() === String(build.version.split('.')[1])) {
		let x = Number(build.version.split('.')[2])
		x = x + 1
		build.version = `1.${getCurrentDate()}.${x}`
	} else {
		build.version = `1.${getCurrentDate()}.1`
	}
	return build
}

// 获取
export const getBuildObj = async (filePath: string) => {
	return new Promise<any>((resolve, reject) => {
		fs.stat(filePath, (err, stats) => {
			if (err) return console.error(err)
			if (!stats.isFile()) return console.error('Not a file')

			const data = fs.readFileSync(filePath)
			const prefix = data.toString().split('{')[0]
			const jsonStr = `{${data.toString().split('{')[1]}`
				.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":')
				.replace(/'/g, '"')
			const tempObj = JSON.parse(jsonStr)
			resolve({ prefix, jsonObj: tempObj })
		})
	})
}

// 生成项目信息json数据
export const createBuildJson = async (envName: string) => {
	const oFileName = `env.${envName}.ts`
	const oFilePath = `./src/config/${oFileName}`

	getBuildObj(oFilePath).then(({ prefix, jsonObj }) => {
		const result = updateVersion(jsonObj)

		const newBuffer = prefix + JSON.stringify(result)

		// 改变原始数据
		fs.writeFile(oFilePath, newBuffer, 'utf-8', function (err) {
			if (err) {
				console.log('err', err)
			} else {
				console.log('The original data is written')
			}
		})

		// 生成可读取的json文件
		fs.writeFile('./build.json', JSON.stringify(result), 'utf-8', function (err) {
			if (err) {
				console.log('errr')
			} else {
				console.log('The write to build.json is complete')
			}
		})
	})
}
