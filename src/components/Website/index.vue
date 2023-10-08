<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const iframeUrl = ref<string>('')
const title = ref<string>('')
const image = ref<string>('')
const tips = ref<string>('')

const handleBack = () => {
	router.back()
}

onMounted(() => {
	iframeUrl.value = route.query.iframeUrl as string
	title.value = route.query.title as string
	image.value = route.query.image as string
	tips.value = route.query.tips as string
})
</script>

<template>
	<div class="task_guide_wrap">
		<header>
			<div class="left" @click="handleBack"></div>
			<div class="title">{{ title }}</div>
			<div></div>
		</header>
		<div class="main">
			<iframe
				v-if="iframeUrl.length > 0"
				class="iframe_wrap"
				:src="iframeUrl"
				frameborder="0"
			></iframe>

			<div class="empty" v-else>
				<img :src="image" alt="" />
				<span>{{ tips }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.task_guide_wrap {
	width: 100vw;
	height: 100vh;

	header {
		width: 100%;
		height: 44px;
		line-height: 50px;
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;

		.left {
			width: 10px;
			height: 10px;
			border-top: 3px solid #3d3d3d;
			border-left: 3px solid #3d3d3d;
			transform: rotate(-45deg);
		}

		.title {
			font-size: 16px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #2f2f2f;
			line-height: 19px;
		}
	}

	.main {
		height: calc(100% - 44px);
		width: 100%;
		overflow: hidden;
		background: #f8f8fa;

		.iframe_wrap {
			height: 100%;
			width: 100%;
		}

		.empty {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			img {
				width: 184px;
				height: 184px;
				margin-top: 16px;
			}

			span {
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 19px;
				margin-top: 20px;
			}
		}
	}
}
</style>
