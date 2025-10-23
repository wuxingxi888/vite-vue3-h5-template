import DisableDevtool from "disable-devtool"
import { useEnv } from "@/hooks/useEnv"

const { getEnvMode } = useEnv()

/**
 * 禁用web开发者工具
 * 具体参考 https://github.com/theajack/disable-devtool/blob/master/README.cn.md
 * 生产环境 绕过禁用 http://127.0.0.1:5173/?vvtk=vite_vue3  可自行配置tkName的key 和 md5的原始值
 */
export const useDevtool = () => {
    if (getEnvMode() == "production") {
        DisableDevtool({
            md5: "bba8318a4b4a5ba44aec00e06ebf5409",
            url: "about:blank",
            tkName: "vvtk",
            timeOutUrl: "about:blank",
            ondevtoolopen(type, next) {
                alert(`当前页面禁止打开开发者模式${type}`)
                next()
            }
        })
    }
}
