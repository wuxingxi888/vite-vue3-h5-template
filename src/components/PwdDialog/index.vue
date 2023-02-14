<script setup lang="ts">
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
	},
	inputComplete: {
		type: Function,
		default: (fun) => fun()
	}
})

const pwdValue = ref('')

const showKeyboard = ref(false)

watch(pwdValue, (v) => {
	if (v.length > 6) {
		pwdValue.value = v.slice(0, 6)
	}

	// 密码输入完成
	if (v.length == 6) {
		showKeyboard.value = false
		props.options.inputComplete(pwdValue.value)
	}
})

const clearPwd = () => {
	pwdValue.value = ''
}

defineExpose(['clearPwd'])
</script>

<template>
	<div class="dialog_wrap">
		<div
			class="overlay"
			v-if="props.options?.overlay"
			@click="props.options.closeOnClickOverlay && close()"
		></div>
		<div class="dialog_container fadeIn">
			<div class="close_btn" v-if="props.options.showClose" @click="close()"></div>

			<span class="title">{{ props.options.title }}</span>

			<p class="message" v-if="props.options.message">{{ props.options.message }}</p>

			<!-- 密码输入框 -->
			<van-password-input
				class="pwd_input"
				:value="pwdValue"
				:focused="showKeyboard"
				@focus="showKeyboard = true"
			/>

			<!-- 数字键盘 -->
			<van-number-keyboard
				v-model="pwdValue"
				:show="showKeyboard"
				@blur="showKeyboard = false"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dialog_wrap {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	.overlay {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba($color: #000000, $alpha: 0.7);
	}

	.dialog_container {
		width: 310px;
		height: 160px;
		background-color: #ffffff;
		border-radius: 10px;
		text-align: center;
		padding-top: 25px;
		position: relative;

		.close_btn {
			position: absolute;
			top: 15px;
			right: 15px;
			width: 30px;
			height: 30px;
			&::before {
				position: absolute;
				top: 5px;
				left: 14px;
				content: '';
				display: block;
				height: 20px;
				width: 2px;
				background-color: #999999;
				transform: rotate(45deg);
			}
			&::after {
				position: absolute;
				top: 5px;
				right: 14px;
				content: '';
				display: block;
				height: 20px;
				width: 2px;
				background-color: #999999;
				transform: rotate(-45deg);
			}
		}

		.title {
			font-size: 18px;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500;
			color: #333333;
		}
		.message {
			font-size: 16px;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500;
			color: #e84855;
			margin-top: 18px;
		}
		.pwd_input {
			margin-top: 18px;
		}
	}

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
