import { App, createApp } from 'vue'
import dialog from './index.vue'

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

	alert = (options) => {
		if (this.Instance !== undefined) this.close()

		return new Promise<string>((resolve, reject) => {
			const defaultOptions = {
				title: '提示',
				message: '',
				showClose: true,
				overlay: true,
				closeOnClickOverlay: false,
				inputComplete: Function,
				customText: '',
				customHandle: Function
			}

			Object.assign(defaultOptions, options)

			this.Instance = createApp(dialog, {
				options: defaultOptions,
				close: this.close,
				cancel: () => {
					this.close()
					reject('取消')
				},
				confirm: () => {
					this.close()
					resolve('确认')
				}
			})

			this.Instance.mount(this.mountNode)
			document.body.appendChild(this.mountNode)
		})
	}
}

export default new Dialog()
