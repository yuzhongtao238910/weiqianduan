// 对用户的路径切换进行路由劫持 劫持之后重新调用reroute方法 进行计算应用的加载


import {reroute} from "./reroute.js";

function urlRoute() {
    // console.log("pop-state")
    reroute(arguments)
}
window.addEventListener("hashchange", urlRoute)
window.addEventListener("popstate", urlRoute) // 浏览器历史切换的时候会执行此方法


// 当时当路由切换的时候 我们触发single-spa 的 addEventListener 但是应用之中可能也有 addEventListener
const capturedEventListeners = {
    hashchange: [],
    popstate: []
}
const listeningTo = ['hashchange', 'popstate']
const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

window.addEventListener = function (eventName, callback) {
    if (listeningTo.includes(eventName) && !capturedEventListeners[eventName].some(listener => listener === callback)) {
        // 有要监听的事件 函数不能重复
        return capturedEventListeners[eventName].push(callback)
    }
    return originalAddEventListener.apply(this, arguments)
}

window.removeEventListener = function (eventName, callback) {
    if (listeningTo.includes(eventName)) {
        // 有要监听的事件 函数不能重复
        capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(fn => fn !== callback)
        return
    }
    return originalRemoveEventListener.apply(this, arguments)
}


export function callCaptureEventListener(evt) {
    console.log(evt, 42)
    if (evt) {
        const eventType = evt[0].type
        if (listeningTo.includes(eventType)) {
            capturedEventListeners[eventType].forEach(listener => {
                listener.apply(this, evt)
            })
        }
    }
}













