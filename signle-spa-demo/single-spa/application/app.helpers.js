import { apps } from './app.js'
export const NOT_LOADED = 'NOT_LOADED' // 默认状态 没有被加载
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE' // 路径匹配了 -》 正在加载源码
export const LOAD_ERROR = 'LOAD_ERROR'

// 启动过程
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED' // 资源加载完毕了，需要启动，此时还没有进行启动
export const BOOTSTRAPPING = 'BOOTSTRAPPING' // 启动之中！！！
export const NOT_MOUNTED = 'NOT_MOUNTED' // 启动完成，但是还没有挂载到DOM上

// 挂在流程
export const MOUNTING = 'MOUNTING' // 正在挂载
export const MOUNTED = 'MOUNTED' // 挂载完成
export const UNMOUNTING = 'UNMOUNTING' // 卸载之中

/*
激活 / 挂载：已经运行了
加载 / 启动 bootstrap：正在下载应用 LOADING_SOURCE_CODE
*/
// 看一下这个应用是否正在被激活
export function isActive(app) {
	return app.status === MOUNTED // 此应用正在被激活
}

// 看一下此应用是否被激活
export function shouldBeActive(app) {
	// 根据路径判断是否要被激活
	return app.activeWhen(window.location)
}

export function getAppChanges() {
	const appsToLoad = []
	const appsToMount = []
	const appsToUnmount = []
	// console.log(apps, 35)

	apps.forEach((app) => {
		let appShouldBeActive = shouldBeActive(app)
		switch (app.status) {

			// 没有被 加载
			case NOT_LOADED: // 标记当前应用下面 哪些应用需要被加载
			case LOADING_SOURCE_CODE:
				if (appShouldBeActive) {
					appsToLoad.push(app)
				}
				break
			// 没有被挂载
			case NOT_BOOTSTRAPPED: // 当前路径下 哪些需要被挂载
			case BOOTSTRAPPING:
			case NOT_MOUNTED:
				if (appShouldBeActive) {
					appsToMount.push(app)
				}
				break
			case MOUNTED: //当前路径下，哪些应用需要被卸载
				if (!appShouldBeActive) {
					// console.log(5777)
					appsToUnmount.push(app)
				}
				break
			default:
				break
		}
	})

	return {
		appsToLoad,
		appsToMount,
		appsToUnmount,
	}
}
