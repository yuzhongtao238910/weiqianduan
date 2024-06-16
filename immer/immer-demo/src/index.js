import {
    produce
} from "immer"

let baseState = {
    list: ['1'],
    ids: [],
    home: [
        {
            name: "北京"
        }
    ]
}
let nextState = produce(baseState, draft => {
    // draft
    draft.list.push("2")
})
let nextState2 = produce(nextState, draft => {
    // draft
    draft.list.push("3")
})
console.log(baseState, nextState, nextState2, baseState=== nextState)
console.log(baseState.ids === nextState.ids)
// let baseState = {
//     name: "apple",
//     ids: [1]
// }
// // 深拷贝的话就是全部不能够复用了
// // 改变的节点 和他的父亲 父亲 都不能复用了 儿子和非父亲这条链的都可以复用的 兄弟是不改的
// // 传入老状态和处理方法 会返回一个新的状态
// // 改的话就会返回新的对象 没改的话 就不变
// let nextState = produce(baseState, draft => {
//     // console.log(draft)
//     // draft.ids.push(2)
//     draft.name = "apple1"
// })
//
// // 不改的话 就是一模一样
// console.log(baseState, nextState, baseState === nextState)
