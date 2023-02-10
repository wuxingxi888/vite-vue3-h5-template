/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver, VantResolver } from 'unplugin-vue-components/resolvers'

const NutUIResolver = () => {
	return (name) => {
		if (name.startsWith('Nut')) {
			const partialName = name.slice(3)
			return {
				name: partialName,
				from: '@nutui/nutui',
				sideEffects: `@nutui/nutui/dist/packages/${partialName.toLowerCase()}/style`
			}
		}
	}
}

export function configAutoComponentsPlugin() {
	return Components({
		// 指定组件位置，默认是src/components
		dirs: ['src/components'],
		// ui库解析器
		resolvers: [VueUseComponentsResolver(), VantResolver(), NutUIResolver()],
		extensions: ['vue', 'tsx'],
		// 配置文件生成位置
		dts: 'declare/components.d.ts',
		// 搜索子目录
		deep: true,
		// 允许子目录作为组件的命名空间前缀。
		directoryAsNamespace: false,
		globalNamespaces: [],
		directives: true,
		include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
	})
}
