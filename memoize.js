function memoize(func) {
    const cache = {};

    return function(...key) {
        if (!cache[key]) {
            cache[key] = func(key)
        }

        return cache[key]
    }
}