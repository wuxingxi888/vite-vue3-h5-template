class rollingStop {
	check = (mask) => {
		// 判断页面（弹窗）蒙层是否开启
		const arr = document.getElementsByClassName('nut-overlay')
		if (arr.length > 0) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}

	init = () => {
		window.addEventListener('touchmove', this.check, true)
	}
}

export default new rollingStop()
