const PENDING='PENGING'
const FULFILLED='FULFILLED'
const REJECTED='REJECTED'
class MyPromise{
    constructor(handle){
        if(typeof(handle)!=='function'){
            throw new Error('handle must be a function!!!')
        }
        this._status=PENDING
        this._value=undefined
        this._fulfilledQueues=[]
        this._rejectedQueues=[]
        try{
            handle(this._resolve.bind(this),this._rejectedQueues.bind(this))
        }catch(err){
            this._rejected(err)
        }
    }
    _resolve(val){
        const run=()=>{
            if(this._status!==PENDING)return
            this._status=FULFILLED
            const runFulfilled=(value)=>{
                let cb;
                while(cb=this._fulfilledQueues.shift()){
                    cb(value)
                }
            }
            const runRejected=(error)=>{
                let cb;
                while(cb=this._rejectedQueues.shift()){
                    cb(error)
                }
            }
        }
    }
}