import type { Directive } from 'vue'

/**
 * 图片懒加载指令
 * 该指令用于图片懒加载，当图片出现在可视区域时才加载图片，可以减少图片加载的次数，优化页面性能
 * v-lazy
 *<img v-lazy="url"/>
 */
const lazyImage: Directive = {
    mounted(el, { value }) {
        // 默认占位图 URL
        const placeholderUrl = 'https://dummyimage.com/300/&text=miracle-web/ui'

        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                // 判断当前元素是不是img标签
                if (el.tagName === 'IMG') {
                    el.src = value
                    el.onload = () => {
                        el.style.animation = 'lazy-img-blur-in 0.2s linear both'
                    }
                } else {
                    const imgEl = el.getElementsByTagName('img')

                    for (const el of imgEl) {
                        el.src = value
                        el.onload = () => {
                            el.style.animation = 'lazy-img-blur-in 0.2s linear both'
                        }
                    }
                }

                el.addEventListener(
                    'animationend',
                    () => {
                        el.style.animation = ''
                    },
                    { once: true }
                )

                observer.unobserve(el)
            }
        })

        // 设置占位图
        if (el.tagName === 'IMG') {
            el.src = placeholderUrl
        } else {
            const imgEl = el.getElementsByTagName('img')
            for (const el of imgEl) {
                el.src = placeholderUrl
            }
        }

        observer.observe(el)
    }
}

export default lazyImage
