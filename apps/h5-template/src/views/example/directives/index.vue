<script setup lang="ts">
    import { showToast } from '@miracle-web/ui'
    const copyText = ref('')

    const imgUrl = ref('https://cdn.seovx.com/ha/?mom=302')
</script>

<template>
    <div class="h-100vh overflow-y-scroll">
        <custom-nav-bar />
        <div class="p-20px">
            <mi-divider>复制指令</mi-divider>
            <mi-cell-group inset>
                <mi-field
                    v-model="copyText"
                    center
                    clearable
                    placeholder="请输入内容用于复制"
                >
                    <template #button>
                        <mi-button
                            size="small"
                            type="primary"
                            v-copy="copyText"
                            >复制</mi-button
                        >
                    </template>
                </mi-field>
            </mi-cell-group>

            <mi-divider>拖动指令</mi-divider>
            <div class="bg-blue-400 w-full h-200px relative">
                <div
                    class="bg-red w-50px h-50px text-white flex-center text-14px"
                    v-drag
                >
                    拖动我
                </div>
            </div>

            <mi-divider>长按指令</mi-divider>
            <div
                class="bg-blue-400 w-full h-100px flex-center text-white"
                v-long-press="
                    () => {
                        showToast('长按成功')
                    }
                "
            >
                长按2秒执行
            </div>

            <mi-divider>水印指令</mi-divider>
            <div
                class="bg-blue-400 w-full h-100px flex-center text-white"
                v-watermark="{ text: '我是水印', textColor: 'rgba(255, 0, 0, 0.9)' }"
            ></div>

            <mi-divider>涟漪指令</mi-divider>
            <div
                class="bg-blue-400 w-full h-100px flex-center text-white"
                v-ripple
                >请点击我</div
            >

            <mi-divider>防抖指令</mi-divider>
            <div class="bg-blue-400 w-full h-100px relative text-white text-center">
                请快速频繁点击，频繁触发时，只有在最后一次触发后的一段时间内没有再触发，才会执行函数
                <button
                    class="w-100px h-30px bg-red text-white absolute top-50px left-0 right-0 bottom-0 m-auto"
                    v-debounce="
                        () => {
                            showToast('防抖执行成功')
                        }
                    "
                    >防抖提交</button
                >
            </div>

            <mi-divider>截流指令</mi-divider>
            <div class="bg-blue-400 w-full h-100px relative text-white text-center">
                请快速频繁点击，在规定时间内，只执行一次
                <button
                    class="w-100px h-30px bg-red text-white absolute top-50px left-0 right-0 bottom-0 m-auto"
                    v-throttle="
                        () => {
                            showToast('截流执行成功')
                        }
                    "
                    >节流提交</button
                >
            </div>

            <mi-divider>图片懒加载指令 | slide-in 进入动画指令</mi-divider>
            <img
                class="w-full h-200px mt-10px object-cover"
                v-for="index in 10"
                :key="index"
                v-slide-in
                v-lazy="`${imgUrl}&key=${index}`"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
