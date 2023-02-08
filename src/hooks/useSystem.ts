export type Callback = () => void

export default function useSystem() {
	const count = ref(0) // 点击次数
	const countN = ref(15) // 需要点击的次数
	const second = ref(5) // 规定时间（秒）
	const startTime = ref(0) // 第一次点击的时间
	const endTime = ref(0) // 规定时间内最后一次点击的时间

	const execute = (fun: Callback) => {
		count.value++
		if (count.value === 1) {
			startTime.value = new Date().getTime() / 1000
		}

		if (count.value === countN.value) {
			endTime.value = new Date().getTime() / 1000

			if (endTime.value - startTime.value <= second.value) {
				// 条件符合的逻辑
				fun()
				count.value = 0
			} else {
				count.value = 0
			}
		}
	}

	return { execute, countN, second }
}
