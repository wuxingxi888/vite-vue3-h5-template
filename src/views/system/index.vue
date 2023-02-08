<script setup lang="ts">
import avatar from '@/assets/common/avatar.png'
// eslint-disable-next-line no-undef
const { pkg, lastBuildTime } = __APP_INFO__

const { dependencies, devDependencies, name, version } = pkg

const router = useRouter()

const toBack = () => router.back()
</script>
<template>
	<div class="sys_wrap">
		<van-nav-bar
			title="系统信息"
			left-arrow
			fixed
			placeholder
			safe-area-inset-top
			@click-left="toBack"
		/>

		<van-cell-group inset title="基本信息">
			<van-cell>
				<template #icon>
					<van-image width="25" height="25" round :src="avatar" />
				</template>
			</van-cell>
			<van-cell title="项目名称" :value="name" />
			<van-cell title="项目版本" :value="version" />
			<van-cell title="最后编译时间" :value="lastBuildTime" />
		</van-cell-group>

		<van-cell-group inset title="生产环境依赖">
			<van-cell
				v-for="([key, value], index) of Object.entries(dependencies)"
				:key="index"
				:title="key"
				:value="value"
			/>
		</van-cell-group>
		<van-cell-group inset title="开发环境依赖">
			<van-cell
				v-for="([key, value], index) of Object.entries(devDependencies)"
				:key="index"
				:title="key"
				:value="value"
			/>
		</van-cell-group>
	</div>
</template>
<style lang="scss" scoped>
.sys_wrap {
	width: 100%;
	height: 100vh;
}
</style>
