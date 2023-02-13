# H5 和原生交互

## 原生调用 js

```javascript
// 首先在main.ts挂载NativeCallJs类
import NativeCallJs from "@/services/nativeCallJs";
window.NativeCallJs = NativeCallJs;

import emitter from "@/utils/emit";

export default class NativeCallJs {
	static judgeSystem() {
		const u = navigator.userAgent;
		const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
		const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		return { isAndroid, isIOS };
	}

	/**
	 * @description: xxx
	 * @param {object} data “{num}”
	 * @return {*}
	 */
	static xxx(data: string) {
		const { isAndroid } = this.judgeSystem();
		if (isAndroid) {
			emitter.emit("xxx", JSON.parse(data));
		} else {
			emitter.emit("xxx", data);
		}
	}
}

// 使用 （在页面订阅）
import emitter from "@/utils/emit";

emitter.on("xxx", (data) => {
	console.log(data);
});
```

## js 调用原生

```javascript
export default class JsCallNative {
	static AppKey = "android";

	static judgeSystem() {
		const u = navigator.userAgent;
		const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
		const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		return { isAndroid, isIOS };
	}

	/**
	 * @description: xxxx
	 * @param {number} type 0:xx 1:微信 2:xx
	 * @param {string} url xxx
	 * @return {*}
	 */
	static xxx(type: number, url: string) {
		const { isAndroid } = this.judgeSystem();
		try {
			if (isAndroid) {
				window[this.AppKey].xxx(type, url);
			} else {
				window.webkit.messageHandlers.xxx.postMessage({ type, url });
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @description: xxxx 无参数
	 * @return {*}
	 */
	static vvv() {
		const { isAndroid } = this.judgeSystem();
		try {
			if (isAndroid) {
				window[this.AppKey].vvv();
			} else {
				window.webkit.messageHandlers.vvv.postMessage({});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

// 使用
import native from "@/services/JsCallNative";

native.xxx();
```
