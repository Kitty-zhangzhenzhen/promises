# promises
## 一.异步出现原因
js是单线程的，一次只能做一件事，所有的任务都需要排队，如果任务执行事件过长会十分影响用户体验，所以js在同步机制的缺陷下设计出了异步模式
## 二.异步的缺陷=>回调地狱
为了拿到异步任务的结果，我们不得不大量使用回调函数，导致代码看起来很混乱，甚至出现回调地狱

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
## 三、回调地狱的解决方案=》promise
Promise对象代表一个异步操作，有三种状态  
pending（等待）、resolved（成功状态）、rejected（失败状态）

　　　　两种状态改变方式：pending => resolved，pending => rejected  
### 1、promise.then链式操作用法
```python
        let getToken = function () {
            return new Promise((resolve, reject) => {
                resolve('token')
            })
        }

        let getName = function (token) {
            return new Promise((resolve, reject) => {
                    resolve('小明')
            })
        }
        let getAge = function (name) {
            return new Promise((resolve, reject) => {
                if (name) {
                    resolve('60')
                }
            })
        }
        getToken().then(res => {
            console.log(res)
            return getName(res)

        }).then(res => {
            console.log(res)
            return getAge()
        }).then(res => {
            console.log(res)
        })
```
### 2、reject用法，当异步操作失败时reject可以把promise的状态设置为rejected
```python
        let getAge = function (name) {
            return new Promise((resolve, reject) => {
                if (name) {
                    resolve('60')
                }
                reject('name=>err')
            })
        }   
        getAge().then(res=>{
            console.log(res,'res')
        },err=>{
            console.log(err,'err')
        })
```
### 3、catch用于指定发生错误的回调函数
```python
        let getAge = function (name) {
            return new Promise((resolve, reject) => {
                if (name) {
                    resolve('60')
                }
                reject('name=>err')
            })
        }   
        getAge().then(res=>{
            console.log(res,'res')
        }).catch(err=>{
             console.error(err,'err')
        })
```
### 4、Promise.all(),将多个promise实例包装为一个新的promise实例，返回全部结果
```python
       Promise.all([getToken(),getName(),getAge()]).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.error(err,'err')
        })
```
### 5、Promise.race(),同样是将多个promise实例包装为一个新的promise实例,区别是传入的promise哪个结果获取的快，就返回哪个，不管是成功还是失败
```python
        Promise.race([getToken(), getName('token'), getAge('token')]).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err, 'err')
        })
```
## 四、Promise封装接口请求
```python
        const $http = (url, data, method) => {
            method = method.toUpperCase();
            const config = {
                method, url
            }
            if (['GET', 'DELETE'].includes(method)) { config.params = data }
            else { config.data = Qs.stringify(data) }
            return new Promise((resolve, reject) => {
                axios(config).then(response => {
                    let code = response.data.code
                    if (code == 200) {
                        resolve(response.data)
                    }else{
                        reject(response.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
```