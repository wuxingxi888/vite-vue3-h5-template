import { ref, onUnmounted } from 'vue';

/**
 * 基于 requestAnimationFrame 实现的延迟渲染 Hook
 * 通过控制帧率来分批渲染组件，优化大量 DOM 元素渲染时的性能问题
 *
 * @param maxCount 最大帧计数，默认为 100 帧
 * @returns defer 函数，用于判断当前帧数是否达到指定帧数
 */
export function useDefer(maxCount = 200) {
    // 当前已经执行的帧计数
    const frameCount = ref(0);

    // requestAnimationFrame 的 ID，用于取消动画帧
    let rafId: number;

    /**
     * 更新帧计数的递归函数
     * 每次调用会增加帧计数，直到达到最大帧计数为止
     */
    function updateFrameCount() {
        rafId = requestAnimationFrame(() => {
            frameCount.value++;

            // 如果尚未达到最大帧计数，则继续下一帧更新
            if (frameCount.value < maxCount) {
                updateFrameCount();
            }
        });
    }

    // 初始化时启动帧计数更新
    updateFrameCount();

    // 组件卸载时取消动画帧，防止内存泄漏
    onUnmounted(() => {
        cancelAnimationFrame(rafId);
    });

    /**
     * 判断是否应该渲染指定数量的元素
     *
     * @param n 帧数阈值
     * @returns 当前帧数是否大于等于指定的帧数
     */
    return function defer(n: number) {
        return frameCount.value >= n;
    };
}
