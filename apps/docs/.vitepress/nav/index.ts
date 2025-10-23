import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
  { text: "指南", link: "/guide/" },
  {
    text: "版本",
    items: [
      {
        text: "react版本",
        link: "https://github.com/wuxingxi888/vite-react-h5-template.git"
      }
    ]
  },
  { text: "个人博客", link: "http://wuxingxi.top/" },
  {
    text: "GitHub",
    link: "https://github.com/wuxingxi888"
  },
  {
    text: "加入我们",
    link: "/guide/about/join-us"
  }
];
