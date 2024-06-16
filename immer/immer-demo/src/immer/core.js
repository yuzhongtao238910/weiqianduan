/**
 * 不可变数据：就是 数据对象不能够变化 对象是不能够被修改的 baseState 是不能被修改的
 * 其实最终变化的时候 根都会变化，因为每次都需要得到新对象啊，如果只变化某一个child，根的引用还是没有变化啊
 * @param baseState 基本状态 老的状态
 * @param producer 处理器 draft => {}
 */
import {
    isObject,
    isArray,
    isFunction
} from "./is"
let INTERNAL = Symbol()
export function produce(baseState, producer) { // baseState 是永远不能变化的
    let proxy = toProxy(baseState)
    producer(proxy)
    const internal = proxy[INTERNAL]
    if (internal.mutated) {
        return internal.draftState
    }
    return internal.baseState
}
function toProxy(baseState, callParentCopy) {
    // 用的代理，不用的不代理
    let keyToProxy = {} // key 映射的代理对象 {lists: proxy1, ids: proxy2 }
    // internal 是可以变化的 这里存储的是内部的状态
    let internal = {
        baseState,
        draftState: createDraftState(baseState), // 创建一个草稿状态
        keyToProxy,
        mutated: false // 此对象是否发生了变更
    }
    return new Proxy(baseState, {
        get(target, key, receiver) {
            if (key === INTERNAL) { // 如果访问代理对象的 INTERNAL 属性，我们就返回这个 internal
                return internal
            }
            let value = target[key] // baseState.list = ['1']
            // 当你访问某个属性的时候，我们就要对这个属性进行代理
            if (isObject(value) || isArray(value)) {
                if (key in keyToProxy) { // 判断 keyToProxy 之中是否有 key属性
                    return keyToProxy[key]
                } else {
                    keyToProxy[key] = toProxy(value, () => {
                        internal.mutated = true // 任何一个儿子变化了，自己也会变化
                        const proxyChild = keyToProxy[key] // 取出这个key的代理对象 listd额代理对象
                        let { draftState } = proxyChildp[INTERNAL]
                    })
                }
                return keyToProxy[key] // 如果是引用类型，则要先得到对应的proxy代理对象，然后返回代理对象
            }
            // 值类型的话直接返回
            return internal.mutated ? internal.draftState[key] : internal.baseState[key]
        },
        set(target, key, value, receiver) {
            internal.mutated = true // 一旦不管给什么字段修改值，都要把当前的mutated置为true
            // 设置值的时候 不修改 base State, 而是修改 draftState 草稿状态
            const { draftState } = internal
            draftState[key] = value
            // 还需要改一直往上走 爹 爹的爹 自己需要变 然后自己的爹 爹爹都需要改变
            callParentCopy && callParentCopy()
        }
    })
}
function createDraftState(baseState) {
    if (isObject(baseState)) {
        return Object.assign({}, baseState)
    }
    if (isArray(baseState)) {
        return [...baseState]
    }
    // map set 等其他的情况先都不管了
    return baseState // 基本数据类型 string number boolean
}
