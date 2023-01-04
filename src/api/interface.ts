export interface IResponseType<P = Record<string, unknown>> {
	code: number
	msg: string
	result?: boolean
	data?: any
	page?: any
}

// 发送短信验证码
export interface AuthCode {
	mobile: any
}