/**
 * @description [ axios 请求封装]
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import JSONbig from 'json-bigint' //解决超过 16 位数字精度丢失问题
import { showToast, showLoadingToast, closeToast } from 'vant/lib/toast'
import { showDialog } from 'vant/lib/dialog'
import { useAppStore } from '@/store/app'
import router from '@/router/index'

export class StatusCode {
	static SUCCESS = '200'
	static ERROR = 400
	static OUTDATE_TOKEN = 1001
}

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
			showLoadingToast({
				message: '加载中...',
				forbidClick: true
			})
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
		closeToast()
		const res = response.data
		if (res.code === StatusCode.SUCCESS) {
			return response.data
		} else {
			if (res.code === StatusCode.OUTDATE_TOKEN) {
				// token 失效
				showDialog({
					message: '登录失效，请重新登录',
					theme: 'round-button'
				}).then(() => {
					router.replace('/')
				})
				return Promise.reject(res)
			} else {
				showToast(res.msg)
				return Promise.reject(res)
			}
		}
	},
	(error: any) => {
		showToast(error.response ? `请求异常${error.response.status}` : '网络超时，请刷新重试')
		return Promise.reject(error)
	}
)

export default service
