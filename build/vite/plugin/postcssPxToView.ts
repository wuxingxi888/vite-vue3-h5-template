/**
 * @name postcss-mobile-forever
 * @description 将px单位转换为视口单位的插件配置函数
 * https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file
 */

import viewport from 'postcss-mobile-forever'

// 设定默认视口宽度值
const DEFAULT_VIEWPORT_WIDTH = 375;
const PC_PREFIX = 'p_';

// 确保file参数为字符串，提供默认值处理逻辑
function ensureString(value: any): string {
    if (typeof value !== 'string') {
        throw new TypeError('Expected a string for file name');
    }
    return value;
}

export function postcssPxToViewProtConfig() {
    // 确保传入的文件名是字符串
    const getFileWidth = (file: string) => {
        file = ensureString(file);
        let width = DEFAULT_VIEWPORT_WIDTH;

        // 使用更精确的逻辑来决定文件对应的视口宽度
        if (file.startsWith(PC_PREFIX)) {
            // 如果文件名以 m_ 开头，考虑使用不同的视口宽度
            width = 1024; // 假设为移动设备的视口宽度
        }

        return width;
    };

    return viewport({
        appSelector: '#app', // 根元素选择器，用于设置桌面端和横屏时的居中样式
        maxDisplayWidth: 560, // 桌面端最大展示宽度
        viewportWidth: getFileWidth,  // UI设计稿的宽度
        unitPrecision: 5, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        mobileUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
        selectorBlackList: ['keep-px'], // 指定不转换为视窗单位的类名 配置表示类名中含有'keep-px'都不会被转换，
        valueBlackList: ['1px solid'], // 表示属性值包含 '1px solid' 的内容不会转换
        exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
        landscapeWidth: 1024,
        rootContainingBlockSelectorList: ['van-popup--bottom'], // 指定包含块是根包含块的选择器，这种选择器的定位通常是 `fixed`，但是选择器内没有 `position: fixed`
        border: true,
        appContainingBlock: "auto"
    })
}