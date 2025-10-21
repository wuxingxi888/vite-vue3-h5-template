<template>
    <div>
        <custom-nav-bar />
        <mi-divider>主题模式</mi-divider>
        <mi-cell-group inset>
            <mi-cell
                center
                title="暗黑模式"
            >
                <template #right-icon>
                    <mi-switch
                        v-model="toggleTheme"
                        size="22"
                    />
                </template>
            </mi-cell>
        </mi-cell-group>

        <mi-divider>系统主题色</mi-divider>
        <div
            flex="~"
            justify="center"
        >
            <div grid="~ cols-8 gap-2">
                <span
                    v-for="(item, index) in themeStore.themeColorList"
                    :key="index"
                    h="8"
                    w="8"
                    items-center
                    border="2 rounded-md"
                    flex="~"
                    justify="center"
                    :style="{ 'background-color': item }"
                    @click="togTheme(item)"
                >
                    <i
                        v-show="item === themeStore.themeColor"
                        class="i-ic:sharp-check"
                        text-2xl
                        text-white
                    />
                </span>
            </div>
        </div>

        <mi-divider>页面切换动画</mi-divider>
        <mi-cell-group inset>
            <mi-cell
                center
                title="开启动画"
            >
                <template #right-icon>
                    <mi-switch
                        v-model="themeStore.isPageAnimate"
                        size="22"
                    />
                </template>
            </mi-cell>
            <mi-cell
                center
                title="动画类型"
            >
                <mi-field
                    v-model="animateState.text"
                    readonly
                    class="!p-0"
                    :disabled="!themeStore.isPageAnimate"
                    is-link
                    label-class="font-bold"
                    input-align="right"
                    :center="true"
                    :border="false"
                    @click="openAnimatePick"
                />
            </mi-cell>
        </mi-cell-group>

        <mi-popup
            v-model:show="animateState.showPicker"
            position="bottom"
            round
        >
            <mi-picker
                v-model="animateState.value"
                :columns="animateOptions"
                @confirm="handleSaveAnimateType"
                @cancel="animateState.showPicker = false"
            />
        </mi-popup>
    </div>
</template>

<script setup lang="ts">
    import { useThemeStore } from '@/store/modules/theme'
    import { useTheme } from '@/hooks/useTheme'
    import { animates as animateOptions } from '@/utils/const/theme'

    const { toggleTheme } = useTheme()

    const themeStore = useThemeStore()

    function togTheme(color: string) {
        themeStore.themeColor = color
    }

    const findCurrentAnimateType = animateOptions.find(item => item.value === themeStore.pageAnimateType)

    const animateState = reactive({
        text: findCurrentAnimateType?.text,
        value: [themeStore.pageAnimateType],
        showPicker: false
    })

    function openAnimatePick() {
        if (themeStore.isPageAnimate) {
            animateState.showPicker = true
        }
    }

    function handleSaveAnimateType({ selectedOptions }) {
        animateState.text = selectedOptions[0].text
        themeStore.setPageAnimateType(selectedOptions[0].value)
        animateState.showPicker = false
    }
</script>

<style scoped lang="scss"></style>
