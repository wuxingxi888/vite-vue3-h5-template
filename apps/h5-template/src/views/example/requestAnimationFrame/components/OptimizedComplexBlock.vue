<script setup lang="ts">
    import { ref, onMounted, computed, watch } from 'vue';
    import { useDefer } from '../hooks/useDefer';

    interface BlockItem {
        id: number;
        color: string;
        borderRadius: number;
        shadow: string;
    }

    const blockList = ref<BlockItem[]>([]);
    const renderTime = ref<number | null>(null);
    const renderStartTime = ref<number>(0);
    const isRendering = ref<boolean>(false);

    // 生成随机颜色
    const getRandomColor = () => {
        const colors = [
            '#FF6B6B',
            '#4ECDC4',
            '#45B7D1',
            '#96CEB4',
            '#FFEAA7',
            '#DDA0DD',
            '#98D8C8',
            '#F7DC6F',
            '#BB8FCE',
            '#85C1E9',
            '#F8C471',
            '#82E0AA',
            '#F1948A',
            '#85C1E9',
            '#D7BDE2',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // 生成随机阴影
    const getRandomShadow = () => {
        const shadows = [
            '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
            '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        ];
        return shadows[Math.floor(Math.random() * shadows.length)];
    };

    // 生成复杂的数据列表
    const generateBlockList = () => {
        const list: BlockItem[] = [];
        // 增加元素数量到50000个以体现性能差异
        for (let i = 0; i < 50000; i++) {
            list.push({
                id: i,
                color: getRandomColor(),
                borderRadius: Math.floor(Math.random() * 20) + 1,
                shadow: getRandomShadow(),
            });
        }
        return list;
    };

    onMounted(() => {
        renderStartTime.value = performance.now();
        isRendering.value = true;
        blockList.value = generateBlockList();
    });

    // 使用useDefer优化渲染
    const defer = useDefer(1000);

    // 计算需要显示的元素
    const visibleBlocks = computed(() => {
        // 优化渲染模式 - 根据defer函数决定显示哪些元素
        return blockList.value.filter(block => defer(Math.floor(block.id / 100)));
    });

    // 监听visibleBlocks变化以计算渲染时间
    watch(visibleBlocks, newVisibleBlocks => {
        if (newVisibleBlocks.length === blockList.value.length && isRendering.value) {
            renderTime.value = performance.now() - renderStartTime.value;
            isRendering.value = false;
        }
    });
</script>

<template>
    <div>
        <div class="render-time">
            <span v-if="renderTime !== null">渲染耗时: {{ renderTime.toFixed(2) }} 毫秒</span>
            <span v-else>渲染中... (已渲染 {{ visibleBlocks.length }} / {{ blockList.length }} 元素)</span>
        </div>
        <div class="complex-block-container">
            <div
                v-for="block in visibleBlocks"
                :key="block.id"
                class="block-item"
                :style="{
                    width: '4px',
                    height: '4px',
                    backgroundColor: block.color,
                    borderRadius: block.borderRadius + 'px',
                    boxShadow: block.shadow,
                    margin: '4px',
                }"
            >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .render-time {
        text-align: center;
        font-weight: bold;
        color: #00aa00;
        margin-bottom: 10px;
    }

    .complex-block-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px;

        .block-item {
            transition: transform 0.3s ease;
            will-change: transform;
        }
    }
</style>
