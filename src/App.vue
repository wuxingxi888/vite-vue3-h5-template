<script setup lang="ts">
import pwdModal from '@/components/PwdDialog/index'
import { showConfirmDialog } from 'vant'
import 'vant/es/dialog/style'
import useSystem from '@/hooks/useSystem'
import { envConfig } from './config'
import { asyncLoadScript } from './utils/script'
import { Updater } from './utils/updater'
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
			transitionName.value = 'van-slide-left'
		} else if (to.meta.index < from.meta.index) {
			transitionName.value = 'van-slide-right'
		}
	}
})

const checkUpdate = () => {
	if (envConfig.env != 'development') {
		const updater = new Updater({ timer: 30 * 1000 })

		updater.on('no-update', () => {
			console.log('未更新')
		})

		//更新通知
		updater.on('update', () => {
			showConfirmDialog({
				title: '系统升级通知',
				message: '检测到当前系统版本已更新，请刷新页面后使用新版本',
				theme: 'round-button',
				confirmButtonText: '立即刷新',
				cancelButtonText: '稍后'
			})
				.then(() => {
					window.location.reload()
				})
				.catch(() => {
					updater.stopTiming()
				})
		})
	}
}

onMounted(() => {
	if (envConfig.env != 'production') {
		asyncLoadScript(this, { src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'debug' }).then(
			() => {
				window.eruda.init()
			}
		)
	}

	checkUpdate()
})

// 调用系统信息
const openSystem = () => {
	pwdModal.alert({
		title: '开发者模式',
		message: '请输入开发者密码',
		inputComplete: async (pwd: string) => {
			if (pwd === '960413') {
				pwdModal.close()
				router.push('/system')
			}
		}
	})
}
</script>

<template>
	<div class="layout-content fix-iphone" @click.stop="execute(openSystem)">
		<router-view v-slot="{ Component }">
			<transition :name="transitionName || ''">
				<keep-alive :include="includeList">
					<div>
						<component :is="Component" />
					</div>
				</keep-alive>
			</transition>
		</router-view>
		<van-back-top bottom="15vh" />
	</div>
</template>

<style lang="scss" scoped>
.layout-content {
	width: 100vw;
}
</style>
