<script setup lang="ts">
import Dialog from '@/components/CustomDialog/index'
import useSystem from '@/hooks/useSystem'
const { execute } = useSystem()
const route = useRoute()
const router = useRouter()

const transitionName = ref('')

const includeList = ref([] as any)

watch(route, (v) => {
	//监听路由变化，把配置路由中keepAlive为true的name添加到include动态数组中
	if (v.meta.keepAlive && includeList.value.indexOf(v.name) === -1) {
		includeList.value.push(v.name)
	}
})

router.beforeEach((to: any, from: any) => {
	if (!to.meta.transition.enable) {
		transitionName.value = ''
	} else {
		if (to.meta.transition.name) {
			transitionName.value = to.meta.transition.name
		} else if (to.meta.index > from.meta.index) {
			transitionName.value = 'slide-left'
		} else if (to.meta.index < from.meta.index) {
			transitionName.value = 'slide-right'
		}
	}
})

// 调用系统信息
const openSystem = () => {
	Dialog.show({
		title: '开发者模式',
		message: '请输入密码开启开发者模式，用户请关闭此弹窗'
	}).then(() => {
		router.push('/system')
	})
}
</script>

<template>
	<div class="layout-content" @click.stop="execute(openSystem)">
		<router-view v-slot="{ Component }">
			<transition :name="transitionName || ''">
				<keep-alive :include="includeList">
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<style lang="scss" scoped>
.layout-content {
	width: 100vw;
	height: 100vh;
}
</style>
