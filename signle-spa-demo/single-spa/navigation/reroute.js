import { getAppChanges } from '../application/app.helpers.js'
// 后续路径变化 也需要走这里 重新计算哪些应用需要被加载
export function reroute() {
	const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
	console.log(appsToLoad)
	console.log(appsToMount)
	console.log(appsToUnmount)
}
