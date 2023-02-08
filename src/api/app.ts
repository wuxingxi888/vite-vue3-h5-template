/*
 * @Author: 吴星喜 wuxingxi888@163.com
 * @Date: 2023-01-11 17:47:18
 * @LastEditors: 吴星喜 wuxingxi888@163.com
 * @LastEditTime: 2023-02-08 16:35:40
 * @FilePath: /vite-vue3-h5-template/src/api/app.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/utils/request'
import { IResponseType } from './interface'
import { AuthCode } from '@/api/interface'
import { envConfig } from '../config'

/**
 * post请求
 */
export const fetchAuthCode = (data: AuthCode) => {
	return request<IResponseType>({
		url: envConfig.baseApi + 'xxxxx',
		method: 'post',
		data,
		loading: true
	})
}

/**
 * get请求
 */
export const fetchTagList = () => {
	return request<IResponseType>({
		url: envConfig.baseApi + 'xxxxxx',
		method: 'get',
		loading: false
	})
}

/**
 * get请求
 */
export const fetchImageUrl = (params: { format: string }) => {
	return request<IResponseType>({
		url: 'https://api.btstu.cn/sjbz/api.php',
		method: 'get',
		params,
		loading: true
	})
}
