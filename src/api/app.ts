import request from '@/utils/request'
import { IResponseType } from './interface'
import { AuthCode} from '@/api/interface'
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