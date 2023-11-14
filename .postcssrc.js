module.exports = {
	plugins: {
		// 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
		autoprefixer: {
			overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
		},
		'postcss-px-to-viewport-8-plugin': {
			unitToConvert: 'px', // 要转化的单位
			viewportWidth: 375, // UI设计稿的宽度
			unitPrecision: 5, // 转换后的精度，即小数点位数
			propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
			viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
			fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
			selectorBlackList: ['keep-px'], // 指定不转换为视窗单位的类名 配置表示类名中含有'keep-px'都不会被转换，
			minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
			mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
			replace: true, // 是否转换后直接更换属性值
			exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
			include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
			landscape: false, // 是否处理横屏情况
			landscapeUnit: 'vw',
			landscapeWidth: 1338
		}
	}
}
