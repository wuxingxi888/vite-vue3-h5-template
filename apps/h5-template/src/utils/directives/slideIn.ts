import type { Directive } from "vue"

//动画距离
const DISTANCE = 100
//动画时间
const DURATION = 500

// 动画对应关系映射
const animationMap = new WeakMap()
// 窗口监视器
const ob = new IntersectionObserver(entires => {
    for (const entry of entires) {
        if (entry.isIntersecting) {
            animationMap.get(entry.target).play()
            ob.unobserve(entry.target)
        }
    }
})

/**
 * 判断给定的元素是否在视图范围之外
 * @param {HTMLElement} el - 要判断的元素
 * @returns {boolean} - 如果元素在视图范围之外则返回true，否则返回false
 */
function isBelowViewPort(el) {
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight
}

/**
 * 窗口元素进入动画（slide-in）
 * v-slide-in
 * <item v-slide-in></item>
 */
const slideIn: Directive = {
    mounted(el) {
        setTimeout(() => {
            if (!isBelowViewPort(el)) {
                // 只有当元素在视口top值下面的时候才会触发animate
                return
            }
            const animation = el.animate(
                [
                    {
                        transform: `translateY(${DISTANCE}px)`,
                        opacity: 0.5
                    },
                    {
                        transform: `translateY(0px)`,
                        opacity: 1
                    }
                ],
                {
                    duration: DURATION,
                    easing: "ease"
                }
            )
            animation.pause()
            animationMap.set(el, animation)
            ob.observe(el)
        }, 0)
    },
    unmounted(el) {
        ob.unobserve(el)
    }
}

export default slideIn
