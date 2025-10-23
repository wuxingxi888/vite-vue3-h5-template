<script setup lang="ts">
    import { getParamsToUrl } from '@miracle-web/utils';
    import { showLoadingToast, closeToast, showToast } from '@miracle-web/ui';

    const iframeUrl = ref<string>('');
    const title = ref<string>('');

    const handleLoadFinish = () => {
        closeToast();
    };

    const handleError = () => {
        closeToast();
        showToast('加载失败，请检查URL或网络连接');
    };

    const onRefresh = () => {
        showLoading();
        const currentUrl = iframeUrl.value;
        iframeUrl.value = ''; // 清空 URL
        setTimeout(() => {
            iframeUrl.value = currentUrl; // 重新设置 URL，触发刷新
        }, 0);
    };

    const showLoading = () => {
        showLoadingToast({
            message: '加载中...',
            duration: 0,
            forbidClick: true,
        });
    };

    onMounted(() => {
        iframeUrl.value = getParamsToUrl('url');
        title.value = getParamsToUrl('title');
        showLoading();
    });
</script>

<template>
    <div class="h-screen flex flex-col">
        <custom-nav-bar :title="title">
            <template #right>
                <i class="i-ic:sharp-refresh mr-2 text-xl" @click="onRefresh" />
            </template>
        </custom-nav-bar>
        <iframe
            class="w-full flex-1"
            v-if="iframeUrl.length > 0"
            :src="iframeUrl"
            frameborder="0"
            allowfullscreen="true"
            referrerpolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            @load="handleLoadFinish"
            @error="handleError"
        ></iframe>
    </div>
</template>

<style lang="scss" scoped></style>
