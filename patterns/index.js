// 设计模式
/**
 * 单例模式
 */
 var single = (function(){
    let instance;

    function getInstance(){
　　　　// 如果该实例存在，则直接返回，否则就对其实例化
        if( instance=== undefined ){
            instance= new Construct();
        }
        return instance;
    }

    function Construct(){
       
    }

    return {
        getInstance : getInstance
    }
})();

/**
 * 工厂模式
 */
 let UserFactory = function(role) {
    if(this instanceof UserFactory) {
      var s = new this[role]();
      return s;
    } else {
      return new UserFactory(role);
    }
  }
  
  //工厂方法函数的原型中设置所有对象的构造函数
  UserFactory.prototype = {
    SuperAdmin: function() {
      this.name = "超级管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
    },
    Admin: function() {
      this.name = "管理员",
      this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
    },
    NormalUser: function() {
      this.name = '普通用户',
      this.viewPage = ['首页', '通讯录', '发现页']
    }
  }
  
  //调用
  let superAdmin = UserFactory('SuperAdmin');
  let admin = UserFactory('Admin') 
  let normalUser = UserFactory('NormalUser')

  /**
   * 策略模式
   */
  // 对于vip客户
function vipPrice() {
    this.discount = 0.5;
}
 
vipPrice.prototype.getPrice = function(price) {
　　return price * this.discount;
}
// 对于老客户
function oldPrice() {
    this.discount = 0.3;
}
 
oldPrice.prototype.getPrice = function(price) {
    return price * this.discount;
}
// 对于普通客户
function Price() {
    this.discount = 1;
}
 
Price.prototype.getPrice = function(price) {
    return price ;
}

// 上下文，对于客户端的使用
function Context() {
    this.name = '';
    this.strategy = null;
    this.price = 0;
}
 
Context.prototype.set = function(name, strategy, price) {
    this.name = name;
    this.strategy = strategy;
    this.price = price;
}
Context.prototype.getResult = function() {
    console.log(this.name + ' 的结账价为: ' + this.strategy.getPrice(this.price));
}

var context = new Context();
var vip = new vipPrice();
context.set ('vip客户', vip, 200);
context.getResult();   // vip客户 的结账价为: 100

var old = new oldPrice();
context.set ('老客户', old, 200);
context.getResult();  // 老客户 的结账价为: 60

var Price = new Price();
context.set ('普通客户', Price, 200);
context.getResult();  // 普通客户 的结账价为: 200

/**
 * 代理模式
 */

 function ajax(params) { // 实际发送请求方法
    console.log(`发送请求${params}`)
    return params + Math.random()
  }
  
  const storage = new Map();
  
  function cache(params) { // 缓存模式
    console.log(storage)
    if (storage.has(params)) {
      return storage.get(params)
    }
    const value = ajax(params)
    storage.set(params, value)
    return value
  }
  
  function proxyAjax(params) { // 代理ajax请求
    return cache(params)
  }
  
  console.log(proxyAjax(1)) // 发送参数为1的请求
  console.log(proxyAjax(1)) // 发送相同参数为1的请求，cache读取到缓存，所以不再调用ajax方法，直接返回结果
  console.log(proxyAjax(2)) // 发送参数为2的请求，此时未读取到缓存，直接调用ajax方法，从后

  /**
   * 观察者模式（发布订阅模式）
   */
