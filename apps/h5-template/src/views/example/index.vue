<template>
    <div class="my-4">
        <mi-cell-group inset>
            <mi-cell center title="🌓 暗黑模式">
                <template #right-icon>
                    <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
                    <span class="mx-2">{{ toggleTheme ? 'Dark' : 'Light' }}</span>
                    <mi-switch v-model="toggleTheme" size="22" />
                </template>
            </mi-cell>

            <mi-cell center title="🆖 调试模式">
                <template #right-icon>
                    <mi-switch
                        v-model="isDebug"
                        size="22px"
                        @change="
                            v => {
                                setOpenEruda(v);
                            }
                        "
                    />
                </template>
            </mi-cell>

            <mi-cell v-for="item in menuItems" :key="item.route" :title="item.title" :to="item.route" is-link>
                <template #icon>
                    <i :class="['mr-2', 'text-xl', item.icon]" />
                </template>
            </mi-cell>
        </mi-cell-group>
    </div>
</template>

<script setup lang="ts">
    import { useTheme } from '@/hooks/useTheme';
    import { useAppStore } from '@/store/modules/app';

    const { toggleTheme } = useTheme();
    const { openEruda, setOpenEruda } = useAppStore();

    const isDebug = ref(openEruda);

    const menuItems = [
        { title: '主题设置', route: '/themeSetting', icon: 'i-material-symbols:palette' },
        { title: 'keep-alive', route: '/editNickname', icon: 'i-token:keep' },
        { title: '404 页演示', route: '/404', icon: 'i-tabler:error-404' },
        { title: 'openInstall', route: '/openInstall', icon: 'i-material-symbols:apk-install-rounded' },
        { title: '指令合集', route: '/directives', icon: 'i-icon-park-twotone:direction' },
        { title: '项目依赖', route: '/dependence', icon: 'i-mdi:dependency' },
        { title: 'SVG图标', route: '/svgIcon', icon: 'i-hugeicons:svg-02' },
        { title: 'unoCss', route: '/unoCss', icon: 'i-ic:twotone-css' },
        { title: '滚动缓存', route: '/scrollCache', icon: 'i-ri:scroll-to-bottom-fill' },
        { title: '列表刷新加载', route: '/pullRefreshList', icon: 'i-svg-spinners-90-ring-with-bg' },
        {
            title: 'GITHUB',
            route: '/webview?title=GITHUB&url=https://github.com/wuxingxi888',
            icon: 'i-mdi:github',
        },
        {
            title: 'BLOG',
            route: '/webview?title=博客&url=https://wuxingxi.top/',
            icon: 'i-simple-icons:bloglovin',
        },
        {
            title: 'MIRACLE-WEB/UI',
            route: '/webview?title=MIRACLE-WEB/UI&url=https://wuxingxi.top/miracle/',
            icon: 'i-mingcute:components-fill',
        },
    ];
</script>

<style scoped lang="scss"></style>
