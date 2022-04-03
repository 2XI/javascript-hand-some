function fakeCreate(obj) {
    function F() {}

    F.prototype = obj

    new F()
}