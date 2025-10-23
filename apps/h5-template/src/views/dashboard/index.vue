<script setup lang="ts">
    import { useEnv } from '@/hooks/useEnv';
    import { useScrollCache } from '@/hooks/useScrollCache';

    defineOptions({
        name: 'Dashboard',
    });

    const { getEnvConfig } = useEnv();
    const { title } = getEnvConfig();

    const cacheBox = ref(null);

    // 技术栈信息
    const stacks = [
        {
            src: 'https://img.shields.io/badge/-Vue.js-4FC08D?&logo=Vue.js&logoColor=white',
            alt: 'Vue.js',
        },
        {
            src: 'https://img.shields.io/badge/-Vite-646CFF?logo=Vite&logoColor=white',
            alt: 'Vite',
        },
        {
            src: 'https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white',
            alt: 'TypeScript',
        },
        {
            src: 'https://img.shields.io/badge/-UnoCSS-666?logo=UnoCSS&logoColor=white',
            alt: 'UnoCSS',
        },
        {
            src: 'https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white',
            alt: 'pnpm',
        },
        {
            src: 'https://img.shields.io/badge/-Sass-CC6699?logo=sass&logoColor=white',
            alt: 'Sass',
        },
    ];

    // 协同方案信息
    const scheme = [
        {
            src: 'https://img.shields.io/badge/-ESLint-4B32C3?logo=ESLint&logoColor=white',
            alt: 'ESLint',
        },
        {
            src: 'https://img.shields.io/badge/-Prettier-F7B93E?logo=Prettier&logoColor=white',
            alt: 'Prettier',
        },
        {
            src: 'https://img.shields.io/badge/-commitlint-000000?logo=commitlint&logoColor=white',
            alt: 'commitlint',
        },
        {
            src: 'https://img.shields.io/badge/-lint-000000?logo=lint&logoColor=white',
            alt: 'lint',
        },
    ];

    // 优点列表
    const merits = [
        '💡 基于Vue3、@miracle-web/ui、Vite5、TypeScript、UnoCSS等最新技术栈开发',
        '✨ 完善的Eslint + Prettier项目协同方案,开箱即用',
        '🔥 使用 Git Hook 进行 Lint Commit,规范化提交',
        '🌠 使用最新Vue 3.4+ 语法',
        '⚡️  轻量快速的热重载,无论应用程序大小如何,都始终极快的模块热重载(HMR)',
        '🔩 具备主题配置及黑暗主题适配，且持久化保存',
        '🛠️ 丰富的 Vite 插件,集成大部分 Vite 插件，无需繁琐配置，开箱即用',
        '📊 内置 useEcharts hooks,满足大部分图表展示，只需要写你的 Options',
        '🪝 内置Vue指令,使开发更为简单、快速',
        '⌛️ 内置JS与原生（Android/iOS）交互的封装',
        '🤔 内置openInstall,完成App渠道引流传参功能',
        '📦 Components、Hooks、Utils、Vue 的全自动导入，“0” 引入，彻底解放双手',
        '📦 plop代码模版一键生成，节约开发时间',
        '🥳 完善的登录系统、路由、Axios配置,所有基础设施已搭建完毕，你可以直接开发你的业务需求',
    ];

    onMounted(() => {
        useScrollCache(cacheBox.value);
    });
</script>

<template>
    <div class="h-screen w-full p-[15px]" ref="cacheBox">
        <!-- Header -->
        <header class="flex flex-col items-center mt-5">
            <Logo class="!h-20 !w-20" />
            <h1 class="title text-darkBlue dark:text-garyWhite mb-4 mt-5 text-center text-2xl font-black">
                {{ title }}
            </h1>
            <p class="text-color-regular text-[14px]">简单完善.开箱即用 🎁</p>
        </header>

        <!-- 简介 -->
        <section class="mt-[30px]">
            <h3 class="font-black text-[18px] dark:text-garyWhite">简介</h3>
            <p class="text-color-regular text-[14px] leading-[26px] mt-[10px]">
                {{ title }} 是一个基于前端前沿技术栈、干净、开箱即用的前端H5解决方案。
                提供完善的前端H5开发环境，快速启动项目，为专注业务实现与开发，提高开发效率而生，也可用于学习参考。
            </p>
        </section>

        <!-- 技术栈 -->
        <section class="mt-[30px]">
            <h3 class="font-black text-[18px] dark:text-garyWhite">技术栈</h3>
            <mi-space wrap class="mt-[10px]">
                <img v-for="stack in stacks" :key="stack.alt" v-lazy="stack.src" :alt="stack.alt" />
            </mi-space>
        </section>

        <!-- 协同方案 -->
        <section class="mt-[30px]">
            <h3 class="font-black text-[18px] dark:text-garyWhite">协同方案</h3>
            <mi-space wrap class="mt-[10px]">
                <img v-for="item in scheme" :key="item.alt" v-lazy="item.src" :alt="item.alt" />
            </mi-space>
        </section>

        <!-- 优点 -->
        <section class="mt-[30px]">
            <h3 class="font-black text-[18px] dark:text-garyWhite">优点</h3>
            <ul class="mt-[10px]">
                <li v-for="(merit, index) in merits" :key="index" class="text-color-regular text-[14px] leading-[26px]">
                    {{ index + 1 }}. {{ merit }}
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .title {
        font-family: '阿里妈妈东方大楷 Regular';
    }
</style>
