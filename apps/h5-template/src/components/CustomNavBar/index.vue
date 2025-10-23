<template>
    <mi-nav-bar @click-left="onBack()" placeholder fixed>
        <template #title>
            {{ getTitle }}
        </template>

        <template #left>
            <i class="i-ic:sharp-arrow-back-ios" text-xl />
        </template>

        <template #right>
            <slot name="right" />
        </template>
    </mi-nav-bar>
</template>

<script setup lang="ts">
    import JsCallNative from '@/services/jsCallNative';

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
    });

    const route = useRoute();

    const getTitle = computed(() => props.title || (route.meta.title as string));

    const onBack = () => JsCallNative.back();
</script>

<style scoped lang="scss">
    @media screen and (min-width: 576px) {
        :deep(.mi-nav-bar--fixed) {
            top: 29px !important;
        }
    }
</style>
