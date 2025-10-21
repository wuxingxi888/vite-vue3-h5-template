<script setup lang="ts">
    import { useOpenInstall } from '@/hooks/useOpeninstall'

    const { openInstall } = useOpenInstall('3rqhu6')

    const onInstall = () => {
        openInstall.value?.install()
    }

    const onWakeup = () => {
        openInstall.value?.schemeWakeup()
    }

    const onWakeupOrInstall = () => {
        openInstall.value?.wakeupOrInstall()
    }
</script>

<template>
    <div>
        <custom-nav-bar />
        <div class="pt-20px">
            <mi-cell-group inset>
                <mi-cell
                    title="安装App"
                    label="调用此方法可安装APP"
                    is-link
                    @click="onInstall"
                />
                <mi-cell
                    title="唤起App"
                    label="调用此方法可在已安装情况下唤起APP"
                    is-link
                    @click="onWakeup"
                />

                <mi-cell
                    title="唤起或安装"
                    label="调用此方法可唤起或安装APP"
                    is-link
                    @click="onWakeupOrInstall"
                />
            </mi-cell-group>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
