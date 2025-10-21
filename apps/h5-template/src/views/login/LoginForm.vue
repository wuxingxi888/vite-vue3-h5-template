<template>
    <mi-form
        v-if="getShow"
        ref="formRef"
        class="flex flex-col items-center"
        @submit="handleSubmit"
    >
        <mi-field
            v-model="formData.username"
            class="enter-y mb-4 items-center !rounded-md"
            name="username"
            placeholder="用户名"
            :rules="getFormRules.username"
        >
            <template #left-icon>
                <i class="i-ph:user-bold mr-2 text-lg" />
            </template>
        </mi-field>
        <mi-field
            v-model="formData.password"
            class="enter-y mb-4 items-center !rounded-md"
            :type="switchPassType ? 'password' : 'text'"
            name="password"
            placeholder="密码"
            :rules="getFormRules.password"
            @click-right-icon="switchPassType = !switchPassType"
        >
            <template #left-icon>
                <i class="i-iconamoon:lock-bold mr-2 text-lg" />
            </template>
            <template #right-icon>
                <i
                    v-if="switchPassType"
                    class="i-mdi:eye-outline mr-2 text-lg"
                />
                <i
                    v-else
                    class="i-mdi:eye-off mr-2 text-lg"
                />
            </template>
        </mi-field>

        <div class="enter-y mb-10 w-full flex justify-between px-5px">
            <div class="flex items-center">
                <mi-switch
                    v-model="rememberMe"
                    size="18px"
                    class="mr-8px"
                />
                <span>记住我</span>
            </div>
            <a @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码?</a>
        </div>

        <mi-button
            class="enter-y !mb-4 !rounded-md"
            type="primary"
            block
            native-type="submit"
            :loading="loading"
        >
            登 录
        </mi-button>
        <mi-button
            class="enter-y !rounded-md"
            plain
            type="primary"
            block
            @click="setLoginState(LoginStateEnum.REGISTER)"
        >
            注 册
        </mi-button>
    </mi-form>
</template>

<script setup lang="ts">
    import type { FormInstance } from '@miracle-web/ui'
    import { LoginStateEnum, useFormRules, useLoginState } from './useLogin'
    import { useUserStore } from '@/store/modules/user'
    import { PageEnum } from '@/enums/pageEnum'

    const { setLoginState, getLoginState } = useLoginState()
    const { getFormRules } = useFormRules()
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()

    const formRef = ref<FormInstance>()
    const loading = ref(false)
    const rememberMe = ref(false)
    const switchPassType = ref(true)
    const formData = reactive({
        username: 'admin',
        password: '123456'
    })

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

    function handleSubmit() {
        formRef.value
            ?.validate()
            .then(async () => {
                try {
                    loading.value = true
                    await userStore.Login({
                        username: formData.username,
                        password: formData.password
                    })
                    const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
                    if (route.name === PageEnum.BASE_LOGIN_NAME) {
                        router.replace('/')
                    } else {
                        router.replace(toPath)
                    }
                } finally {
                    loading.value = false
                }
            })
            .catch(() => {
                console.error('验证失败')
            })
    }

    onMounted(() => {})
</script>

<style scoped lang="scss"></style>
