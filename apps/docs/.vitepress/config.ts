import { defineConfig } from 'vitepress';
import { nav } from './nav';
import menu from './menu';

export default defineConfig({
  title: 'Vite Vue3 H5 Template',
  lang: 'zh-CN',
  description: '基于 Turborepo 的 Monorepo 项目模板',
  base: '/vite-vue3-h5-template/',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  themeConfig: {
    // logo: "/logo.svg",
    nav,
    sidebar: menu,
    socialLinks: [
      {
        icon: 'github',
        ariaLabel: 'GitHub',
        link: 'https://github.com/wuxingxi888/vite-vue3-h5-template',
      },
      {
        icon: 'blog',
        link: 'http://wuxingxi.top/',
      },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
});
