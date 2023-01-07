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
	Avatar,
	ShortPassword,
	Popup,
	OverLay
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
	Avatar,
	ShortPassword,
	Popup,
	OverLay
]

export const nutuiPlugins = (app) => {
	components.forEach((item: any) => {
		app.use(item)
	})
}
