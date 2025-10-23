/**
 * 截流指令
 * 该指令用于限制函数的执行频率，在规定时间内，只执行一次。
 * v-throttle
 * <button v-throttle="throttleClick">节流提交</button>
 */
import type { Directive, DirectiveBinding } from "vue"
interface ElType extends HTMLElement {
    __handleClick__: () => any
    disabled: boolean
}
const throttle: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function"
        }
        let timer: NodeJS.Timeout | null = null
        el.__handleClick__ = function () {
            if (timer) {
                clearTimeout(timer)
            }
            if (!el.disabled) {
                el.disabled = true
                binding.value()
                timer = setTimeout(() => {
                    el.disabled = false
                }, 2000)
            }
        }
        el.addEventListener("click", el.__handleClick__)
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", el.__handleClick__)
    }
}

export default throttle
