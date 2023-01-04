/**
 * @description [ axios 请求封装]
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import JSONbig from 'json-bigint' //解决超过 16 位数字精度丢失问题
import { Dialog, Toast } from '@nutui/nutui'
import { useAppStore } from '@/store/app'
import router from '@/router/index'

export class StatusCode {
	static SUCCESS = 100
	static ERROR = 400
	static OUTDATE_TOKEN = 1001
}

export const toast = Toast.loading('加载中...')

const service = axios.create({
	timeout: 6000,
	transformResponse: [
		(data) => {
			try {
				return JSON.parse(JSON.stringify(JSONbig.parse(data)))
			} catch (err) {
				return { data }
			}
		}
	]
})

// Request interceptors
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// 加载动画
		if (config.loading) {
			toast()
		}
		const appStore = useAppStore()
		if (appStore.token) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			config.headers!.common['Authorization'] = appStore.token
		}
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

// Response interceptors
service.interceptors.response.use(
	async (response: AxiosResponse) => {
		toast.hide()
		const res = response.data
		if (res.code === StatusCode.SUCCESS) {
			return response.data
		} else {
			if (res.code === StatusCode.OUTDATE_TOKEN) {
				// token 失效
				Dialog({
					title: '温馨提示',
					content: '登录失效，请重新登录',
					noCancelBtn: true,
					onCancel: () => {
						console.log('event cancel')
					},
					onOk: () => router.replace('/')
				})
				return Promise.reject(res)
			} else {
				Toast.text(res.msg)
				return Promise.reject(res)
			}
		}
	},
	(error: any) => {
		Toast.text(error.response ? `请求异常${error.response.status}` : '网络超时，请刷新重试')
		return Promise.reject(error)
	}
)

export default service
