<template>
    <div class="flex flex-col items-center justify-center">
        <div class="logo enter-x mb-8 mt-4">
            <Logo class="!h-30 !w-30" name="logo" />
        </div>
        <div class="text-darkBlue dark:text-garyWhite enter-x mb-12 text-xl font-black">
            {{ title }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useEnv } from '@/hooks/useEnv';

    const { getEnvConfig } = useEnv();

    const { title } = getEnvConfig();
</script>

<style scoped lang="scss"></style>
