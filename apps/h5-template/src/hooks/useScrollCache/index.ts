import scrollUtil from './scrollUtil'

/**
 * useScrollCache 页面缓存（支持水平和垂直滚动）
 * 1.确保页面有keepAlive属性
 * 2.确保页面文件名称和路由name字段名称一致
 * 3.如果不一致（可设置页面组件名称）如：	defineOptions({ name: 'ScrollCache' })
 * @param dom
 * @param animeStatus
 * @returns
 */
export function useScrollCache(dom, animeStatus = false) {
    const scrollPosition = ref({ top: 0, left: 0 })
    const duration = 200

    dom.onscroll = () => {
        scrollUtil({ dom })
        scrollPosition.value = {
            top: dom.scrollTop,
            left: dom.scrollLeft
        }
    }

    const route = useRoute()

    if (!route.meta.keepAlive) {
        try {
            throw new Error('当前页面没有keepAlive属性')
        } catch (error) {
            console.error(error)
        }
    }

    onActivated(() => {
        const targetPosition = scrollPosition.value
        const animateScroll = () => {
            const startTime = Date.now()
            const startTop = dom.scrollTop
            const startLeft = dom.scrollLeft

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)

                dom.scrollTop = startTop + (targetPosition.top - startTop) * progress
                dom.scrollLeft = startLeft + (targetPosition.left - startLeft) * progress

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }

            requestAnimationFrame(animate)
        }

        if (animeStatus) {
            animateScroll()
        } else {
            dom.scrollTop = targetPosition.top
            dom.scrollLeft = targetPosition.left
        }
    })

    return scrollPosition
}
