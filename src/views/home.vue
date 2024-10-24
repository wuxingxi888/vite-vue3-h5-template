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
	}, 2000)
})
</script>

<template>
	<div class="wrap">
		<van-cell-group inset>
			<van-cell
				v-for="(item, index) in 100"
				:key="index"
				:title="index.toString()"
				value="描述文字"
			>
			</van-cell>
		</van-cell-group>

		<img
			v-for="(item, index) in imageList"
			:key="index"
			v-lazy="item"
			width="345"
			height="200"
		/>
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	height: 100%;
	padding: 15px 0;
}
</style>
