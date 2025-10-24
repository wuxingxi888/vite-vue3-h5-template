import vueBaseConfig from '@miracle/eslint-config/src/vue.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 读取自动导入的全局变量配置
let autoImportGlobals = {};
// Resolve path relative to this file, not process.cwd().
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const autoImportPath = path.resolve(__dirname, 'types', '.eslintrc-auto-import.json');

try {
    if (fs.existsSync(autoImportPath)) {
        const autoImportConfig = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'));
        autoImportGlobals = autoImportConfig.globals || {};
    }
} catch (error) {
    console.warn('Failed to read auto-import config:', error.message);
}

export default [
    ...vueBaseConfig,
    {
        languageOptions: {
            globals: {
                ...autoImportGlobals,
            },
        },
    },
];
