import { defineConfig, loadEnv, type UserConfig, type ConfigEnv } from 'vite';
import { getNowTime, pathResolve, wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { createBuild } from './build/vite/build';
import autoprefixer from 'autoprefixer';
import { postcssPxToViewProtConfig } from './build/vite/plugin/postcssPxToView';
import pkg from './package.json';

// 应用信息
const __APP_INFO__ = {
    pkg,
    lastBuildTime: getNowTime(),
};

/**
 * https://vite.dev/config/
 * @type {import('vite').UserConfig}
 * @param command dev/serve || build 命令模式
 * @param mode development || production 环境模式
 * */
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    // 当前工作目录
    const root = process.cwd();
    // 是否是构建 (dev/serve 或 build)
    const isBuild = command === 'build';
    // 加载env环境 (root目录下的 .env开头的环境文件)
    const env = loadEnv(mode, root);
    // 将env环境变量转换为对象
    const viteEnv = wrapperEnv(env);

    const { VITE_PUBLIC_PATH, VITE_PORT } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: createVitePlugins(viteEnv, isBuild),
        experimental: {
            renderBuiltUrl(filename: string) {
                return VITE_PUBLIC_PATH + filename;
            },
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: pathResolve('src'),
                },
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // @ts-expect-error
                    api: 'modern-compiler',
                    charset: false,
                    additionalData: `@use "@/styles/index.scss" as *;`,
                    modifyVars: {},
                    javascriptEnabled: true,
                },
            },
            postcss: {
                plugins: [
                    autoprefixer({
                        // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
                        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
                    }),
                    postcssPxToViewProtConfig(),
                ],
            },
        },
        server: {
            host: true,
            open: true,
            hmr: true, // 开启热更新
            port: Number(VITE_PORT),
            proxy: createProxy(),
            // 预热文件以降低启动期间的初始页面加载时长
            warmup: {
                // 预热的客户端文件：首页、views、 components
                clientFiles: ['./index.html', './src/{views,components}/*'],
            },
        },
        build: createBuild(viteEnv),
        esbuild: {
            // 使用esbuild来构建去掉console和debugger，
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
    };
});
