import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
	// 指定文件匹配模式 和语言选项
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],
	},
	// 指定全局变量和环境
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			ecmaVersion: "latest", // 使用最新的 ECMAScript 语法
			sourceType: "module", // 代码是 ECMAScript 模块
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
					tsx: true,
				},
				parser: tseslint.parser,
			}, // 使用 TypeScript 解析器
		},
	},

	/** js推荐配置 */
	pluginJs.configs.recommended,
	/** ts推荐配置 */
	...tseslint.configs.recommended,

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

			indent: ["error", 4], // 缩进使用4个空格
			semi: ["error", "never"], //语句末尾不加分号
			"no-unused-vars": "off",
		},
	},

	// 忽略文件
	{
		ignores: ["**/dist", "**/node_modules", "**/*.d.ts", "/public", "/plop-templates"],
	},

	/**
	 * prettier 配置
	 * 会合并根目录下的prettier.config.js 文件
	 * @see https://prettier.io/docs/en/options
	 */
	eslintPluginPrettier,
];
