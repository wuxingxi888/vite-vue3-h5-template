/**
 * 水印指令
 * 该指令用于显示标识，防止信息盗用
 * v-watermark="{ text: 'Watermark Direct', textColor: 'rgba(180, 180, 180, 0.6)' }"
 * <div v-watermark="{ text: 'Watermark Direct', textColor: 'rgba(180, 180, 180, 0.6)' }">水印指令</div>
 */

import type { Directive, DirectiveBinding } from 'vue'

const createWatermark = (el: HTMLElement, binding: DirectiveBinding) => {
    const { text, textColor } = binding.value || {}
    if (!text) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (ctx) {
        const width = 150
        const height = 100
        canvas.width = width
        canvas.height = height

        ctx.rotate((-20 * Math.PI) / 180)
        ctx.font = '16px Arial'
        ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.6)'
        ctx.fillText(text, 0, height / 2)

        el.style.position = 'relative'

        const div = document.createElement('div')
        div.style.pointerEvents = 'none'
        div.style.position = 'absolute'
        div.style.top = '0'
        div.style.left = '0'
        div.style.right = '0'
        div.style.bottom = '0'
        div.style.zIndex = '1000'
        div.style.background = `url(${canvas.toDataURL()}) repeat`
        el.appendChild(div)
        // el.style.backgroundImage = `url(${canvas.toDataURL()}) repeat`
    }
}

const destroyWatermark = (el: HTMLElement) => {
    const watermarks = el.querySelectorAll('div[style*="pointer-events: none"]')
    watermarks.forEach(watermark => el.removeChild(watermark)) // 清除当前绑定元素上的水印
}

const watermark: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        createWatermark(el, binding)
    },
    beforeUnmount(el: HTMLElement) {
        destroyWatermark(el)
    }
}

export default watermark
