const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'

function fakePromise(callback) {
    const _this = this

    _this.currentState = Pending
    _this.value = void 0

    _this.onResolvedCallbacks = []
    _this.onRejectedCallbacks = []

    _this.resolve = function (value) {
        if (value instanceof fakePromise) {
            value.then(_this.resolve, _this.reject)
        }

        setTimeout(() => {
            if (_this.currentState === Pending) {
                _this.currentState = Fulfilled
                _this.value = value
                _this.onRejectedCallbacks.forEach(cb => cb())
            }
        })
    }

    _this.reject = function (value) {
        setTimeout(() => { // 异步执行，保证顺序执行
            if (_this.currentState === PENDING) {
            	_this.currentState = REJECTED // 状态管理
            	_this.value = value
            	_this.onRejectedCallbacks.forEach(cb => cb())
        	}
        })
    } // reject 处理函数

    try {
        callback(_this.resolve, _this.reject)
    } catch(err) {
        _this.reject(err)
    }
}

fakePromise.prototype.then = function (onFulfilled, onRejected) {
    const _this = this
    let promise2

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    if(_this.currentState === Fulfilled) {
        return promise2 = new fakePromise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onFulfilled(_this.value)

                    if (x instanceof fakePromise) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                } catch(err) {
                    reject(err)
                }
            })
        })
    }

    if (_this.currentState === REJECTED) {
        return promise2 = new fakePromise(function(resolve, reject) {
            setTimeout(function() {
                try {
                	var x = onRejected(_this.value)
                	if (x instanceof Promise){
                    	x.then(resolve, reject)
                	}
            	} catch(err) {
                	reject(err)
            	}
            })
        })
    }

    if (_this.currentState === PENDING) {
        // 如果当前的Promise还处于PENDING状态，我们并不能确定调用onFulfilled还是onRejected
        // 只有等待Promise的状态确定后，再做处理
        // 所以我们需要把我们的两种情况的处理逻辑做成callback放入promise1（此处即self/this）的回调数组内
        // 处理逻辑和以上相似
        return promise2 = new fakePromise(function(resolve, reject) {
            _this.onResolvedCallbacks.push(function() {
                try {
                    var x = onFulfilled(_this.value)
                    if (x instanceof fakePromise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch(err) {
                    reject(err)
                }
            })
            _this.onRejectedCallbacks.push(function() {
                try {
                    var x = onRejected(_this.value)
                    if (x instanceof fakePromise) {
                        x.then(resolve, reject)
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

fakePromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}