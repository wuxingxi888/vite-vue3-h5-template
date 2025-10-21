import type { Directive } from 'vue'

// 定义 Ripple 选项接口
interface RippleOptions {
    event: string
    transition: number
    background: string
    zIndex: string
}

// 默认的 Ripple 选项
const defaultRippleOptions: RippleOptions = {
    event: 'mousedown',
    transition: 400,
    background: 'rgba(255, 255, 255, 0.08)',
    zIndex: '9999'
}

// 创建 Ripple 指令
/**
 * 涟漪指令
 * 该指令用于点击产生涟漪
 * v-ripple
 * <button v-ripple>点击产生涟漪</button>
 */
const RippleDirective: Directive = {
    beforeMount(el, binding) {
        if (binding.value === false) {
            return
        }

        const options = getRippleOptions(binding.modifiers)
        const background = el.getAttribute('ripple-background') || options.background

        const eventListener = (event: MouseEvent | TouchEvent) => {
            createRipple(event, el, background, options)
        }

        el.addEventListener(options.event, eventListener)
    },

    updated(el, binding) {
        if (!binding.value) {
            clearRipple(el)
            return
        }

        const background = el.getAttribute('ripple-background')
        setBackground(el, background)
    }
}

// 获取 Ripple 选项
function getRippleOptions(modifiers: Partial<Record<string, boolean>>): RippleOptions {
    const options: RippleOptions = { ...defaultRippleOptions }

    if ('event' in modifiers) {
        options.event = Object.keys(modifiers).find(modifier => modifier !== 'event') || defaultRippleOptions.event
    }
    if ('transition' in modifiers) {
        options.transition = Number.parseInt(
            Object.keys(modifiers).find(modifier => modifier !== 'transition') ||
                String(defaultRippleOptions.transition)
        )
    }

    return options
}

// 创建 Ripple 元素
function createRipple(event: MouseEvent | TouchEvent, el: HTMLElement, background: string, options: RippleOptions) {
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0]
    const rect = el.getBoundingClientRect()
    const { left, top, width, height } = rect
    const dx = clientX - left
    const dy = clientY - top
    const maxX = Math.max(dx, width - dx)
    const maxY = Math.max(dy, height - dy)
    const radius = Math.sqrt(maxX * maxX + maxY * maxY)
    const border = Math.max(Number.parseInt(getComputedStyle(el).borderWidth.replace('px', '')), 0)
    const zIndex = options.zIndex

    const ripple = createRippleElement(dx, dy, radius, options.transition, background, zIndex)
    const rippleContainer = createRippleContainer(width, height, border, getComputedStyle(el))

    rippleContainer.appendChild(ripple)
    el.appendChild(rippleContainer)

    setTimeout(() => {
        ripple.style.width = `${Math.max(width, height) * 2}px` // 增加宽度
        ripple.style.height = `${Math.max(width, height) * 2}px` // 增加高度
        ripple.style.marginLeft = `${dx - Math.max(width, height)}px` // 调整位置
        ripple.style.marginTop = `${dy - Math.max(width, height)}px` // 调整位置
    }, 0)

    addRippleClearEventListeners(el, rippleContainer, options.transition)
}

// 清除 Ripple
function clearRipple(el: HTMLElement) {
    const rippleContainer = el.querySelector('.ripple-container') as HTMLElement
    if (rippleContainer) {
        rippleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        setTimeout(() => {
            rippleContainer.parentNode?.removeChild(rippleContainer)
        }, 850)
    }
}

// 设置 Ripple 背景
function setBackground(el: HTMLElement, background: string | null) {
    const rippleContainer = el.querySelector('.ripple-container') as HTMLElement
    if (rippleContainer && background) {
        rippleContainer.style.backgroundColor = background
    }
}

// 创建 Ripple 元素
function createRippleElement(
    dx: number,
    dy: number,
    _radius: number,
    transition: number,
    background: string,
    zIndex: string
) {
    const ripple = document.createElement('div')
    ripple.className = 'ripple'
    ripple.style.marginTop = `${dy}px`
    ripple.style.marginLeft = `${dx}px`
    ripple.style.width = '1px'
    ripple.style.height = '1px'
    ripple.style.transition = `all ${transition}ms cubic-bezier(0.61, 1, 0.88, 1)`
    ripple.style.borderRadius = '50%'
    ripple.style.pointerEvents = 'none'
    ripple.style.position = 'relative'
    ripple.style.zIndex = zIndex
    ripple.style.backgroundColor = background
    return ripple
}

// 创建 Ripple 容器
function createRippleContainer(width: number, height: number, border: number, style: CSSStyleDeclaration) {
    const rippleContainer = document.createElement('div')
    rippleContainer.className = 'ripple-container'
    rippleContainer.style.position = 'absolute'
    rippleContainer.style.left = `${0 - border}px`
    rippleContainer.style.top = `${0 - border}px`
    rippleContainer.style.height = `${height * 2}px` // 增加高度
    rippleContainer.style.width = `${width * 2}px` // 增加宽度
    rippleContainer.style.pointerEvents = 'none'
    rippleContainer.style.overflow = 'hidden'
    rippleContainer.style.direction = 'ltr'
    rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius
    rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius
    rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius
    rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius
    return rippleContainer
}

// 添加 Ripple 清除事件监听器
function addRippleClearEventListeners(el: HTMLElement, rippleContainer: HTMLElement, transition: number) {
    const clearRipple = () => {
        rippleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        setTimeout(() => {
            rippleContainer?.parentNode?.removeChild(rippleContainer)
        }, transition)
        el.removeEventListener('mouseup', clearRipple)
        el.removeEventListener('mouseleave', clearRipple)
        el.removeEventListener('dragstart', clearRipple)
        setTimeout(() => {
            if (!el.querySelector('.ripple-container')) {
                el.style.position = getComputedStyle(el).position !== 'static' ? getComputedStyle(el).position : ''
            }
        }, transition + 260)
    }

    el.addEventListener('mouseup', clearRipple)
    el.addEventListener('mouseleave', clearRipple)
    el.addEventListener('dragstart', clearRipple)
}

export default RippleDirective
