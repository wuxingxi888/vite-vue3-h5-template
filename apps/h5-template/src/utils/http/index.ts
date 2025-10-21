// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import { showDialog, showFailToast, showSuccessToast } from '@miracle-web/ui'
import { MAxios, axios, formatRequestDate, joinTimestamp } from '@miracle-web/utils'
import { setObjToUrlParams, deepMerge, urlReg, isString, BrowserType } from '@miracle-web/utils'
import type {
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosTransform,
    CreateAxiosOptions,
    RequestOptions,
    Result
} from '@miracle-web/utils'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/utils/http/httpEnum'
import { PageEnum } from '@/enums/pageEnum'

import { useEnv } from '@/hooks/useEnv'

import { useUserStoreWidthOut } from '@/store/modules/user'

const { getEnvConfig } = useEnv()

const urlPrefix = getEnvConfig().urlPrefix || ''

const transform: AxiosTransform = {
    /**
     * @description: 请求之前处理config
     */
    beforeRequestHook: (config, options) => {
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

        const isUrlStr = urlReg(config.url as string)

        if (!isUrlStr && joinPrefix) {
            config.url = `${urlPrefix}${config.url}`
        }

        if (!isUrlStr && apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`
        }
        const params = config.params || {}
        const data = config.data || false
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
            } else {
                // 兼容restful风格
                config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
                config.params = undefined
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params)
                if (
                    Reflect.has(config, 'data') &&
                    config.data &&
                    (Object.keys(config.data).length > 0 || config.data instanceof FormData)
                ) {
                    config.data = data
                    config.params = params
                } else {
                    // params 是添加到 url 的请求字符串中的，用于 get 请求
                    // 非GET请求如果没有提供 data，则将 params 视为 data
                    config.data = params
                    config.params = undefined
                }
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data })
                }
            } else {
                // 兼容restful风格
                config.url = config.url + params
                config.params = undefined
            }
        }
        return config
    },

    /**
     * @description: 请求成功数据处理
     */
    requestSuccessResult: (response: AxiosResponse<Result>, options: RequestOptions) => {
        if (!response.data) {
            throw new Error(' Request has no return value')
        }

        const {
            isShowMessage = true,
            isShowErrorMessage,
            isShowSuccessMessage,
            successMessageText,
            errorMessageText,
            isTransformResponse,
            isReturnNativeResponse
        } = options

        const { code, data, message } = response.data

        const hasSuccess = Reflect.has(response.data, 'code') && code === ResultEnum.SUCCESS
        // 消息处理
        if (isShowMessage) {
            // 自定义成功消息
            if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
                showSuccessToast(successMessageText || message || '操作成功！')
            }

            // 自定义错误消息
            if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
                showFailToast(message || errorMessageText || '操作失败！')
            }
        }

        // 是否返回原生响应头
        if (isReturnNativeResponse) {
            return response
        }

        //  返回处理过后的数据
        if (isTransformResponse) {
            return response.data
        }

        // 直接返回结果
        if (hasSuccess) {
            return data
        } else {
            showFailToast(message)
            throw new Error(message)
        }
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config: InternalAxiosRequestConfig, options: CreateAxiosOptions) => {
        const userStore = useUserStoreWidthOut()
        const token = userStore.getToken
        // jwt token
        if (token && config.requestOptions?.withToken) {
            config.headers.Authorization = options.authenticationScheme
                ? `${options.authenticationScheme} ${token}`
                : token
        }

        // platform
        const { platform, system } = BrowserType()
        config.headers['mi-platform'] = platform
        config.headers['mi-system'] = system

        return config
    },

    /**
     * @description: 请求拦截器错误处理
     */
    requestInterceptorsCatch: error => {
        return Promise.reject(error)
    },

    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (response: AxiosResponse) => {
        const { code, message } = response.data

        if (code === ResultEnum.ERROR) {
            showFailToast(message)
        }

        if (code === ResultEnum.TOKEN_EXPIRED) {
            showDialog({
                title: '提示',
                message: '登录身份已失效，请重新登录!'
            })
                .then(() => {
                    window.location.href = PageEnum.BASE_LOGIN
                })
                .catch(() => {
                    // on cancel
                })
        }

        return response
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: error => {
        const err: string = error.toString()
        console.log('%c [ err ]-184', 'font-size:13px; background:pink; color:#bf2c9f;', err)

        if (err && err.includes('Network Error')) {
            showDialog({
                title: '网络异常',
                message: '请检查您的网络连接是否正常'
            })
                .then(() => {})
                .catch(() => {})
            return Promise.reject(error)
        }

        // 请求是否被取消
        if (axios.isCancel(error)) {
            // 自定义返回内容
            return Promise.resolve({ data: error, code: -1, message: '取消重复请求' })
        }

        return Promise.reject(error)
    }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new MAxios(
        deepMerge(
            {
                timeout: 10 * 1000,
                // token 前缀 Bearer
                authenticationScheme: '',
                // 接口前缀
                prefixUrl: urlPrefix,

                // 如果是json格式
                headers: { 'Content-Type': ContentTypeEnum.JSON },

                // 数据处理方式
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
                    isReturnNativeResponse: false,
                    // 需要对返回数据进行处理
                    isTransformResponse: true,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 接口地址
                    apiUrl: getEnvConfig().apiUrl,
                    // 接口拼接地址
                    urlPrefix,
                    //  是否加入时间戳
                    joinTime: true,
                    // 忽略重复请求
                    ignoreCancelToken: true,
                    // 是否携带token
                    withToken: true,
                    retryOptions: {
                        isRetry: true,
                        retryCount: 2,
                        __retryCount: 0,
                        retryWaitTime: 1000
                    }
                }
            },
            opt || {}
        )
    )
}

export const http = createAxios()
