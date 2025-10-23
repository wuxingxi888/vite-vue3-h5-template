import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import type { Fn } from '@vueuse/core';
import { tryOnUnmounted, useDebounceFn, useTimeoutFn, useEventListener } from '@vueuse/core';
import { computed, nextTick, ref, unref, watch } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import echarts from './echarts';

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
    const themeStore = useThemeStore();

    const getThemeMode = computed(() => {
        return theme === 'default' ? themeStore.getThemeMode : theme;
    });

    let chartInstance: echarts.ECharts | null = null;

    let resizeFn: Fn = resize;

    const cacheOptions = ref({});

    resizeFn = useDebounceFn(resize, 200);

    const getOptions = computed((): EChartsOption => {
        if (getThemeMode.value !== 'dark') {
            return cacheOptions.value;
        }
        return {
            backgroundColor: 'transparent',
            ...cacheOptions.value,
        };
    });

    function initCharts(t = theme) {
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }

        chartInstance = echarts.init(el, t);

        useEventListener(window, 'resize', resizeFn);
    }

    function setOptions(options: EChartsOption, clear = true) {
        cacheOptions.value = options;
        if (unref(elRef)?.offsetHeight === 0) {
            useTimeoutFn(() => {
                setOptions(unref(getOptions));
            }, 30);
            return;
        }
        nextTick(() => {
            useTimeoutFn(() => {
                if (!chartInstance) {
                    initCharts(getThemeMode.value as 'default');

                    if (!chartInstance) {
                        return;
                    }
                }
                clear && chartInstance?.clear();

                chartInstance?.setOption(unref(getOptions));
            }, 30);
        });
    }

    function resize() {
        chartInstance?.resize();
    }

    watch(
        () => getThemeMode.value,
        theme => {
            if (chartInstance) {
                chartInstance.dispose();
                initCharts(theme as 'default');
                setOptions(cacheOptions.value);
            }
        }
    );

    tryOnUnmounted(() => {
        if (!chartInstance) {
            return;
        }
        chartInstance.dispose();
        chartInstance = null;
    });

    function getInstance(): echarts.ECharts | null {
        if (!chartInstance) {
            initCharts(getThemeMode.value as 'default');
        }
        return chartInstance;
    }

    return {
        setOptions,
        resize,
        echarts,
        getInstance,
    };
}
