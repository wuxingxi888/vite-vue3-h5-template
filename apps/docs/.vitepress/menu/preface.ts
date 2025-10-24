import type { DefaultTheme } from 'vitepress';

const preface: DefaultTheme.SidebarItem = {
    text: '前言',
    collapsed: false,
    items: [
        { text: '项目简介', link: '/guide/' },
        { text: '项目结构', link: '/guide/structure' },
        { text: '安装与运行', link: '/guide/installation' },
        { text: '快速开始', link: '/guide/getting-started' },
    ],
};

export default preface;
