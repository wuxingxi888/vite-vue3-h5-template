import {
	Button,
	CellGroup,
	Cell,
	Icon,
	Navbar,
	WaterMark,
	BackTop,
	Toast,
	Dialog,
	Avatar
} from '@nutui/nutui'

const components = [
	Button,
	CellGroup,
	Cell,
	Icon,
	Navbar,
	WaterMark,
	BackTop,
	Toast,
	Dialog,
	Avatar
]

export const nutuiPlugins = (app) => {
	components.forEach((item: any) => {
		app.use(item)
	})
}
