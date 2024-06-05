import {
	MOUNTED,
	UNMOUNTING,
	NOT_MOUNTED
} from "../application/app.helpers.js"
export function toUnmountPromise(app) {
	return Promise.resolve().then(() => {
		if (app.status !== MOUNTED) { // 如果没有挂载的话 就不需要被卸载
			return app
		}
		app.status = UNMOUNTING
		// app.unmount 用户可能写的是一个数组 数组里面的
		return app.unmount(app.customProps).then(() => {
			app.status = NOT_MOUNTED
		})
	})
}