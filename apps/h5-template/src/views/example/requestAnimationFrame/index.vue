<script setup lang="ts">
    import { ref } from 'vue';
    import NormalComplexBlock from './components/NormalComplexBlock.vue';
    import OptimizedComplexBlock from './components/OptimizedComplexBlock.vue';

    // 控制显示哪种渲染方式
    const renderMode = ref<'normal' | 'optimized'>('normal');
</script>

<template>
    <div>
        <custom-nav-bar />
        <div class="h-screen overflow-y-scroll">
            <!-- 按钮切换渲染模式 -->
            <div class="flex justify-center gap-4 mt-4">
                <mi-button type="primary" :plain="renderMode !== 'normal'" @click="renderMode = 'normal'">
                    正常渲染
                </mi-button>
                <mi-button type="primary" :plain="renderMode !== 'optimized'" @click="renderMode = 'optimized'">
                    优化渲染（useDefer）
                </mi-button>
            </div>

            <!-- 添加复杂组件演示卡顿效果 -->
            <div class="mt-6 p-4 bg-gray-100 rounded-lg">
                <h2 class="text-xl font-bold mb-4 text-center">性能卡顿演示</h2>
                <p class="mb-4 text-gray-600">
                    下面的组件将渲染50000个具有不同样式和动画的元素，这会导致明显的页面卡顿：
                </p>

                <div class="mb-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
                    <p class="font-bold mb-1">渲染方式对比说明：</p>
                    <p>正常渲染虽然总时间可能较短，但会造成页面卡顿；优化渲染虽然总时间较长，但用户体验更好。</p>
                    <p class="mt-1 font-bold">使用场景：白屏卡顿优化</p>
                </div>

                <!-- 根据选择的模式显示不同的渲染方式 -->
                <div>
                    <p v-if="renderMode === 'normal'" class="mb-4 text-red-500 font-bold"
                        >当前模式：正常渲染（全部元素一次性渲染）</p
                    >
                    <p v-else class="mb-4 text-green-500 font-bold">当前模式：优化渲染（使用useDefer分批渲染）</p>

                    <!-- 正常渲染 -->
                    <div v-if="renderMode === 'normal'">
                        <NormalComplexBlock />
                    </div>

                    <!-- 优化渲染 -->
                    <div v-else>
                        <OptimizedComplexBlock />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
