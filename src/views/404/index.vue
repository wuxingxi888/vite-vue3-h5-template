<script setup lang="ts">
const router = useRouter()

const second = ref(5)

const timer = ref(null as any)

onMounted(() => {
	timer.value = setInterval(() => {
		second.value--
		if (second.value <= 0) {
			clearInterval(timer.value)
			router.back()
		}
	}, 1000)
})
</script>

<template>
	<div class="wrap">
		<van-empty image="error" :description="`页面找不到了,${second}秒后返回`" />
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	padding-top: 100px;
}
</style>
