import 'vant/lib/index.css'

import { Toast } from 'vant'

const components = [
	// Toast
]

export const vantPlugins = (app) => {
	components.forEach((item: any) => {
		app.use(item)
	})
}
