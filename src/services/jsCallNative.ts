export default class JsCallNative {
	static AppKey = 'android'

	static judgeSystem() {
		const u = navigator.userAgent
		const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
		const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		return { isAndroid, isIOS }
	}

	/**
	 * @description: xxxx
	 * @param {number} type 0:xx 1:微信 2:xx
	 * @param {string} url xxx
	 * @return {*}
	 */
	static xxx(type: number, url: string) {
		const { isAndroid } = this.judgeSystem()
		try {
			if (isAndroid) {
				window[this.AppKey].xxx(type, url)
			} else {
				window.webkit.messageHandlers.xxx.postMessage({ type, url })
			}
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * @description: xxxx 无参数
	 * @return {*}
	 */
	static vvv() {
		const { isAndroid } = this.judgeSystem()
		try {
			if (isAndroid) {
				window[this.AppKey].vvv()
			} else {
				window.webkit.messageHandlers.vvv.postMessage({})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
