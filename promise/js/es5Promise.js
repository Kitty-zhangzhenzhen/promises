// https://zhuanlan.zhihu.com/p/144058361

function es5Promise(exector) {
    var _this = this;
    _this.state = "pending";//fulfilled,reject
    _this.value = null
    _this.reason = null
    _this.onFulfilled = []
    _this.onRejected = []
    function resolve(value) {
        if (_this.state == 'pending') {
            _this.state = 'fulfilled'
            _this.value = value
            _this.onFulfilled.forEach(fn => {
                fn(_this.value)
            })
        }
    }
    function reject(reason) {
        if (_this.state == 'pending') {
            _this.state = 'reject'
            _this.reason = reason
            _this.onRejected.forEach(fn => {
                fn(_this.reason)
            })
        }
    }
    try {
        exector(resolve, reject)
    } catch (err) {
        console.warn(err)
    }
}
es5Promise.prototype.then = function (onFulfilled1, onRejected1) {

    let promise2 = new es5Promise((resolve, reject) => {
        if (this.state == 'fulfilled') {
            setTimeout(() => {
                let x = onFulfilled1(this.value)
                resolvePromise(promise2, x, resolve, resolve)
            })

        }
        if (this.state == 'reject') {
            setTimeout(() => {
                let x = onRejected1(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            })
        }
        if (this.state == 'pending') {
            this.onFulfilled = push(
                setTimeout(() => {
                    let x = onFulfilled1(this.value)
                    resolvePromise(promise2, x, resolve, resolve)

                }))
            this.onRejected = push(setTimeout(() => {
                let x = onRejected1(this.reason)
                resolvePromise(promise2, x, resolve, reject)

            }))
        }
    })
    return promise2

}

function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        reject(new TypeError('Chaining cycle'))
    }
    if(x && typeof x === 'object' || typeof x === 'function'){
        let used;
        try {
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y)=>{
                    if (used) return;
                    used = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) =>{
                    if (used) return;
                    used = true
                    reject(r)
                })
            } else {
                if (used) return;
                used = true
                resolve(x)
            }
        } catch(e){
            if (used) return;
            used = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}