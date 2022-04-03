const fakeTimeOut = (fn, wait, args) => {
 let start = +new Date();
 let now = 0

 const loop = () => {
    now = +new Date();

    if (now - start > wait) {
        fn.apply(this, args)
        window.cancelAnimationFrame(loop)
    }

    window.requestAnimationFrame(loop)
 }

 window.requestAnimationFrame(loop)
}