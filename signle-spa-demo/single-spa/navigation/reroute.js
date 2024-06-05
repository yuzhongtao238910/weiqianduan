import { getAppChanges } from '../application/app.helpers.js'
import { toLoadPromise } from "../lifecycles/load.js"
import {
	started
} from "../start.js"
import {
	toUnmountPromise
} from "../lifecycles/unmount.js"

// 后续路径变化 也需要走这里 重新计算哪些应用需要被加载
export function reroute() {
	const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()

	if (started) {
		// 用户调用了started 方法 我们需要处理当前应用要挂载或者卸载
		return performAppChange()
	} 
	// 加载完毕后需要去挂载的应用
	return loadApps()
	// 先拿到应用去加载 -》 目前没有调用start
	function loadApps() {
		return Promise.all(appsToLoad.map(app => toLoadPromise(app)))
	}

	function performAppChange() {
		// 将不需要的应用卸载
		// 加载需要的应用 -》 启动对应的应用

		// 将不要的应用卸载掉，返回掉一个卸载的promise
		const unmountPromises = Promise.all(appsToUnmount.map(toUnmountPromise))
	}
}
