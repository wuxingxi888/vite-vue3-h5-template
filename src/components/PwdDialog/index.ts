/*
 * @Author: 吴星喜 wuxingxi888@163.com
 * @Date: 2023-02-08 16:46:20
 * @LastEditors: 吴星喜 wuxingxi888@163.com
 * @LastEditTime: 2023-02-08 16:51:12
 * @FilePath: /vite-vue3-h5-template/src/components/PwdDialog/index.ts
 * @Description: 密码输入框
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
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
				message: '这里是文字提示',
				showClose: true,
				overlay: true,
				closeOnClickOverlay: false,
				inputComplete: Function
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
