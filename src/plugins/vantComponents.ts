// vant 全局样式
// import 'vant/lib/index.css'

// 函数组件的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

// import { Toast } from 'vant'

const components = [
	// Toast
]

export const vantPlugins = (app) => {
	components.forEach((item: any) => {
		app.use(item)
	})
}
