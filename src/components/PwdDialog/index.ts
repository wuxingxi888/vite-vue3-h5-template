import type { App } from 'vue'
import { createApp } from 'vue'
import DialogComponent from './index.vue' // 组件重命名为DialogComponent
import { PasswordInput, NumberKeyboard } from 'vant'

interface DialogOptions {
	title?: string
	message?: string
	showClose?: boolean
	overlay?: boolean
	closeOnClickOverlay?: boolean
	inputComplete?: (value: string) => void
	customText?: string
	customHandle?: () => void
}

class Dialog {
	private instance: App<any> | undefined

	private mountNode: HTMLDivElement

	constructor() {
		this.mountNode = document.createElement('div')
	}

	public close = () => {
		if (this.instance) {
			this.instance.unmount()
			this.mountNode.innerHTML = '' // 清空内部HTML以避免潜在的内存泄漏
			document.body.removeChild(this.mountNode)
			this.instance = undefined
		}
	}

	public clearPwd = () => {
		if (this.instance) {
			;(this.instance._instance as any).exposed.onClearPwd()
		}
	}

	public pwdError = (msg: string) => {
		if (this.instance) {
			;(this.instance._instance as any).exposed.onPwdError(msg)
		}
	}

	public alert = (options: DialogOptions): Promise<string> => {
		if (this.instance) this.close()

		const defaultOptions: DialogOptions = {
			title: '提示',
			message: '提示信息',
			showClose: true,
			overlay: true,
			closeOnClickOverlay: false,
			inputComplete: () => {
				// TODO: 处理输入完成事件
			},
			customText: '',
			customHandle: () => {
				// TODO: 处理自定义按钮事件
			}
		}

		const dialogOptions = { ...defaultOptions, ...options }

		// 校验options，确保其不包含不合法的值 (示例中未实现具体的校验逻辑)
		if (!this.validateOptions(dialogOptions)) {
			throw new Error('Invalid dialog options')
		}

		return new Promise<string>((resolve, reject) => {
			this.instance = createApp(DialogComponent, {
				options: dialogOptions,
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

			this.instance.use(PasswordInput)
			this.instance.use(NumberKeyboard)

			document.body.appendChild(this.mountNode)
			this.instance.mount(this.mountNode)
		}).catch((error) => {
			console.error('Dialog alert error:', error)
			throw error // 保持原有的异常抛出行为
		})
	}

	private validateOptions(options: DialogOptions): boolean {
		// 添加对options的校验逻辑，这里留空作为示例
		return true
	}
}

export default new Dialog()
