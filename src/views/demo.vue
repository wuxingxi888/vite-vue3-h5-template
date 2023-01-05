<script setup lang="ts">
import avatar from '@/assets/common/avatar.png'
// eslint-disable-next-line no-undef
const { pkg, lastBuildTime } = __APP_INFO__

const { dependencies, devDependencies, name, version } = pkg

const router = useRouter()

const toBack = () => router.back()
</script>
<template>
	<nut-navbar
		@on-click-back="toBack"
		title="系统信息"
		fixed
		border
		left-show
		placeholder
		safe-area-inset-top
	></nut-navbar>
	<nut-cell-group title="基本信息">
		<nut-cell>
			<template v-slot:icon>
				<nut-avatar size="normal" :icon="avatar"></nut-avatar>
			</template>
		</nut-cell>
		<nut-cell title="项目名称" :desc="name" />
		<nut-cell title="项目版本" :desc="version" />
		<nut-cell title="最后编译时间" :desc="lastBuildTime" />
	</nut-cell-group>
	<nut-cell-group title="生产环境依赖">
		<nut-cell
			v-for="([key, value], index) of Object.entries(dependencies)"
			:key="index"
			:title="key"
			:desc="value"
		/>
	</nut-cell-group>
	<nut-cell-group title="开发环境依赖">
		<nut-cell
			v-for="([key, value], index) of Object.entries(devDependencies)"
			:key="index"
			:title="key"
			:desc="value"
		/>
	</nut-cell-group>

	<nut-backtop></nut-backtop>

	<nut-watermark :z-index="1" :content="name"></nut-watermark>
</template>
<style lang="scss" scoped></style>
