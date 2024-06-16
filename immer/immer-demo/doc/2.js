let person = {
    name: "zhufeng"
}
let proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        console.log("proxy-person-get", key)
        return target[key]
    },
    set(target, key, value, receiver) {
        console.log("proxy-person-set", key, value)
        target[key] = value
    }
})

console.log(proxyPerson.name)
proxyPerson.name = "apple"
