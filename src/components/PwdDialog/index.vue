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

const pwdErrAnim = ref(false)

const pwdTips = ref(props.options.message)

watch(pwdValue, (v) => {
	if (v.length > 6) {
		pwdValue.value = v.slice(0, 6)
	}

	// 密码输入完成
	if (v.length == 6) {
		showKeyboard.value = false
	}
})

const onPwdError = (msg: string) => {
	pwdErrAnim.value = true
	pwdTips.value = msg
	setTimeout(() => {
		pwdErrAnim.value = false
	}, 500)
}

const onClearPwd = () => {
	pwdValue.value = ''
}

defineExpose({
	onClearPwd,
	onPwdError
})

const onConfirm = () => {
	if (pwdValue.value.length < 6) {
		return
	}
	props.options.inputComplete(pwdValue.value)
}

const disableScroll = () => {
	document.body.style.overflow = 'hidden'
}

const enableScroll = () => {
	document.body.style.overflow = ''
}

onMounted(() => {
	disableScroll()
})

onBeforeUnmount(() => {
	enableScroll()
})
</script>

<template>
	<div class="dialog_wrap">
		<div
			v-if="props.options?.overlay"
			class="overlay"
			@click="props.options.closeOnClickOverlay && close()"
		></div>
		<div class="dialog_container fadeIn">
			<div v-if="props.options.showClose" class="close_btn" @click="close()"></div>

			<span class="title">{{ props.options.title }}</span>

			<p v-if="props.options.message" class="message">{{ pwdTips }}</p>

			<!-- 密码输入框 -->
			<van-password-input
				class="pwd_input"
				:class="{ shake: pwdErrAnim }"
				:value="pwdValue"
				:gutter="8"
				:focused="showKeyboard"
				@focus="showKeyboard = true"
			/>

			<div
				class="confirm_btn"
				:class="{ disabled_btn: pwdValue.length < 6 }"
				@click="onConfirm"
			>
				确认
			</div>

			<p
				v-if="props.options.customText"
				class="custom_handle"
				@click="props.options.customHandle"
			>
				{{ props.options.customText }}
			</p>

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
	z-index: 2000;

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
		// height: 160px;
		background-color: #ffffff;
		border-radius: 10px;
		text-align: center;
		padding: 26px 20px 14px 20px;
		position: relative;

		.close_btn {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 20px;
			height: 20px;

			&::before {
				position: absolute;
				top: 50%;
				left: 50%;
				content: '';
				display: block;
				height: 15px;
				width: 2px;
				background-color: #3d3d3d;
				transform: translate(-50%, -50%) rotate(45deg);
			}

			&::after {
				position: absolute;
				top: 50%;
				left: 50%;
				content: '';
				display: block;
				height: 15px;
				width: 2px;
				background-color: #3d3d3d;
				transform: translate(-50%, -50%) rotate(-45deg);
			}
		}

		.title {
			font-size: 18px;
			font-family:
				PingFang SC-Medium,
				PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 21px;
		}

		.message {
			font-size: 16px;
			font-family:
				Source Han Sans CN-Medium,
				Source Han Sans CN;
			font-weight: 500;
			color: #e84855;
			margin-top: 8px;
		}

		.pwd_input {
			margin-top: 25px;

			:deep(.van-password-input__security) {
				height: 34px;

				.van-password-input__item {
					width: 34px !important;
					height: 34px;
					background: #f4f8ff;
					border-radius: 5px;
					border: 1px solid #e0ebff;
				}

				.van-password-input__item--focus {
					border: 1px solid #6ba0ff;
				}
			}
		}

		.confirm_btn {
			width: 211px;
			height: 42px;
			line-height: 42px;
			text-align: center;
			border-radius: 23px;
			box-shadow: 0px 2px 19px 0px rgba(208, 246, 255, 1);
			background-image: linear-gradient(
				128deg,
				rgba(60, 201, 255, 1) 0,
				rgba(108, 159, 255, 1) 100%
			);
			font-size: 16px;
			font-family:
				PingFang SC-Regular,
				PingFang SC;
			font-weight: 400;
			color: #ffffff;
			margin: 27px auto 0px;
		}

		.disabled_btn {
			background-image: linear-gradient(
				128deg,
				rgb(199, 207, 210) 0,
				rgb(169, 181, 203) 100%
			);
		}

		.custom_handle {
			font-size: 14px;
			font-family:
				PingFang SC-Regular,
				PingFang SC;
			font-weight: 400;
			color: #4cbcff;
			line-height: 16px;
			margin-top: 12px;
			text-align: center;
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

	//  密码输入错误 密码输入框抖动
	.shake {
		-webkit-animation: shake 0.5s;
		animation: shake 0.5s;
	}

	@keyframes shake {
		0% {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}

		25% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0);
		}

		50% {
			-webkit-transform: translate3d(10px, 0, 0);
			transform: translate3d(10px, 0, 0);
		}

		75% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0);
		}

		100% {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
}
</style>
