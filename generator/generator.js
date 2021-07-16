function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
let fn = foo(1);
console.log(fn.next())
console.log(fn.next())
console.log(fn.next())

function get1(){
    // setTimeout(()=>{
        return 9
    // },200)
}
function get2(){
    setTimeout(()=>{
        return 8
    },200)
}
function get3(){
    setTimeout(()=>{
        return 7
    },200)
}
function* initPage(){
    yield get1();
    yield get2();
    return get3();
}
let fn2=initPage()
console.log(fn2.next());
console.log(fn2.next());
console.log(fn2.next());