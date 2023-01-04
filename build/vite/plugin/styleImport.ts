/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export function configStyleImportPlugin(isBuild: boolean) {
	return createStyleImportPlugin({
		resolves: [
			{
				libraryName: '@nutui/nutui',
				libraryNameChangeCase: 'pascalCase',
				resolveStyle: (name) => {
					return `@nutui/nutui/dist/packages/${name.toLowerCase()}/index.scss`
				}
			}
		]
	})
}
