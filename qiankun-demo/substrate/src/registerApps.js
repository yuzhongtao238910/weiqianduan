import { registerMicroApps, start } from "qiankun"
const loader = (loading) => {
    console.log("加载状态", loading)
}

registerMicroApps([
    {
        name: "reactApp",
        entry: "//localhost:10000", // 默认react启动的入口是10000端口
        activeRule: '/react', // /react
        container: '#container', // 应用挂在的位置
        loader
    },
    {
        name: "vueApp",
        entry: "//localhost:20000", // 默认react启动的入口是10000端口
        activeRule: '/vue', // /react
        container: '#container', // 应用挂在的位置
        loader
    },
], {
    beforeLoad() {
        console.log("beforeLoad")
    },
    beforeMount() {
        console.log("beforeMount")
    },
    afterMount() {
        console.log("afterMount")
    },
    beforeUnmount() {
        console.log("beforeUnmount")
    },
    afterUnmount() {
        console.log("afterUnmount")
    }
})

start()




