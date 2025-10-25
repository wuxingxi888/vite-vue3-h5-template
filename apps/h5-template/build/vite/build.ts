import type { BuildOptions } from 'vite';

/**
 * 创建 Vite 构建配置
 * @param viteEnv - Vite 环境变量对象，包含构建所需的各种环境配置
 * @returns 构建配置选项，用于配置 Vite 的构建行为
 */
export function createBuild(viteEnv: ViteEnv): BuildOptions {
    const { VITE_OUTPUT_DIR } = viteEnv;
    return {
        // 是否生成 source map 文件，用于调试和错误追踪
        sourcemap: false,
        // 指定输出路径，从环境变量中获取
        outDir: VITE_OUTPUT_DIR,
        // 启用/禁用 CSS 代码拆分，禁用时整个项目的所有 CSS 将被内联到一个文件中
        cssCodeSplit: false,
        // 移除或修改 target 配置
        target: 'esnext',
        // 指定使用的压缩器，'esbuild' 比 'terser' 构建速度更快但打包体积略大
        minify: 'esbuild',
        // 静态资源在编码为 base64 字符串之前的最小大小（以字节为单位），小于此大小的资源将内联为 base64
        assetsInlineLimit: 4096,
        // 警告消息阈值，chunk 大小超过此阈值时会显示警告
        chunkSizeWarningLimit: 2000,
        // 添加静态资源处理配置
        // 指定生成静态资源的存放目录，相对于 outDir
        assetsDir: 'static',
        // Rollup 打包相关配置
        rollupOptions: {
            output: {
                // 指定非入口 chunk 文件的名称，用于代码分割
                chunkFileNames: 'static/js/[name]-[hash].js',
                // 指定入口文件的名称
                entryFileNames: 'static/js/[name]-[hash].js',
                // 静态资源文件命名规则
                assetFileNames: assetInfo => {
                    const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
                    if (!extType) return 'static/assets/[name]-[hash][extname]';

                    // 处理不同资源类型
                    if (/png|jpe?g|gif|svg|webp|avif|ico|bmp/i.test(extType)) {
                        return 'static/images/[name]-[hash][extname]';
                    }
                    if (/woff2?|eot|ttf|otf/i.test(extType)) {
                        return 'static/fonts/[name]-[hash][extname]';
                    }
                    if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
                        return 'static/media/[name]-[hash][extname]';
                    }
                    if (/css/i.test(extType)) {
                        return 'static/css/[name]-[hash][extname]';
                    }
                    return 'static/assets/[name]-[hash][extname]';
                },
            },
        },
    };
}
