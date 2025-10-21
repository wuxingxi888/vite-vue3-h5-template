<template>
    <mi-nav-bar
        @click-left="router.back"
        placeholder
        fixed
    >
        <template #title>
            {{ getTitle }}
        </template>

        <template #left>
            <i
                class="i-ic:sharp-arrow-back-ios"
                text-xl
            />
        </template>

        <template #right>
            <slot name="right" />
        </template>
    </mi-nav-bar>
</template>

<script setup lang="ts">
    const router = useRouter()
    const currentRoute = useRoute()

    const getTitle = computed(() => currentRoute.meta.title as string)
</script>

<style scoped lang="scss"></style>
