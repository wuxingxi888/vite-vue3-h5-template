// eslint.config.js
// Flat config for ESLint. Avoid depending on `eslint-define-config` to prevent
// module resolution issues in environments where it isn't installed.
import baseConfig from '@miracle/eslint-config/src/index.js';

const config = [
    // 基础配置
    {
        ignores: ['**/dist/**', '**/node_modules/**', 'apps/docs/.vitepress/cache'],
    },
    ...baseConfig,
];

export default config;
