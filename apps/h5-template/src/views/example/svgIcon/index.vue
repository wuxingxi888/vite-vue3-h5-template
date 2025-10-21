<script setup lang="ts">
    const svgList = ['logo', 'email', 'excel', 'img', 'mobile', 'pc', 'pdf', 'sdk', 'wps']
</script>

<template>
    <div>
        <custom-nav-bar />
        <div class="pt-20px">
            <mi-divider>提示：svg图标存放在assets/svgs目录下</mi-divider>
            <mi-grid :gutter="10">
                <mi-grid-item
                    v-for="name in svgList"
                    :key="name"
                    :text="name"
                >
                    <template #icon>
                        <SvgIcon
                            class="!h-30px !w-30px"
                            :name="name"
                        />
                    </template>
                </mi-grid-item>
            </mi-grid>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
