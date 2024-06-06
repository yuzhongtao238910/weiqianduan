import {getAppChanges, shouldBeActive} from '../application/app.helpers.js'
import { toLoadPromise } from "../lifecycles/load.js"
import {
	started
} from "../start.js"
import {
	toUnmountPromise
} from "../lifecycles/unmount.js"
import {
	toBootstrapPromise
} from "../lifecycles/bootstrap.js"
import {
	toMountPromise
} from "../lifecycles/mount.js"
import "./navigation-event.js"
import {callCaptureEventListener} from "./navigation-event.js";

// 后续路径变化 也需要走这里 重新计算哪些应用需要被加载
let appChangeUnderWay = false
let peopleWaitingOnAppChange = []
export function reroute(event) {
	// 如果多次出发 reroute 我们可以创造一个队列
	// onChangeUnderWay()
	if (appChangeUnderWay) {
		return new Promise((resolve, reject) => {
			peopleWaitingOnAppChange.push({
				resolve, reject
			})
		})
	}

	// 本质就是拦截路由 交给single-spa做跳转



	const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
	// console.log(appsToLoad, appsToMount, appsToUnmount)

	if (started) {
		appChangeUnderWay = true
		// console.log("22")
		// 用户调用了started 方法 我们需要处理当前应用要挂载或者卸载
		return performAppChange()
	}
	// 加载完毕后需要去挂载的应用
	return loadApps()
	// 先拿到应用去加载 -》 目前没有调用start
	function loadApps() {
		return Promise.all(appsToLoad.map(app => toLoadPromise(app).then(callEventListener)))
	}

	function performAppChange() {
		// 将不需要的应用卸载
		// 加载需要的应用 -》 启动对应的应用
		// 加载需要的应用

		// 将不要的应用卸载掉，返回掉一个卸载的promise
		// 1） 稍后测试销毁逻辑
		const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise))

		// 2）需要加载应用 （可能这个应用在注册的时候已经被加载了）

		// 默认情况下 注册的时候 /a 但是当start的时候是 /b

		const loadMountPromises = Promise.all(appsToLoad.map((app) => toLoadPromise(app).then(app => {
			// 保证当应用加载完成之后，需要启动和挂载 但是需要保证挂在之前 先卸掉之前的老的应用
			return tryBootstrapAndMount(app, unmountAllPromises)
		})))

		// 如果应用 加载 加载 启动 挂载 如果应用已经加载过来 下次就是挂载
		const mountPromises = Promise.all(appsToMount.map(app => tryBootstrapAndMount(app, unmountAllPromises)))
		function tryBootstrapAndMount(app, unmountAllPromises) {
			// 需要看应用是否被激活
			if (shouldBeActive(app)) {
				// 保证卸载完毕再次挂载
				return toBootstrapPromise(app).then(app => unmountAllPromises.then(() => toMountPromise(app)))
			}

		}
		return Promise.all([loadMountPromises, mountPromises]).then(() => {
			// 卸载完毕后
			callEventListener()
			appChangeUnderWay = false
		})
	}



	function callEventListener() {
		callCaptureEventListener(event)
	}
}


















































