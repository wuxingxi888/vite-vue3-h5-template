<script setup lang="ts">
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
</script>

<template>
	<div class="layout-content">
		<router-view v-slot="{ Component }">
			<div>
				<transition :name="transitionName || ''">
					<keep-alive :include="includeList">
						<component :is="Component" />
					</keep-alive>
				</transition>
			</div>
		</router-view>
	</div>
</template>

<style lang="scss" scoped>
.layout-content {
	width: 100vw;
	height: 100vh;
}
</style>
