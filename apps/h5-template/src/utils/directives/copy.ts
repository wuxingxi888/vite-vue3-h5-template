/**
 * 复制指令
 * 该指令用于复制某个值至剪贴板
 * v-copy
 * <button v-copy="data">复制</button>
 * @data {string | Ref<string/> | Reactive<string>} 需要复制的内容
 */
import type { Directive, DirectiveBinding } from "vue"

interface ElType extends HTMLElement {
    copyData: string | number
    __handleClick__: any
}

const copy: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
        el.addEventListener("click", handleClick)
    },
    updated(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", el.__handleClick__)
    }
}

function handleClick(this: any) {
    const input = document.createElement("input")
    input.value = this.copyData.toLocaleString()
    document.body.appendChild(input)
    input.select()
    document.execCommand("Copy")
    document.body.removeChild(input)
    console.log("复制成功", this.copyData)
}

export default copy
