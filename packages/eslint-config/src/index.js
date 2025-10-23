import globals from "globals"
import tseslint from "typescript-eslint"
// typescript-eslint exports plugin and parser in different properties
const tsPlugin = tseslint.plugin || tseslint
const tsParser = tseslint.parser
// Use the plugin package itself (flat config will register plugin object)
import eslintPluginPrettier from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
    // 指定文件匹配模式 和语言选项
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"]
    },
    // 指定全局变量和环境
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            ecmaVersion: "latest", // 使用最新的 ECMAScript 语法
            sourceType: "module", // 代码是 ECMAScript 模块
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    tsx: true
                }
            } // 使用 TypeScript 解析器
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        }
    },

    // NOTE: Avoid spreading `pluginJs.configs.recommended` and
    // `tseslint.configs.recommended` directly because some packages may
    // export legacy config objects (containing `root`) incompatible with
    // ESLint flat config system. The languageOptions and rules below
    // provide the necessary settings.

    // 自定义规则
    {
        rules: {
            "no-var": "error", // 要求使用 let 或 const 而不是 var
            "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
            "no-unexpected-multiline": "error", // 禁止空余的多行
            "no-useless-escape": "off", // 禁止不必要的转义字符

            // typeScript (https://typescript-eslint.io/rules)
            "@typescript-eslint/no-unused-vars": "warn", // 禁止定义未使用的变量
            "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
            "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
            "@typescript-eslint/semi": "off",
            "@typescript-eslint/no-unsafe-function-type": "off", // 禁止使用 Function 作为 type。
            "@typescript-eslint/no-unused-expressions": "off", // 禁止无用的表达式。

            // 与Prettier协同工作
            semi: "off"
        }
    },

    // 忽略文件
    {
        ignores: ["**/dist", "**/node_modules", "**/*.d.ts", "/public", "/plop-templates"]
    },

    /**
     * prettier 配置 (flat config friendly)
     * 注册 prettier 插件对象并启用其规则。不要直接使用 `eslint-plugin-prettier/recommended`
     * 因为该模块会导出 legacy config 对象（包含 root 等属性），不兼容 flat config。
     */
    {
        // 注册插件对象
        plugins: {
            prettier: eslintPluginPrettier
        },
        // 启用 prettier 规则，使用本项目的 prettier 配置
        rules: {
            "prettier/prettier": "error"
        }
    },

    // 添加 eslint-config-prettier 来禁用所有与 prettier 冲突的规则
    eslintConfigPrettier
]
