# generator async await 
一般函数只能用return返回一次结果，generator就是可以返回多次结果的函数，让我们来看看下方代码
 ```python
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
let fn = foo(1);
console.log(fn.next())//{ value: 2, done: false }
console.log(fn.next())//{ value: 3, done: false }
console.log(fn.next())//{ value: 3, done: false }

```
当我们执行let fn = foo(1);这行代码时方法内代码并没有执行，只是返回了一个内部指针，这个可能不好理解，那遍历器可能就好理解多了。  
方法如果需要执行必须调用.next()
generator与一般函数不同的是声明方式，function *，可以yield多次，那我们有哪些使用场景呢？  
就拿我们常用的接口请求来说吧，一次需要执行多个接口的时候，可写成如下方式  
```python
function* initPage(){
    yield $.ajax({url:'xxxx'});
    yield $.ajax({url:'xxxx'});
    return $.ajax({url:'xxxx'});
}
let fn2 = initPage();
fn2.next();
fn2.next();
fn2.next();
```
看着好像没什么感觉，那我们看看下面没有generator的时代数据请求是怎么写的
 ```python
函数1(function(){
    //代码执行...(ajax1)
    
    函数2(function(){
        //代码执行...(ajax2)
        
        函数3(function(data3){
              //代码执行...(ajax3)
        });
        ...
    });
});
```
所以本人对generator的理解就是用写同步代码的方法，写异步