# utils 工具

由于篇幅问题 这里只做简介，具体可以看代码

## directives.ts 指令

```javascript
export function directives(app: App) {
	// 图片懒加载
	lazyDirective(app);
	// 点击后自动失焦指令
	blurDirective(app);
	// 缩放指令
	zoomDirective(app);
	// 拖动指令
	dragDirective(app);
}
```

## mitt 发布订阅模式

```javascript
import mitt from "mitt";
const emitter = mitt();
export default emitter;

// 使用
import emitter from "@/utils/emit";

// 发布
emitter.emit("key", data);

//订阅
emitter.on("key", (data) => {
	console.log(data);
});
```

## CryptoJS 加密

密钥和偏移量根据需求自己设置

```javascript
import CryptoJS from "crypto-js";

const SECRET_KEY = CryptoJS.enc.Utf8.parse("xxx"); // 十六位十六进制数作为密钥
const SECRET_IV = CryptoJS.enc.Utf8.parse("xxx"); // 十六位十六进制数作为密钥偏移量

const encrypt = (data: object | string): string => {
	if (typeof data === "object") {
		try {
			data = JSON.stringify(data);
		} catch (e) {
			throw new Error("encrypt error" + e);
		}
	}
	const dataHex = CryptoJS.enc.Utf8.parse(data);
	const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.ciphertext.toString();
};

const decrypt = (data: string) => {
	const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
	const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	const decrypted = CryptoJS.AES.decrypt(str, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
};

export { encrypt, decrypt };

// 使用
import { encrypt, decrypt } from "@/utils/encrypt";

// 加密
encrypt(string);

//解密
decrypt(string);
```

## inputTop 解决部分手机键盘弹出输入框不在可视区域

代码就不贴了，具体下载源码看

```javascript
// 使用方法
import inputTop from "@/utils/rollingStop";

inputTop.init();
```

## landscape 强制横屏

由于部分场景需要页面横屏展示 如 游戏页面。
代码就不贴了，具体下载源码看

```javascript
// 使用方法
import landscape from "@/utils/rollingStop";

landscape.init();
```

## openinstall 统计埋点

```javascript
import { useAppStore } from "@/store/app";

const appStore = useAppStore();

// OpenInstall初始化时将与openinstall服务器交互，应尽可能早的调用
/* web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据 */

let openInstallComplete = false;

export default function initOpenInstall(appKey: string) {
	const data = OpenInstall.parseUrlParams(); /// openinstall.js中提供的工具函数，解析url中的所有查询参数

	const timeId = setTimeout(() => {
		console.log("OpenInstall OI timeout");
		if (openInstallComplete) return;
		// Toast.clear()
	}, 8000);

	new OpenInstall(
		{
			/*appKey必选参数，平台为每个应用分配的ID*/
			appKey: appKey,
			/*直接指定渠道编号，默认通过当前页url中的channelCode参数自动检测渠道编号*/
			//channelCode:"渠道编号",
			/*自定义遮罩的html*/
			//mask:function(){
			//  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
			//},
			onready: function () {
				openInstallComplete = true;
				clearTimeout(timeId);
				appStore.setOpenInstall(this);
				console.log("OpenInstall OI success");
			},
		},
		data
	);
}

// 使用方法
import initOpenInstall from "@/utils/openinstall";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
const { openInstallInstance } = storeToRefs(appStore);

const productId = ref("");

// 初始化
initOpenInstall("xxx");

// 交互
const downloadApp = () => {
	if (openInstallInstance.value) {
		console.log("open");
		openInstallInstance.value.wakeupOrInstall({
			data: {
				productId: "",
			},
			timeout: 1500,
		});
	}
};
```

## script 脚本异步加载

代码就不贴了，具体下载源码看

```javascript
// 使用方法
import { asyncLoadScript, removeScript } from "@/utils/script";

if (value) {
	asyncLoadScript(this, {
		src: "https://cdn.jsdelivr.net/npm/eruda",
		id: "debug",
	}).then(() => {
		// eslint-disable-next-line no-undef
		eruda.init();
	});
} else {
	removeScript("debug").then(() => {
		removeScript("eruda");
	});
}
```

## storage 本地存储

代码就不贴了，具体下载源码看

```javascript
/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
	//存储
	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	},
	//取出数据
	get<T>(key: string) {
		const value = localStorage.getItem(key)
		if (value && value != 'undefined' && value != 'null') {
			return <T>JSON.parse(value)
		}
	},
	// 删除数据
	remove(key: string) {
		localStorage.removeItem(key)
	}
}

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
	//存储
	set(key: string, value: any) {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	},
	//取出数据
	get<T>(key: string) {
		const value = window.sessionStorage.getItem(key)
		if (value && value != 'undefined' && value != 'null') {
			return JSON.parse(value)
		}
		return null
	},
	// 删除数据
	remove(key: string) {
		window.sessionStorage.removeItem(key)
	}
}
```

## 欢迎大家补充。。。
