<script setup lang="ts">
import avatar from '@/assets/common/avatar.png'
import { sessionStorage } from '@/utils/storage'
import { asyncLoadScript, removeScript } from '@/utils/script'
// eslint-disable-next-line no-undef
const { pkg, lastBuildTime } = __APP_INFO__

const { dependencies, devDependencies, name, version } = pkg

const router = useRouter()

const toBack = () => router.back()

const isDebug = ref(sessionStorage.get('openEruda'))

const debugChange = (value) => {
	if (value) {
		asyncLoadScript(this, { src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'debug' }).then(
			() => {
				window.eruda.init()
			}
		)
	} else {
		removeScript('debug').then(() => {
			removeScript('eruda')
		})
	}
	sessionStorage.set('openEruda', value)
}
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

		<van-cell-group inset title="设置">
			<van-cell center title="调试模式">
				<template #right-icon>
					<van-switch v-model="isDebug" size="22px" @change="debugChange" />
				</template>
			</van-cell>
		</van-cell-group>
	</div>
</template>
