# 快速上手

## node 版本要求

本示例 Node.js v16.6.0，你也可以使用[nvm](https://github.com/nvm-sh/nvm)或[nvm-windows](https://github.com/coreybutler/nvm-windows)在同一台电脑上管理多个 node 版本。

## 包管理器

本项目采用 pnpm 包管理器,如果没有请先安装 pnpm。

## 启动项目

master 分支代码为稳定版本，test 分支代码是最新版

```js

// 拉取项目
git clone https://github.com/wuxingxi888/vite-vue3-h5-template.git

// 进入项目目录
cd vite-vue3-h5-template

// 全局安装 pnpm
npm i -g pnpm

// 安装依赖
pnpm install

// 启动项目
pnpm dev

// 本地预览打包的项目
pnpm preview

// 打包 test 环境
pnpm build:test

// 打包 prod 环境
pnpm build:prod

```
