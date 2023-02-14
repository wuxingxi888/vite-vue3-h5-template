/*
 * @Author: 吴星喜 wuxingxi888@163.com
 * @Date: 2023-02-10 12:12:08
 * @LastEditors: 吴星喜 wuxingxi888@163.com
 * @LastEditTime: 2023-02-10 14:08:48
 * @FilePath: /vite-vue3-h5-template/src/utils/script.ts
 * @Description: 动态添加script标签
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

// 检测是否加载了 script脚本 文件
export const checkIsLoadScript = (context, src) => {
	const scriptObjs = document.getElementsByTagName('script')
	const reg = RegExp(src)
	for (const sObj of scriptObjs) {
		if (sObj.src.match(reg)) {
			return true
		}
	}
	return false
}

//异步加载script脚本
export const asyncLoadScript = (context, { src, id }) => {
	return new Promise<void>(async (resolve) => {
		const isLoad = await checkIsLoadScript(this, src)
		if (isLoad) {
			//若script标签存在，则先删除
			const dom = document.getElementById(id) as HTMLScriptElement
			if (dom && dom.src == src) {
				console.log('删除成功')
				dom.remove()
			} else {
				// 正对非prod环境 出现的debug
				removeScript('eruda')
			}
		}
		const scriptNode = document.createElement('script')
		scriptNode.setAttribute('type', 'text/javascript')
		scriptNode.setAttribute('charset', 'utf-8')
		scriptNode.setAttribute('id', id)
		scriptNode.setAttribute('src', src)
		document.body.appendChild(scriptNode)
		scriptNode.onload = () => {
			console.log('script loaded')
			resolve()
		}
	})
}

// 移除 script标签
export const removeScript = (id) => {
	return new Promise<void>(async (resolve) => {
		const dom = document.getElementById(id) as HTMLScriptElement
		dom.remove()
		resolve()
	})
}
