import pluginVue from 'eslint-plugin-vue';
import baseConfig from './index.js';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
    ...baseConfig,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        // 使用 vue-eslint-parser 作为外层 parser，并把 @typescript-eslint/parser 作为内部 parser
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            // vue specific rules
            'vue/multi-word-component-names': 'off',
            'vue/no-mutating-props': 'off',
            'vue/attribute-hyphenation': 'off',
        },
    },
];
