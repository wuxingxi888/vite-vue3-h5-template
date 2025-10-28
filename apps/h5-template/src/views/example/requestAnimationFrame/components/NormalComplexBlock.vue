<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    interface BlockItem {
        id: number;
        color: string;
        borderRadius: number;
        shadow: string;
    }

    const blockList = ref<BlockItem[]>([]);
    const renderTime = ref<number | null>(null);
    const renderStartTime = ref<number>(0);

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
        blockList.value = generateBlockList();
        renderTime.value = performance.now() - renderStartTime.value;
    });
</script>

<template>
    <div>
        <div v-if="renderTime !== null" class="render-time"> 渲染耗时: {{ renderTime.toFixed(2) }} 毫秒 </div>
        <div class="complex-block-container">
            <div
                v-for="block in blockList"
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
        color: #ff0000;
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
