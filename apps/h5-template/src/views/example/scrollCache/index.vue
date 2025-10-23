<script setup lang="ts">
    import { useScrollCache } from '@/hooks/useScrollCache';
    import { ref, onMounted } from 'vue';

    defineOptions({
        name: 'ScrollCache',
    });

    const list = ref<number[]>([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const cacheBox = ref(null);

    const onLoad = () => {
        setTimeout(() => {
            if (refreshing.value) {
                list.value = [];
                refreshing.value = false;
            }
            for (let i = 0; i < 10; i++) {
                list.value.push(list.value.length + 1);
            }
            loading.value = false;
            if (list.value.length >= 40) {
                finished.value = true;
            }
        }, 1000);
    };

    const onRefresh = () => {
        finished.value = false;
        loading.value = true;
        onLoad();
    };

    onMounted(() => {
        useScrollCache(cacheBox.value);
    });
</script>

<template>
    <div class="h-screen overflow-y-scroll" ref="cacheBox">
        <custom-nav-bar>
            <template #right>
                <mi-button size="small" type="primary" to="dependence"> 子页面 </mi-button>
            </template>
        </custom-nav-bar>

        <mi-divider>滑动当前列表切换到子页面，返回当前页面看缓存效果</mi-divider>

        <div class="p-[20px]">
            <mi-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <mi-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <mi-cell mb-1 v-for="item in list" :key="item" :title="item" />
                </mi-list>
            </mi-pull-refresh>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
