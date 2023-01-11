<script setup lang="ts">
import { Toast } from '@nutui/nutui'

const props = defineProps({
	options: {
		type: Object,
		default: () => {
			console.log(`hah`)
		}
	},
	close: {
		type: Function,
		default: (fun) => fun()
	},
	cancel: {
		type: Function,
		default: (fun) => fun()
	},
	confirm: {
		type: Function,
		default: (fun) => fun()
	}
})

const inputValue = ref('')

const visible = ref(true)

const errMsg = ref(props.options.eMsg)

const onChange = (val) => {
	if (!val) return
	if (val.length === props.options.pLength) {
		if (props.options.dePass === val) {
			props.confirm(val)
		} else {
			errMsg.value = '请输入正确的密码'
		}
	}
}

const onClose = () => props.close()

const onTips = () => Toast.text('用户怎么会知道密码呢？')
</script>

<template>
	<div class="dialog_wrap">
		<nut-shortpassword
			@touchmove.prevent
			v-model="inputValue"
			v-model:visible="visible"
			:title="options.title"
			:desc="options.message"
			:tips="options.tips"
			:close-on-click-overlay="options.closeOnClickOverlay"
			:teleportDisable="true"
			:length="options.pLength"
			:error-msg="errMsg"
			@change="onChange"
			@close="onClose"
			@tips="onTips"
		>
		</nut-shortpassword>
	</div>
</template>

<style lang="scss" scoped>
.dialog_wrap {
	.fadeIn {
		-webkit-animation: fadeInDown 0.3s;
		animation: fadeInDown 0.3s;
	}
	@keyframes fadeInDown {
		0% {
			-webkit-transform: translate3d(0, -20%, 0);
			-webkit-transform: translate3d(0, -20%, 0);
			transform: translate3d(0, -20%, 0);
			transform: translate3d(0, -20%, 0);
			opacity: 0;
		}
		100% {
			-webkit-transform: none;
			transform: none;
			opacity: 1;
		}
	}
	@-webkit-keyframes fadeInDown {
		0% {
			-webkit-transform: translate3d(0, -20%, 0);
			opacity: 0;
		}
		100% {
			-webkit-transform: none;
			opacity: 1;
		}
	}

	.fadelogIn {
		-webkit-animation: fadelogIn 0.4s;
		animation: fadelogIn 0.4s;
	}
	@keyframes fadelogIn {
		0% {
			-webkit-transform: translate3d(0, 100%, 0);
			-webkit-transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0);
		}
		100% {
			-webkit-transform: none;
			transform: none;
		}
	}
	@-webkit-keyframes fadelogIn {
		0% {
			-webkit-transform: translate3d(0, 100%, 0);
		}
		100% {
			-webkit-transform: none;
		}
	}

	.fadeleftIn {
		-webkit-animation: fadeleftIn 0.4s;
		animation: fadeleftIn 0.4s;
	}
	@keyframes fadeleftIn {
		0% {
			-webkit-transform: translate3d(100%, 0, 0);
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
		}
		100% {
			-webkit-transform: none;
			transform: none;
		}
	}
	@-webkit-keyframes fadeleftIn {
		0% {
			-webkit-transform: translate3d(100%, 0, 0);
		}
		100% {
			-webkit-transform: none;
		}
	}

	.popIn {
		-webkit-animation: fadeleftIn 0.4s;
		animation: fadeleftIn 0.4s;
		-webkit-animation-name: popIn;
		animation-name: popIn;
	}
	@-webkit-keyframes popIn {
		0% {
			-webkit-transform: scale3d(0, 0, 0);
			transform: scale3d(0.5, 0.5, 0.5);
			opacity: 0;
		}
		50% {
			-webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
			animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
		}
		100% {
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
			-webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
			animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
			opacity: 1;
		}
	}
	@keyframes popIn {
		0% {
			-webkit-transform: scale3d(0, 0, 0);
			transform: scale3d(0.5, 0.5, 0.5);
			opacity: 0;
		}
		50% {
			-webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
			animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
		}
		100% {
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1);
			-webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
			animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
			opacity: 1;
		}
	}
}
</style>
