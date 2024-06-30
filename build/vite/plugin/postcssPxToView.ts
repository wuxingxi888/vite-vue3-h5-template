/**
 * @name postcssPxToViewProtConfig
 * @description 将px单位转换为视口单位的插件配置函数
 * https://github.com/lkxian888/postcss-px-to-viewport-8-plugin/tree/master
 */

import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

// 设定默认视口宽度值
const DEFAULT_VIEWPORT_WIDTH = 375;
const MOBILE_PREFIX = 'm_';

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
        if (file.startsWith(MOBILE_PREFIX)) {
            // 如果文件名以 m_ 开头，考虑使用不同的视口宽度
            width = 320; // 假设为移动设备的视口宽度
        }

        return width;
    };

    return postcsspxtoviewport8plugin({
        unitToConvert: 'px',       // 要转化的单位
        viewportWidth: getFileWidth,  // UI设计稿的宽度
        unitPrecision: 5, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: ['keep-px'], // 指定不转换为视窗单位的类名 配置表示类名中含有'keep-px'都不会被转换，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: false, // 是否处理横屏情况
        landscapeUnit: 'vw',
        landscapeWidth: 1024
    })
}