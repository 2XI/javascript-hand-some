const throttle = (fn, wait = 50) => {
    let timer = 0

    return function(args) {
        if(!timer) {
            timer = setTimeout(() => {
                fn.call(this, args)
                timer = 0
            }, wait)
        }
    }
}