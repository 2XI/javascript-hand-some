function flat(arr, n) {
    if (n <= 0) {
        return arr
    }

    let result = []
    for(const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flat(item, n--))
        } else {
            result.push(item)
        }
    }

    return result
}