<script setup lang="ts">
import { fetchImageUrl } from '@/api/app'

const imageList = ref([] as any)

const timer = ref(null as any)

const getUrl = () => {
	fetchImageUrl({
		format: 'json'
	}).then((res: any) => {
		imageList.value.push(res?.imgurl)
	})
}

onMounted(() => {
	timer.value = setInterval(() => {
		if (imageList.value.length > 10) clearInterval(timer.value)
		getUrl()
	}, 10)
})
</script>

<template>
	<div class="wrap">
		<nut-cell
			v-for="(item, index) in 10"
			:key="index"
			:title="index.toString()"
			desc="描述文字"
		></nut-cell>

		<nut-image
			width="345"
			height="200"
			v-for="(item, index) in imageList"
			:key="index"
			v-lazy="item"
		></nut-image>
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	padding: 15px;
}
</style>
