/**
 * @name configCdnImportPlugin
 * @description 生产环境配置cdn
 */
import type { Plugin } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals'

export const configCdnImportPlugin = (externalGlobalsObj): Plugin | Plugin[] => {

    const plugins: Plugin[] = []

    // CDN外链，会插入到index.html中（vue全家桶开启cdn加速意义不大 考虑安全稳定问题 最好是上传到服务器中）
    const cdn = {
        css: ["https://cdn.jsdelivr.net/npm/vant@4.8.3/lib/index.min.css"],
        js: [
            "https://cdn.jsdelivr.net/npm/vue@3.4.15/dist/vue.global.prod.js",
            "https://cdn.jsdelivr.net/npm/vant@4.8.3/lib/vant.min.js",
            "https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.min.js",
            "https://cdn.jsdelivr.net/npm/vue-demi@0.14.6/lib/index.iife.min.js",
            'https://cdn.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.min.js',
            "https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js",
        ],
    };

    plugins.push(
        {
            name: 'custom-html-transform',
            transformIndexHtml(html) {
                // 获取配置中的 CDN 资源
                const cdnCss = cdn && cdn.css || [];
                const cdnJs = cdn && cdn.js || [];

                // 生成 CSS 预加载和链接标签
                const cssTags = cdnCss.map(url => `<link href="${url}" rel="preload" as="style" />
                                                  <link href="${url}" rel="stylesheet" />`).join('\n');

                // 生成 JS 脚本标签
                const jsTags = cdnJs.map(url => `<script src="${url}" defer></script>`).join('\n');

                // 替换原始 HTML 中的占位符
                html = html.replace('<!--CDN_CSS-->', cssTags);
                html = html.replace('<!--CDN_JS-->', jsTags);

                return html;
            }
        }
    )

    plugins.push(
        {
            ...externalGlobals(externalGlobalsObj),
            enforce: 'post',
            apply: 'build',
        },
    )


    return plugins
}
