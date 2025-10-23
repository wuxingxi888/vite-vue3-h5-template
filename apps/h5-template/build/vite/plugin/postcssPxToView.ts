/**
 * @name postcss-mobile-forever
 * @description 将px单位转换为视口单位的插件配置函数
 * https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file
 */

import viewport from 'postcss-mobile-forever';
import { Plugin } from 'postcss';

// 设定默认视口宽度值
const DEFAULT_VIEWPORT_WIDTH = 375;

export function postcssPxToViewProtConfig(): Plugin {
    return viewport({
        appSelector: '#app', // 根元素选择器，用于设置桌面端和横屏时的居中样式
        maxDisplayWidth: 500, // 桌面端最大展示宽度
        viewportWidth: DEFAULT_VIEWPORT_WIDTH, // UI设计稿的宽度
        unitPrecision: 5, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        mobileUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
        selectorBlackList: ['keep-px'], // 指定不转换为视窗单位的类名 配置表示类名中含有'keep-px'都不会被转换，
        valueBlackList: ['1px solid'], // 表示属性值包含 '1px solid' 的内容不会转换
        exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        // include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
        landscapeWidth: 1024,
        // 指定包含块是根包含块的选择器，这种选择器的定位通常是 `fixed`，但是选择器内没有 `position: fixed`
        rootContainingBlockSelectorList: ['.mi-popup--bottom'],
        border: true,
        appContainingBlock: 'auto',
        necessarySelectorWhenAuto: 'body',
    });
}
