import { envConfig } from '../config'

/**
 * 动态设置浏览器标题
 * @param title
 */
export const setDocumentTitle = (title?: string) => {
	document.title = title || envConfig.title
}

export const judgeSystem = () => {
	const userAgent = navigator.userAgent
	const userAgents = navigator.userAgent.toLowerCase()
	const isTrident = userAgent.indexOf('Trident') > -1 // IE内核
	const isPresto = userAgent.indexOf('Presto') > -1 // opera内核
	const isWebKit = userAgent.indexOf('AppleWebKit') > -1 // 苹果、谷歌内核
	const isGecko = userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') === -1 // 火狐内核
	const isMobile = !!userAgent.match(/AppleWebKit.*Mobile.*/) // 是否为移动终端
	const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1 // android
	const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios
	const isIPhone = userAgent.indexOf('iPhone') > -1 // 是否为iPhone或者QQHD浏览器
	const isIPad = userAgent.indexOf('iPad') > -1 // 是否iPad
	const isWebApp = userAgent.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
	const isWeiXin = /Micromessenger/i.test(userAgents) // 微信
	return {
		isIOS,
		isAndroid,
		isWeiXin,
		isTrident,
		isPresto,
		isWebKit,
		isGecko,
		isMobile,
		isIPad,
		isIPhone,
		isWebApp
	}
}

// 用来获取url中的某个参数
export const getParamByKey = (paramName: string) => {
	const URL = window.location.href
	const params = JSON.parse(
		`{"${decodeURI(URL.split('?')[1])
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"')}"}`
	)
	if (params[paramName] === undefined) {
		return ''
	}
	return params[paramName]
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

// 检查对象是否为空
const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object

// 手机号码
export const mobileReg = (s: any): boolean => {
	return /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(s)
}

// 六位数短信验证码
export const codeReg = (s: any): boolean => {
	return /^[0-9]{6}$/.test(s)
}
