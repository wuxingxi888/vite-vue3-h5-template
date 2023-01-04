<script setup lang="ts">
const route = useRoute()

const includeList = ref([] as any)

watch(route, (v) => {
	//监听路由变化，把配置路由中keepAlive为true的name添加到include动态数组中
	if (v.meta.keepAlive && includeList.value.indexOf(v.name) === -1) {
		includeList.value.push(v.name)
	}
})
</script>

<template>
	<div class="layout-content">
		<router-view v-slot="{ Component, route }">
			<!-- <transition :name="route.meta.transition || 'van-fade'"> -->
			<keep-alive :include="includeList">
				<div>
					<component :is="Component" />
				</div>
			</keep-alive>
			<!-- </transition> -->
		</router-view>
	</div>
</template>

<style lang="scss" scoped>
.layout-content {
	width: 100vw;
	height: 100vh;
}
</style>
