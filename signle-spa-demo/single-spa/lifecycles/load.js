import {
	NOT_LOADED,
	LOADING_SOURCE_CODE,
	NOT_BOOTSTRAPPED
} from "../application/app.helpers.js"


/*

*/

function flattenArrayToPromise(fns) { // 可能是函数 也可能是数组
	fns = Array.isArray(fns) ? fns : [fns]
	return function() {
		
	}
} 

export function toLoadPromise(app) {
	return Promise.resolve().then(() => {
		if (app.status !== NOT_LOADED) {
			// 此应用加载完毕了
			return app
		}
		app.status = LOADING_SOURCE_CODE // 正在加载应用
		return app.loadApp(app.customProps).then(v => {
			const {
				bootstrap,
				mount,
				unmount
			} = v
			app.status = NOT_BOOTSTRAPPED
			// 这3个可能是数组，是数组的话就是拍平他们
			app.bootstrap = flattenArrayToPromise(bootstrap)
			app.mount = flattenArrayToPromise(mount)
			app.unmount = flattenArrayToPromise(unmount)
			return app
		})
	})
}