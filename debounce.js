const debounce = (fn, wait) => {
    let timer = null

    return function(args) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.call(this, args);
        }, wait)
    }
}