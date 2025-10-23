import type { Directive, DirectiveBinding } from 'vue';
interface ElType extends HTMLElement {
    __handleClick__: () => any;
}

/**
 * 防抖指令
 * 该指令用于限制函数的执行频率，当频繁触发时，只有在最后一次触发后的一段时间内没有再触发，才会执行函数
 * v-debounce
 * <button v-debounce="debounceClick">防抖提交</button>
 */
const debounce: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function';
        }
        let timer: NodeJS.Timeout | null = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                binding.value();
            }, 2000);
        };
        el.addEventListener('click', el.__handleClick__);
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener('click', el.__handleClick__);
    },
};

export default debounce;
