import { http } from "@/utils/http"

export interface BasicResponseModel<T = any> {
    code: number
    message: string
    data: T
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
    return http.request<BasicResponseModel>(
        {
            url: "/login",
            method: "POST",
            params
        },
        {
            successMessageText: "登录成功，即将进入系统"
        }
    )
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
    return http.request({
        url: "/getUserInfo",
        method: "get"
    })
}

/**
 * @description: 用户登出
 */
export function doLogout() {
    return http.request({
        url: "/logouti",
        method: "POST"
    })
}
