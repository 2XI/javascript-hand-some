function fakeNew(Fun, ...args) {
    let obj = new Object();

    obj.__proto__ = Fun.prototype

    let res = Fun.apply(obj, args)

    return typeof res instanceof Object ? res : obj
}