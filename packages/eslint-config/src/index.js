/**
 * ESLint 配置文件
 *
 * 该配置文件导出一个包含 ESLint 规则配置的数组，
 * 用于检查 JavaScript 和 TypeScript 项目中的代码质量。
 *
 * @returns {Array} 包含 ESLint 配置对象的数组
 */
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    // 全局基础配置
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ignores: ['**/dist', '**/node_modules', '**/*.d.ts', '/public'],
        languageOptions: {
            ecmaVersion: 'latest', // 使用最新的 ECMAScript 语法
            sourceType: 'module', // 代码是 ECMAScript 模块
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    tsx: true,
                },
            }, // 使用 TypeScript 解析器
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'no-var': 'error', // 要求使用 let 或 const 而不是 var
            'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
            'no-unexpected-multiline': 'error', // 禁止空余的多行
            'no-useless-escape': 'off', // 禁止不必要的转义字符

            // typeScript (https://typescript-eslint.io/rules)
            '@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
            '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
            '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
            '@typescript-eslint/semi': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off', // 禁止使用 Function 作为 type。
            '@typescript-eslint/no-unused-expressions': 'off', // 禁止无用的表达式。
        },
    },
    // Prettier 配置
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintConfigPrettier.rules,
            'prettier/prettier': 'error',
        },
    },
    // 添加 eslint-config-prettier 来禁用所有与 prettier 冲突的规则
    eslintConfigPrettier,
];
