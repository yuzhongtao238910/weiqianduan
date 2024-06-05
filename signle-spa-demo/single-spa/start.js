import {
	reroute
} from "./navigation/reroute.js"
export let started = false // 默认没有调用started
export function start() {
	started = true
	reroute()
}
