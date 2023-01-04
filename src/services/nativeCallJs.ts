import emitter from '@/utils/emit'

export default class NativeCallJs {
	static judgeSystem() {
		const u = navigator.userAgent
		const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
		const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		return { isAndroid, isIOS }
	}

	/**
	 * @description: xxx
	 * @param {object} data “{num}”
	 * @return {*}
	 */
	static xxx(data: string) {
		const { isAndroid } = this.judgeSystem()
		if (isAndroid) {
			emitter.emit('xxx', JSON.parse(data))
		} else {
			emitter.emit('xxx', data)
		}
	}
}
