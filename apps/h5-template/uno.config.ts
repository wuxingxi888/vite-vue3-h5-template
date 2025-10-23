import { defineConfig, presetAttributify, presetTypography, presetWind3, presetWebFonts } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import presetRemToPx from '@unocss/preset-rem-to-px';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';

/**
 * UnoCSS 配置
 * @see https://unocss.dev/
 * @see https://unocss-cn.pages.dev/
 */
export default defineConfig({
    presets: [
        /**
         * UnoCSS 预设
         * @see https://unocss.dev/presets/
         */
        presetWind3(),

        /**
         * rem转px预设 (unoCss默认单位为rem,模版使用vw/vh适配，需要转成px，然后由postcss把px转成 vw/vh)
         * @see https://unocss-cn.pages.dev/presets/rem-to-px
         */
        presetRemToPx({
            baseFontSize: 16,
        }),

        /**
         * 图标预设
         * @see https://unocss-cn.pages.dev/presets/icons
         * 可用图标库
         * @see https://icones.js.org/
         * @see https://icon-sets.iconify.design/
         */
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),

        /**
         * 属性模式（class过多时可启用）
         * @see https://unocss-cn.pages.dev/presets/attributify#attributify-mode
         * */
        presetAttributify(),

        /**
         * 文字排版预设
         * @see https://unocss-cn.pages.dev/presets/typography
         */
        presetTypography(),

        /**
         * 网络字体预设
         * @see https://unocss-cn.pages.dev/presets/web-fonts
         * 可使用字体
         * @see https://fonts.google.com/
         * @see https://www.fontshare.com/
         */
        presetWebFonts({
            provider: 'google',
            fonts: {
                msz: ['Ma Shan Zheng'],
            },
        }),
    ],
    transformers: [
        /**
         * 启用 UnoCSS 的变体组功能(用法简写)
         * @see https://unocss-cn.pages.dev/transformers/variant-group
         */
        transformerVariantGroup(),
        /**
         * 启用样式里也可以使用原子化
         * @see https://unocss-cn.pages.dev/transformers/directives
         */
        transformerDirectives(),
    ],

    // 一些实用的自定义组合
    shortcuts: {
        // 用于设置元素的外边距为0并居中对齐
        'm-0-auto': 'm-0 ma',
        // 用于设置元素的宽度和高度均为100%
        'wh-full': 'w-full h-full',
        // 用于设置元素为flex布局并居中对齐
        'flex-center': 'flex justify-center items-center',
        // 用于设置元素为flex布局并水平居中对齐
        'flex-x-center': 'flex justify-center',
        // 用于设置元素为flex布局并垂直居中对齐
        'flex-y-center': 'flex items-center',
        // 用于设置文本溢出隐藏并显示省略号
        'text-overflow': 'overflow-hidden whitespace-nowrap text-ellipsis',
        // 用于设置文本换行和断行特性
        'text-break': 'whitespace-normal break-all break-words',
    },

    // 指定始终要生成的css类
    safelist: ['i-mage:dashboard-2-fill', 'i-bxs:chart', 'i-mingcute:list-expansion-fill', 'i-tabler:brand-minecraft'],
});
