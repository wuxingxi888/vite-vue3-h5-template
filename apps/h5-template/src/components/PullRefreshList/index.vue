<script setup lang="ts" generic="T extends ListItem">
    // 基础列表项接口（可被扩展）
    export interface ListItem {
        [key: string]: any;
    }

    // 定义组件实例类型
    export type PullRefreshListInstance<T extends ListItem> = {
        updateList: (data: T[], totalCount?: number) => void;
        setError: () => void;
        reset: () => void;
        refresh: () => void;
        list: T[];
    };

    // 定义 Props 类型（使用类型别名）
    export type PullRefreshListProps = {
        // 是否禁用下拉刷新
        disabled?: boolean;
        // 滚动条与底部距离小于 offset 时触发load事件
        offset?: number;
        // 是否在初始化时立即执行滚动位置检查
        immediateCheck?: boolean;
        // 每页数据条数
        pageSize?: number;
        // 数据超过多少条显示加载完成的文案
        showFinishedTextNumber?: number;
        // 下拉刷新过程提示文案
        pullDownPullingText?: string;
        // 下拉刷新释放过程提示文案
        pullDownLoosingText?: string;
        // 下拉刷新加载过程提示文案
        pullDownLoadingText?: string;
        // 下拉刷新成功提示文案
        pullDownSuccessText?: string;
        // 上拉加载过程中的提示文案
        pullUpLoadingText?: string;
        // 上拉加载完成后的提示文案
        pullUpFinishedText?: string;
        // 上拉加载失败的提示文案
        pullUpErrorText?: string;
        // 列表数据为空的文案
        emptyDataText?: string;
    };

    defineOptions({
        name: 'PullRefreshList',
    });

    const props = withDefaults(defineProps<PullRefreshListProps>(), {
        disabled: false,
        offset: 100,
        immediateCheck: true,
        pageSize: 10,
        showFinishedTextNumber: 6,
        pullDownPullingText: '下拉即可刷新...',
        pullDownLoosingText: '释放立即刷新...',
        pullDownLoadingText: '正在刷新...',
        pullDownSuccessText: '刷新成功',
        pullUpLoadingText: '正在加载...',
        pullUpFinishedText: '没有更多了',
        pullUpErrorText: '加载失败，点击重试',
        emptyDataText: '暂无数据',
    });

    const isLoading = ref(false);
    const isRefreshing = ref(false);
    const finished = ref(false);
    const error = ref(false);
    const pageNo = ref(0);
    const total = ref(0);
    const list = ref<T[]>([]);

    const emit = defineEmits<{
        // 数据加载事件，返回数据和是否是刷新操作
        (e: 'onLoad', page: number, pageSize: number): void;
        // 数据加载完成事件
        (e: 'onLoadSuccess', data: T[], total: number): void;
        // 数据加载失败事件
        (e: 'onLoadError'): void;
    }>();

    // 处理刷新操作
    const handleRefresh = () => {
        pageNo.value = 1;
        finished.value = false;
        isRefreshing.value = true;
        isLoading.value = true;
        error.value = false;
        emit('onLoad', pageNo.value, props.pageSize);
    };

    // 处理加载操作
    const handleLoad = () => {
        if (!isRefreshing.value) {
            pageNo.value++;
            isLoading.value = true;
            error.value = false;
            emit('onLoad', pageNo.value, props.pageSize);
        }
    };

    // 处理错误点击
    const handleErrorClick = () => {
        if (isRefreshing.value) {
            handleRefresh();
        } else {
            handleLoad();
        }
    };

    const updateList = (data: T[], totalCount: number = 0) => {
        if (isRefreshing.value) {
            list.value = [...data];
            isRefreshing.value = false;
        } else {
            list.value = [...(list.value as T[]), ...data] as T[];
        }

        isLoading.value = false;

        total.value = totalCount;

        if (list.value.length == totalCount || data.length < props.pageSize) {
            finished.value = true;
        }

        emit('onLoadSuccess', data, totalCount);
    };

    const setError = () => {
        if (isRefreshing.value) {
            isRefreshing.value = false;
        }
        isLoading.value = false;
        error.value = true;
        emit('onLoadError');
    };

    // 外部调用方法：重置列表
    const reset = () => {
        list.value = [];
        pageNo.value = 1;
        total.value = 0;
        finished.value = false;
        isLoading.value = false;
        isRefreshing.value = false;
        error.value = false;
    };

    // 外部调用方法：手动触发刷新
    const refresh = () => {
        handleRefresh();
    };

    // 暴露方法给父组件使用
    defineExpose<PullRefreshListInstance<T>>({
        updateList,
        setError,
        reset,
        refresh,
        list: list.value as T[],
    });
</script>

<template>
    <mi-pull-refresh class="w-full h-full" v-model="isRefreshing" :disabled="disabled" @refresh="handleRefresh">
        <!-- 自定义下拉刷新插槽 -->
        <template #pulling="props">
            <slot name="pulling" v-bind="props">
                <div class="mi-default-pulling">
                    {{ pullDownPullingText }}
                </div>
            </slot>
        </template>

        <template #loosing>
            <slot name="loosing">
                <div class="mi-default-loosing">{{ pullDownLoosingText }}</div>
            </slot>
        </template>

        <template #loading>
            <slot name="loading">
                <div class="mi-default-loading">
                    <mi-loading size="22px">{{ pullDownLoadingText }}</mi-loading>
                </div>
            </slot>
        </template>

        <template #success>
            <slot name="loosing">
                <div class="mi-default-success">{{ pullDownSuccessText }}</div>
            </slot>
        </template>

        <mi-list
            v-model:loading="isLoading"
            :finished="finished"
            :error="error"
            :immediate-check="immediateCheck"
            :offset="offset"
            @load="handleLoad"
        >
            <!-- 默认插槽用于列表内容 -->
            <template #default>
                <slot name="list" :list="list"></slot>
            </template>

            <!-- 自定义加载状态插槽 -->
            <template #loading>
                <slot name="load-loading">
                    <div class="mi-default-loading">
                        <mi-loading size="22px" v-if="!isRefreshing">
                            {{ pullUpLoadingText }}
                        </mi-loading>
                    </div>
                </slot>
            </template>

            <template #finished>
                <slot name="load-finished">
                    <div class="mi-default-finished">
                        {{ list.length > showFinishedTextNumber ? pullUpFinishedText : '' }}
                    </div>
                </slot>
            </template>

            <template #error>
                <slot name="load-error">
                    <div class="mi-default-error" @click="handleErrorClick">
                        {{ pullUpErrorText }}
                    </div>
                </slot>
            </template>
        </mi-list>

        <!-- 支持自定义空状态 -->
        <div v-if="!list.length && !isLoading && !isRefreshing">
            <slot name="empty">
                <mi-empty :description="emptyDataText"> </mi-empty>
            </slot>
        </div>
    </mi-pull-refresh>
</template>

<style lang="scss" scoped>
    .mi-default-pulling,
    .mi-default-loosing,
    .mi-default-loading,
    .mi-default-finished,
    .mi-default-error {
        text-align: center;
        color: #969799;
        font-size: 14px;
    }

    .mi-default-error {
        color: #ee0a24;
    }
</style>
