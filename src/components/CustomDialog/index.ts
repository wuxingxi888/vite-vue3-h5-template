import { App, createApp } from 'vue'
import dialog from './index.vue'

import { Icon, Toast, OverLay, ShortPassword, Popup } from '@nutui/nutui'

class Dialog {
	Instance: App<any> | undefined
	mountNode = document.createElement('div')

	close = () => {
		if (this.Instance !== undefined) {
			this.Instance.unmount()
			document.body.removeChild(this.mountNode)
			this.Instance = undefined
		}
	}

	show = (options) => {
		if (this.Instance !== undefined) this.close()

		return new Promise<string>((resolve, reject) => {
			const defaultOptions = {
				title: '提示',
				message: null,
				tips: '忘记密码',
				dePass: '960413',
				eMsg: '请输入密码',
				pLength: 6,
				showClose: true,
				closeOnClickOverlay: false
			}

			Object.assign(defaultOptions, options)

			this.Instance = createApp(dialog, {
				options: defaultOptions,
				close: this.close,
				cancel: () => {
					this.close()
					reject('取消')
				},
				confirm: (key: string) => {
					this.close()
					resolve(key)
				}
			})

			this.Instance.use(ShortPassword)
				.use(OverLay)
				.use(Popup)
				.use(Toast)
				.use(Icon)
				.mount(this.mountNode)
			document.body.appendChild(this.mountNode)
		})
	}
}

export default new Dialog()
