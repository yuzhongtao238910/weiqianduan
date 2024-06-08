import { registerMicroApps, start, initGlobalState } from "qiankun"
const loader = (loading) => {
    console.log("加载状态", loading)
}
const actions  =  initGlobalState({
    name:"aaapple",
    age: 333
})
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev, "onGlobalStateChange");
});

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

start({
    sandbox: {
        // css-module 可以再打包的时候生成一个选择器的名字
        // scoped 方案
        // bem
        // css in js 不推荐
        // shadowDOM 严格的隔离
        // 实现了动态样式表
        // qiankun的方案：给所有的标签都增加了 属性 增加属性来进行隔离
        // 缺点：子应用之中的dom如果挂在了外层，会导致样式不生效
        //
        experimentalStyleIsolation: true,

        // shadom 的方案 完全隔离
        strictStyleIsolation: true
    }
})




