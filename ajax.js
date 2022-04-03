function ajax(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest()

        xhr.open('get', url)
        // xhr.setRequestHeader()

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return
            }

            if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
                resolve(xhr.responseText)
            } else {
                reject('request error')
            }
        }
    })
}