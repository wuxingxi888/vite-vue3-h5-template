<script setup lang="ts">
    const addAnimation = () => {
        const demo = document.querySelector('.demo')
        demo?.classList.add('animate-bounce-alt', 'animate-count-infinite', 'animate-duration-1s')
    }

    const removeAnimation = () => {
        const demo = document.querySelector('.demo')
        demo?.classList.remove('animate-bounce-alt', 'animate-count-infinite', 'animate-duration-1s')
    }

    const changeFont = () => {
        const demo = document.querySelector('.demo')
        demo?.classList.add('font-msz')
    }

    const resetFont = () => {
        const demo = document.querySelector('.demo')
        demo?.classList.remove('font-msz')
    }
</script>

<template>
    <div class="h-screen overflow-scroll">
        <custom-nav-bar />
        <div class="p-20px">
            <div class="custom-card flex-center">
                <span class="demo dark:text-black text-18px">即时按需的原子CSS引擎</span>
            </div>

            <div>
                <mi-space
                    wrap
                    class="mt-10px"
                >
                    <mi-button
                        type="primary"
                        size="small"
                        @click="addAnimation"
                    >
                        添加动画
                    </mi-button>

                    <mi-button
                        type="primary"
                        size="small"
                        @click="removeAnimation"
                    >
                        移除动画
                    </mi-button>

                    <mi-button
                        type="primary"
                        size="small"
                        @click="changeFont"
                    >
                        修改字体
                    </mi-button>

                    <mi-button
                        type="primary"
                        size="small"
                        @click="resetFont"
                    >
                        重置字体
                    </mi-button>
                </mi-space>
            </div>

            <div class="custom-card">
                <span class="custom-title">CSS图标</span>
                <div class="mt-10px flex-center">
                    <div class="icon i-ic:baseline-10k"></div>
                    <div class="icon i-ic:baseline-agriculture"></div>
                    <div class="icon i-ic:baseline-21mp"></div>
                    <div class="icon i-ic:baseline-60fps"></div>
                    <div class="icon i-ic:baseline-light-mode"></div>
                    <div class="icon i-ic:baseline-surfing"></div>
                </div>
            </div>

            <div class="custom-card">
                <span class="custom-title"> line-clamp-2来截断多行文本 </span>
                <p class="line-clamp-2">
                    Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt
                    deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in
                    quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis
                    nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur.
                    Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
                </p>
            </div>

            <div class="custom-card">
                <p class="custom-title"> 元素之间的空间 </p>
                <p>仅在父级上使用space-x-*, space-y-*属性，而不是在每个子级上使用gap, margin, padding属性</p>
                <ul class="flex flex-row space-x-5 mt-10px">
                    <li class="size-16 bg-blue flex-center icon">Item 1</li>
                    <li class="size-16 bg-blue flex-center icon">Item 2</li>
                    <li class="size-16 bg-blue flex-center icon">Item 3</li>
                </ul>
            </div>

            <div class="custom-card">
                <p class="custom-title"> 组悬停 </p>
                <div class="flex-center mt-10px">
                    <button class="group flex items-center px-4 py-2 bg-blue text-white rounded-md">
                        <span>Click</span>
                        <span className="ml-2 inline-block group-hover:rotate-90"> &rarr; </span>
                    </button>
                </div>
            </div>

            <div class="custom-card">
                <p class="custom-title"> 自定义输入值 </p>
                <p>通过使用property-[value]语法来实现</p>
                <div class="flex-center mt-10px">
                    <h5 className="text-[#007bff] text-[2rem]">Hello World</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .custom-card {
        --at-apply: w-auto min-h-20 p-3 flex-col bg-white rounded-2 mt-3;
    }

    .custom-title {
        --at-apply: dark: text-black text-4 font-500;
    }

    .icon {
        --at-apply: w-3em h-3em;
    }
</style>
