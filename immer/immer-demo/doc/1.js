// 共享可变状态
// 如何解决引用类型的数据互相影响
/*
* 1- 深拷贝
* 2- immutable-js
* 3- immer
* */
let obja = {
    name: "zhufeng"
}
let objb = obja

objb.name = "www"
console.log(obja, objb)












