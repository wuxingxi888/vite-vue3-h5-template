/**
 * 自动导入插件，根据代码中使用的标识符自动生成相应的import语句
 * Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-auto-import
 */
import AutoImport from "unplugin-auto-import/vite"
import { MiracleResolver } from "@miracle-web/auto-import-resolver"

export function configAutoImportPlugin() {
    return AutoImport({
        resolvers: [MiracleResolver()],
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/ // .md
        ],
        imports: ["vue", "vue-router", "@vueuse/core"],
        // 项目中自定义的导入
        dirs: ["src/hooks", "src/api"],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: "types/auto-import.d.ts",
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        // 生成全局声明文件，给eslint用
        eslintrc: {
            // Default `false`
            enabled: true,
            // Default `./.eslintrc-auto-import.json`
            filepath: "types/.eslintrc-auto-import.json",
            // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            globalsPropValue: true
        }
    })
}
