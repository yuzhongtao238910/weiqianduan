import "./public-path.js"
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import {createRouter, createWebHistory} from "vue-router"


let app
let router
let history
function render(props) {
    app = createApp(App)
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue' : '/')
    router = createRouter({
        history,
        routes
    })
    app.use(router)
    let container = props?.container
    console.log(window.__POWERED_BY_QIANKUN__, 28, container)
    app.mount(container ? container.querySelector("#app") : document.getElementById("app"))
}
if (!window.__POWERED_BY_QIANKUN__) {
    // 独立运行
    render({})
}

export async function bootstrap(props) {
    console.log("props", props, 'vuede q启动')
}
export async function mount(props) {
    // 基座的容器叫做container
    console.log(props, 21)
    render(props)
}
export async function unmount(props) {
    app.unmount()
    history.destroy()
    app = null
    router = null
}
