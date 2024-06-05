import { NOT_LOADED } from './app.helpers.js'
import { reroute } from '../navigation/reroute.js'

export const apps = []
export function registerApplication(appName, loadApp, activeWhen, customProps) {
	const registeration = {
		name: appName,
		loadApp, // async () => app1   async () => app2
		activeWhen,
		customProps,
		status: NOT_LOADED,
	}
	apps.push(registeration)

	// 我们需要给每个应用添加对应的状态变化
	// 未加载 -》 加载 -》 挂载 -》 卸载

	// 需要检查哪些应用被加载 哪些应用要被移除 还有那些应用要被挂载

	reroute() // 重写路由
}
