// prettier.config.js
/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */

// 使用import来加载共享配置
import baseConfig from '@miracle/prettier-config'

// Prettier配置对象，用于定义代码格式化规则
const config = {
	...baseConfig,
	// h5-template项目的特定配置覆盖
	printWidth: 120,
	tabWidth: 4,
	useTabs: false,
	semi: false,
	singleAttributePerLine: true
}

// 导出配置对象以供Prettier使用
export default config
