import { envConfig } from '@/config'
import { asyncLoadScript } from '@/utils/script'

/**
 * 动态加载脚本
 */
export const useLoadScript = () => {
    if (envConfig.env != 'production') {
        asyncLoadScript(this, { src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'debug' }).then(
            () => {
                window.eruda.init()
            }
        )
    }
}