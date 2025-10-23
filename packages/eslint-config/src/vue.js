import pluginVue from "eslint-plugin-vue"
import baseConfig from "./index.js"

export default [
    ...baseConfig,
    ...pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        rules: {
            // vue specific rules
            "vue/multi-word-component-names": "off",
            "vue/no-mutating-props": "off",
            "vue/attribute-hyphenation": "off"
        }
    }
]
