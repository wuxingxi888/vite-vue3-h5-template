<template>
    <div class="overflow-scroll h-100vh">
        <custom-nav-bar />
        <div class="pt-20px">
            <mi-cell-group
                inset
                title="基本信息"
            >
                <mi-cell>
                    <template #icon>
                        <mi-image
                            width="25"
                            height="25"
                            round
                            :src="avatar"
                        />
                    </template>
                </mi-cell>
                <mi-cell
                    title="项目名称"
                    :value="name"
                />
                <mi-cell
                    title="项目版本"
                    :value="version"
                />
                <mi-cell
                    title="最后编译时间"
                    :value="lastBuildTime"
                />
            </mi-cell-group>

            <mi-cell-group
                inset
                title="生产环境依赖"
            >
                <mi-cell
                    v-for="([key, value], index) of Object.entries(dependencies)"
                    :key="index"
                    :title="key"
                    :value="value"
                />
            </mi-cell-group>

            <mi-cell-group
                inset
                title="开发环境依赖"
            >
                <mi-cell
                    v-for="([key, value], index) of Object.entries(devDependencies)"
                    :key="index"
                    :title="key"
                    :value="value"
                />
            </mi-cell-group>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/store/modules/user'
    // eslint-disable-next-line no-undef
    const { pkg, lastBuildTime } = __APP_INFO__

    const { dependencies, devDependencies, name, version } = pkg

    const userStore = useUserStore()

    const { avatar } = userStore.userInfo

    onActivated(() => {
        console.log('%c [  ]-35', 'font-size:13px; background:pink; color:#bf2c9f;')
    })
</script>

<style lang="scss" scoped></style>
