import menu from "./menu";

module.exports = {
	lang: "zh-CN",
	title: "vite-vue3-h5-template",
	base: "/vite-vue3-h5-template/",
	description: "一个开箱即用的vue h5脚手架",
	lastUpdated: true,
	markdown: {
		lineNumbers: true,
	},
	head: [
		// 添加图标
		["link", { rel: "icon", href: "/logo.svg" }],
	],
	themeConfig: {
		nav: nav(),
		sidebar: menu,
		logo: "/logo.svg",
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/wuxingxi888/vite-vue3-h5-template",
			},
		],
		editLink: {
			pattern:
				"https://github.com/wuxingxi888/vite-vue3-h5-template/blob/docs/docs/:path",
			text: "在GitHub编辑此页",
		},
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2022-present project contributors",
		},
		algolia: {
			appId: "YMFP3LUK0J",
			apiKey: "ad6e6ce40ce3fc1c56e1c20264f88eef",
			indexName: "catalog",
			placeholder: "请输入关键词",
			buttonText: "搜索",
		},
	},
};

function nav() {
	return [
		{ text: "介绍", link: "/guide/" },
		{ text: "加入我们", link: "/guide/about/" },
		{ text: "个人网站", link: "http://wuxingxi.top/" },
		{
			text: "github仓库",
			link: "https://github.com/wuxingxi888/vite-vue3-h5-template",
		},
	];
}
