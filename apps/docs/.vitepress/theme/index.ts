import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { h } from 'vue';
import './custom.css';
import PhonePreview from './PhonePreview.vue';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        ctx.app.component('PhonePreview', PhonePreview);
    },
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(PhonePreview),
        });
    },
} satisfies Theme;
