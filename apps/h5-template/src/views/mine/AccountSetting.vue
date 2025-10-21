<template>
    <div>
        <custom-nav-bar />
        <mi-field
            v-model="username"
            label="用户名"
            readonly
            label-class="font-bold"
            input-align="right"
            :center="true"
            :border="false"
        />
        <mi-field
            v-model="afterPhone"
            label="手机号"
            readonly
            is-link
            label-class="font-bold"
            input-align="right"
            :center="true"
            :border="false"
        />
        <mi-field
            label="修改登录密码"
            readonly
            label-class="font-bold"
            input-align="right"
            :center="true"
            :border="false"
            is-link
            to="/changePassword"
        />
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/store/modules/user'

    const userStore = useUserStore()
    const { username, phone } = userStore.getUserInfo

    function phoneDesensitize(phone: string) {
        const reg = /(\d{3})\d{4}(\d{4})/
        return phone.replace(reg, '$1****$2')
    }

    const afterPhone = computed(() => phoneDesensitize(phone))
</script>

<style scoped lang="scss">
    :deep(.mi-field__control) {
        color: var(--mi-text-color-2);
    }
</style>
bg-cover h-15 w-25
