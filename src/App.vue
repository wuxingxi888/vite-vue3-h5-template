<script setup lang="ts">
import pwdModal from '@/components/PwdDialog/index'
import 'vant/es/dialog/style'
import useSystem from '@/hooks/useSystem'

const { execute } = useSystem()

const router = useRouter()

const transitionName = ref('')

const includeList = ref([] as any)

function setTransitionName(to: any, from: any) {
	if (!to.meta.transition.enable) {
		transitionName.value = '';
	} else if (to.meta.transition.name) {
		transitionName.value = to.meta.transition.name;
	} else {
		transitionName.value = to.meta.index > from.meta.index ? 'go' : 'back';
	}
}

router.beforeEach((to: any, from: any) => {
	//监听路由变化，把配置路由中keepAlive为true的name添加到include动态数组中
	if (to.meta.keepAlive && includeList.value.indexOf(to.path) === -1) {
		includeList.value.push(to.path)
	}

	setTransitionName(to, from)
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
			} else {
				pwdModal.pwdError("密码错误")
				pwdModal.clearPwd()
			}
		}
	})
}
</script>

<template>
	<div class="layout-content fix-iphone" @click.stop="execute(openSystem)">
		<router-view v-slot="{ Component }">
			<transition :name="transitionName">
				<keep-alive :include="includeList">
					<component :is="Component" />
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

.go-enter-from {
	transform: translate3d(100%, 0, 0);
}

//最终状态
.back-enter-to,
.back-enter-from,
.go-enter-to,
.go-leave-from {
	transform: translate3d(0, 0, 0);
}

.go-leave-to {
	transform: translate3d(-100%, 0, 0);
}

.go-enter-active,
.go-leave-active,
.back-enter-active,
.back-leave-active {
	transition: all 0.3s;
}

.back-enter-from {
	transform: translate3d(-100%, 0, 0);
}

.back-leave-to {
	transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
