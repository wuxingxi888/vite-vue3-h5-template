// eslint.config.js
// Flat config for ESLint. Avoid depending on `eslint-define-config` to prevent
// module resolution issues in environments where it isn't installed.
import baseConfig from "@miracle/eslint-config/src/index.js"
import eslintConfigPrettier from "eslint-config-prettier"

const config = [
    // 基础配置
    {
        ignores: ["**/dist/**", "**/node_modules/**"]
    },
    ...baseConfig,
    // 添加 eslint-config-prettier 来禁用所有与 prettier 冲突的规则
    eslintConfigPrettier
]

export default config
