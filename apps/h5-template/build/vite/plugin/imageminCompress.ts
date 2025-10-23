/**
 * https://github.com/vbenjs/vite-plugin-imagemin/blob/main/README.zh_CN.md
 */
import type { Plugin } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export function configImageminCompressPlugin(): Plugin | Plugin[] {
    const plugins: Plugin[] = [];

    plugins.push(
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        })
    );
    return plugins;
}
