import type { App } from 'vue';
import lazyImage from './lazyImage';
import draggable from './draggable';
import copy from './copy';
import longPress from './longPress';
import debounce from './debounce';
import throttle from './throttle';
import watermark from './watermark';
import slideIn from './slideIn';
import ripple from './ripple';

export const useDirectives = (app: App) => {
    // 图片懒加载指令
    app.directive('lazy', lazyImage);
    // slide-in 指令
    app.directive('slide-in', slideIn);
    // 拖拽指令
    app.directive('drag', draggable);
    // 复制指令
    app.directive('copy', copy);
    // 长按指令
    app.directive('long-press', longPress);
    // 水印指令
    app.directive('watermark', watermark);
    // 涟漪指令
    app.directive('ripple', ripple);
    // 防抖指令
    app.directive('debounce', debounce);
    // 节流指令
    app.directive('throttle', throttle);
};
