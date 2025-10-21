import vueBaseConfig from '@miracle/eslint-config/src/vue.js'
import fs from 'fs'
import path from 'path'

// 读取自动导入的全局变量配置
let autoImportGlobals = {}
const autoImportPath = './types/.eslintrc-auto-import.json'

try {
    const resolvedPath = path.resolve(autoImportPath)
    if (fs.existsSync(resolvedPath)) {
        const autoImportConfig = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'))
        autoImportGlobals = autoImportConfig.globals || {}
    }
} catch (error) {
    console.warn('Failed to read auto-import config:', error.message)
}

export default [
    ...vueBaseConfig,
    {
        languageOptions: {
            globals: {
                ...autoImportGlobals
            }
        }
    }
]
