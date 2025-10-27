import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import UnoCSS from 'unocss/vite';
import { configStyleImportPlugin } from './styleImport';
import { configAutoImportPlugin } from './autoImport';
import { configAutoComponentsPlugin } from './autocomponents';
import { configCompressPlugin } from './compress';
import { configImageminCompressPlugin } from './imageminCompress';
import { configVisualizerConfig } from './visualizer';
import { configProgressPlugin } from './progress';
import { configLegacyPlugin } from './legacy';
// import { configCdnImportPlugin } from './cdnImport';
import { configSvgIconsPlugin } from './svgSprite';
import { configMockPlugin } from './mock';
import { configHtmlPlugin } from './injectHtml';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

    const vitePlugins: (Plugin | Plugin[])[] = [
        // vue支持
        vue(),
        // JSX支持
        vueJsx({
            include: /\.(jsx|tsx)/,
        }),
        // eslint支持
        eslintPlugin(),
        // UnoCSS支持
        UnoCSS(),
    ];
    // 自动按需引入样式
    vitePlugins.push(configStyleImportPlugin());

    // 自动按需引入组件
    vitePlugins.push(configAutoComponentsPlugin());

    // 自动按需引入依赖
    vitePlugins.push(configAutoImportPlugin());

    // es兼容性支持
    vitePlugins.push(configLegacyPlugin());

    // 构建时显示进度条
    vitePlugins.push(configProgressPlugin());

    // 打包分析rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig());

    // mock数据
    vitePlugins.push(configMockPlugin(VITE_USE_MOCK, isBuild));

    // svgIcon
    vitePlugins.push(configSvgIconsPlugin(isBuild));

    // 加载 html 插件 vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv));

    // 编译开启
    if (isBuild) {
        // 开启.gz压缩  rollup-plugin-gzip （nginx也需要配合修改）
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));

        // 图片压缩（此插件需使用魔法下载，根据实际情况使用）
        vitePlugins.push(configImageminCompressPlugin());

        // 暂时禁用 CDN 导入，使用本地资源
        // vitePlugins.push(configCdnImportPlugin());
    }

    return vitePlugins;
}
