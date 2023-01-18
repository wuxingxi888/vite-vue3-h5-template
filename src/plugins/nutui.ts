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
	OverLay,
	Image,
	Drag,
	FixedNav
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
	OverLay,
	Image,
	Drag,
	FixedNav
]

export const nutuiPlugins = (app) => {
	components.forEach((item: any) => {
		app.use(item)
	})
}
