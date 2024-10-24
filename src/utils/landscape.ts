// import screenfull from 'screenfull'

class landscape {
	evt = 'onorientationchange' in window ? 'orientationchange' : 'resize'

	width = document.documentElement.clientWidth

	height = document.documentElement.clientHeight

	body = document.body

	constructor() {
		const width = Math.min(this.width, this.height)
		const height = Math.max(this.width, this.height)

		if (window.orientation === 180 || window.orientation === 0) {
			this.body.setAttribute(
				'style',
				`top:${(height - width) / 2}px;left:${
					0 - (height - width) / 2
				}px;transform:'rotate(90deg)';transform-origin:'50% 50%';width:${height}px;height:${width}px`
			)
		}
	}

	reset = () => {
		const width = Math.min(this.width, this.height)
		const height = Math.max(this.width, this.height)

		if (window.orientation === 180 || window.orientation === 0) {
			console.log('竖屏状态')
			// 竖屏状态
			this.body.setAttribute(
				'style',
				`top:${(height - width) / 2}px;left:${
					0 - (height - width) / 2
				}px;transform:'rotate(90deg)';transform-origin:'50% 50%';width:${height}px;height:${width}px`
			)
		} else if (window.orientation === 90 || window.orientation === -90) {
			console.log('横屏状态')
			// 横屏状态
			this.body.setAttribute(
				'style',
				`top:0;left:0;transform:'none';transform-origin:'50% 50%';width:${height}px;height:${width}px`
			)
		}

		window.location.reload()

		// 切换之后强制全屏
		// if (screenfull.isEnabled) {
		// 	screenfull.request()
		// }
	}

	init = () => {
		window.addEventListener('orientationchange', this.reset, false)
	}
}

export default new landscape()
