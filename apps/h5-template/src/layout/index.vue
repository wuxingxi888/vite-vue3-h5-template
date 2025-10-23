<template>
    <div class="h-screen flex flex-col">
        <routerView class="flex-1 overflow-x-hidden" v-slot="{ Component, route }">
            <keep-alive :include="keepAliveComponents">
                <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath" />
            </keep-alive>
            <component v-if="!route.meta.keepAlive" :is="Component" :key="route.fullPath" />
        </routerView>

        <mi-tabbar route fixed placeholder>
            <mi-tabbar-item v-for="menu in getMenus[0].children" :key="menu.name" replace :to="menu.path">
                <template #icon>
                    <i :class="menu.meta?.icon" />
                </template>
                {{ menu.meta?.title }}
            </mi-tabbar-item>
        </mi-tabbar>
    </div>
</template>

<script setup lang="ts">
    import type { ComputedRef } from 'vue';
    import { computed } from 'vue';
    import type { RouteRecordRaw } from 'vue-router';
    import { useRouteStore } from '@/store/modules/route';

    const routeStore = useRouteStore();

    const keepAliveComponents = computed(() => routeStore.keepAliveComponents);

    const getMenus: ComputedRef<RouteRecordRaw[]> = computed(() => routeStore.menus);
</script>
