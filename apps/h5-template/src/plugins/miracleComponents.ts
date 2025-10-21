// @miracle-web/ui 全局样式(插件自动引入了)
// import '@miracle-web/ui/lib/index.css'

// 函数组件的样式
import '@miracle-web/ui/es/toast/style'
import '@miracle-web/ui/es/dialog/style'
import '@miracle-web/ui/es/notify/style'
import '@miracle-web/ui/es/image-preview/style'

// 组件桌面端适配
import '@miracle-web/touch-emulator'

// import { Toast } from '@miracle-web/ui'

const components = [
    // Toast
]

export const miraclePlugins = app => {
    components.forEach((item: any) => {
        app.use(item)
    })
}
