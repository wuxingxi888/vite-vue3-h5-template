/**
 * @name ConfigRestartPlugin
 * @description 按需导入组件库样式的 Vite 插件
 */

import { createStyleImportPlugin } from 'vite-plugin-style-import';

export const configStyleImportPlugin = () => {
    return createStyleImportPlugin({
        // resolves: []
    });
};
