/**
 * @name configCdnImportPlugin
 * @description 生产环境配置cdn
 */
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import';


export const configCdnImportPlugin = () => {
    // Tips：如果出现 CDN 配置的资源无法访问需修改配置或者可先不使用 importToCDN 
    return importToCDN({
        // prodUrl：可选，默认指向 https://cdn.jsdelivr.net/npm/{name}@{version}/{path}
        // 可使用这种格式 https://cdn.jsdelivr.net/npm/element-plus@2.2.32 查看是否存在 例如打开浏览器访问得到  https://cdn.jsdelivr.net/npm/element-plus@2.2.32/dist/index.full.js
        // prodUrl: '/{path}', // 根目录 需要格外注意配置路径是否正确，且需要把资源先down下来
        // prodUrl: 'https://xxx.com/{name}@{version}/{path}', // 自己的服务器上
        prodUrl: 'https://unpkg.com/{name}@{version}/{path}', // https://unpkg.com/
        modules: [
            autoComplete('vue'),  // 自动解析
            autoComplete('axios'),
            {
                name: 'vant',
                var: 'vant', // 外部化的依赖提供一个全局变量 同rollupOptions配置中的globals的值
                path: 'https://fastly.jsdelivr.net/npm/vant@4/lib/vant.min.js',
                css: 'https://fastly.jsdelivr.net/npm/vant@4/lib/index.css'
            },
            {
                name: 'vue-router',
                var: 'VueRouter',
                path: 'dist/vue-router.global.js'
            },
            // VueDemi这个是pinia用来判断是vue2还是vue3所需要的，要额外引入一下
            {
                name: 'vue-demi',
                var: 'VueDemi',
                path: 'https://unpkg.com/vue-demi@0.13.1/lib/index.iife.js'
            },
            {
                name: 'pinia',
                var: 'Pinia',
                path: 'dist/pinia.iife.js'
            },
        ],
    })
}
