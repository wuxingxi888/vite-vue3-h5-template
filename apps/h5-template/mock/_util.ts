import Mock from 'mockjs'
import { ResultEnum } from '@/utils/http/httpEnum'

export function resultSuccess<T = Recordable>(data: T, { message = '请求成功' } = {}) {
    return Mock.mock({
        code: ResultEnum.SUCCESS,
        data,
        message
    })
}

export function resultPageSuccess<T = any>(page: number, pageSize: number, list: T[], { message = '请求成功' } = {}) {
    const pageData = pagination(page, pageSize, list)

    return {
        ...resultSuccess({
            page,
            pageSize,
            pageCount: list.length,
            list: pageData
        }),
        message
    }
}

export function resultError(message = '请求失败', { code = ResultEnum.ERROR, data = null } = {}) {
    return {
        code,
        data,
        message
    }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
    const offset = (pageNo - 1) * Number(pageSize)
    const ret =
        offset + Number(pageSize) >= array.length
            ? array.slice(offset, array.length)
            : array.slice(offset, offset + Number(pageSize))
    return ret
}

/**
 * @param {number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times: number, callback: any) {
    let i = -1
    while (++i < times) {
        callback(i)
    }
}

export interface requestParams {
    method: string
    body: any
    headers?: { authorization?: string }
    query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
    return headers?.authorization
}
