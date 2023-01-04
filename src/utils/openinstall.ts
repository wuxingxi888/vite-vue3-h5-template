import { useAppStore } from '@/store/app'

const appStore = useAppStore()

// OpenInstall初始化时将与openinstall服务器交互，应尽可能早的调用
/* web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据 */

let openInstallComplete = false

export default function initOpenInstall(appKey: string) {
	const data = OpenInstall.parseUrlParams() /// openinstall.js中提供的工具函数，解析url中的所有查询参数

	const timeId = setTimeout(() => {
		console.log('OpenInstall OI timeout')
		if (openInstallComplete) return
		// Toast.clear()
	}, 8000)

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
				openInstallComplete = true
				clearTimeout(timeId)
				appStore.setOpenInstall(this)
				console.log('OpenInstall OI success')
			}
		},
		data
	)
}
