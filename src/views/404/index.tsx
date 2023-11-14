import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import style from './index.module.scss'

export default defineComponent({
	name: 'App',
	setup(props) {
		const router = useRouter()

		const second = ref(10)

		const timer = ref(null as any)

		onMounted(() => {
			clearInterval(timer.value)
			timer.value = setInterval(() => {
				second.value = second.value - 1

				if (second.value <= 0) {
					clearInterval(timer.value)
					router.back()
				}
			}, 1000)
		})

		const bird = (
			<div class={[style.bird, style.bird_anim]}>
				<div class={style.bird_container}>
					<div class={[style.wing, style.wing_left]}>
						<div class={style.wing_left_top}></div>
					</div>
					<div class={[style.wing, style.wing_right]}>
						<div class={style.wing_right_top}></div>
					</div>
				</div>
			</div>
		)

		return () => (
			<>
				<div class={[style.container, style.container_star]}>
					{Array.from({ length: 30 }, () => {
						return <div class={style.star_1}></div>
					})}
					{Array.from({ length: 30 }, () => {
						return <div class={style.star_2}></div>
					})}
				</div>
				<div class={[style.container, style.container_bird]}>
					{Array.from({ length: 6 }, () => {
						return bird
					})}
					{/* {moon} */}
					<div class={style.container_title}>
						<div class={style.title}>
							<div class={style.number}>4</div>
							<div class={style.moon}>
								<div class={style.face}>
									<div class={style.mouth}></div>
									<div class={style.eyes}>
										<div class={style.eye_left}></div>
										<div class={style.eye_right}></div>
									</div>
								</div>
							</div>
							<div class={style.number}>4</div>
						</div>
						<div
							class={style.subtitle}
						>{`Sorry，页面找不到了,${second.value}秒后返回.`}</div>
						<button onClick={() => router.back()}>Go back</button>
					</div>
				</div>
			</>
		)
	}
})
