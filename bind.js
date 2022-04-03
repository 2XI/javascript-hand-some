Function.prototype._bind = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Function.prototype._bind - what is trying to be bound is not callable')
    }

    const self = this
    const args = Array.prototype.slice.call(arguments, 1)

    return function() {
        const bindArgs = Array.prototype.slice.call(arguments)

        self.apply(context, args.concat(bindArgs))
    }
}