let promise1 = new Promise(function (resolve,reject) {
  window.setTimeout(function () {
    console.log('TEST');
    resolve('success');
    console.log(promise1);

  },100);

});

console.log(promise1);


function asyncGetData(url) {

  let promise = new Promise(function (resolve,reject) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET',url);

    xhr.responseType = 'json';

    xhr.onload = function () {
      console.log(xhr);
      resolve(xhr.response);
      console.log(promise);
    };

    xhr.onerror = function () {
      console.log(xhr);
      reject(xhr.response);
      console.log(promise);
    };

    xhr.send();

  });

  return promise;
}

function asyncGetImg(url) {
  let promise = new Promise(function (resolve,reject) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET',url);

    xhr.responseType = 'blob';

    xhr.onload = function () {
      console.log(xhr);
      resolve(xhr.response);
      console.log('图片加载已完成');
    };

    xhr.onerror = function () {
      console.log(xhr);
      reject(xhr.response);
    };

    xhr.send();

  });

  return promise;
}

let el201907031 = document.querySelector('#el201907031');
let async_img_load_loading = document.querySelector('.async_img_load_loading');

asyncGetImg('https://zenliver.github.io/gdszip-vue/dist/static/img/footer_weixin_qrcode.a0faa3f.jpg').then(function (response) {

  console.log('第1个.then开始执行');
  // test(); // catch测试
  return new Promise(function (resolve,reject) {

    window.setTimeout(function () {
      console.log('asyncGetImg的执行结果：');
      console.log(response);
      async_img_load_loading.style.display = 'none';
      let imgBlob = response;
      let imgUrl = window.URL.createObjectURL(imgBlob);
      el201907031.src = imgUrl;
      el201907031.style.display = 'inline-block';

      resolve(imgUrl);
      console.log('第1个.then执行完成');

    },8000);

  });

}).then(function (result) {

  console.log('第2个.then开始执行');
  // test(); // catch测试
  return new Promise(function (resolve1,reject1) {
    window.setTimeout(function () {
      console.log('第1个.then的回调执行结果：');
      console.log(result);
      resolve1('这是第2个.then的回调执行结果');
      console.log('第2个.then执行完成');
    },8000);
  });

}).then(function (result2) {

  console.log('第3个.then开始执行');
  // test(); // catch测试

  return new Promise(function (resolve2,reject2) {
    window.setTimeout(function () {
      console.log('第2个.then的回调执行结果：');
      console.log(result2);
      resolve2('这是第3个.then的执行结果');
      console.log('第3个.then执行完成');
    },8000);

  });

}).then(function (result3) {

  console.log('第4个.then开始执行');
  // test(); // catch测试
  console.log('第3个.then的执行结果：');
  console.log(result3);

  asyncGetData('https://www.gdszip.com/data/json-cors.php?file=redux_options.json').then(function (response2) {
    console.log(response2);
    test(); // catch测试
    console.log('第4个.then执行完成');
  }).catch(function (error2) {
    console.log(error2);
  });

}).catch(function (error) {

  console.log('出现错误，已进入catch流程');
  console.log(error);

});


// 测试对象传参
function objParamFunc(obj) {
  let firstName = obj.firstName;
  let lastName = obj.lastName;
  alert(`您好，${firstName}${lastName}，欢迎回来！`);
}

let el201907041 = document.querySelector('#el201907041');
el201907041.addEventListener('click',function () {
  objParamFunc({
    firstName: '曾',
    lastName: '俊'
  });
});


// 测试面向对象的js
let myObj = {
  params: {
    a: 8,
    b: 5,
  },
  add: function (x,y) {
    return x+y;
  },
  alert: function (val) {
    alert(val);
  },
  alert2: function () {
    alert(this.add(this.params.a,this.params.b));
  },
  alert3: function () {
    let minus =  () => {
      console.log(this);
      console.log(this.params.a);
      return this.params.a - this.params.b;
    };

    alert(minus());
  },
};

// myObj.alert(myObj.add(3,4));
myObj.params = {
  a: 100,
  b: 70
};
// myObj.alert3();


// 测试ES5的面向对象（函数式）

// 定义一个命名空间（其实就是一个空对象）
var MYAPP = MYAPP || {};

// 使用函数定义类
var Person = function (param) {
  this.firstName = param.firstName;
  this.lastName = param.lastName;
  this.sayHello = function () {
    alert("Hello! I'm "+this.firstName+this.lastName);
  };

  console.log('类Person实例化完成');
};

Person.prototype.sayHello2 = function () {
  alert('Nice to meet you, I am '+this.firstName+this.lastName);
};

console.log(Person);

let person1 = new Person({
  firstName: '曾',
  lastName: '俊',
});

console.log(person1);

console.log(`person1: ${person1.firstName}${person1.lastName}`);
// person1.sayHello2();

let sayHelloFunc = person1.sayHello;
console.log(sayHelloFunc);
// sayHelloFunc();
// sayHelloFunc.call(person1);

// 类的继承
var Student = function (param) {
  Person.call(this,param);
  this.job = param.job;
  this.showAbility = function () {
    alert(this.firstName+' '+this.lastName+' '+this.job+"'s skill is "+param.ability);
  };
  this.sayHello = function () {
    alert('这是Student类中修改过的 sayHello 方法');
  };
};

// 继承类的原型链上的属性和方法
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayHello2 = function () {
  alert('这是Student类的原型链中修改过的 sayHello2 方法');
};

let student1 = new Student({
  firstName: 'Zeng',
  lastName: 'Jun',
  ability: 'study',
  job: 'student'
});

// student1.showAbility();
// student1.sayHello();
console.log(student1);
console.log(student1.sayHello2);
// student1.sayHello2();


// 测试 Object.create()
let protoObj = {
  name: 'name',
  say: function () {
    alert('TEST');
  },
};

let newObj = Object.create(protoObj);
console.log(newObj);
newObj.originName = 'originName';
newObj.originSay = function () {
  alert('originSay');
};

let newObj2 = {
  originName2: 'originName2',
  originSay2: function () {
    alert('originSay2');
  },
};

newObj2.__proto__ = Object.create(protoObj);
// newObj2.__proto__.test = 'test';
console.log(newObj2);
// console.log(newObj2.test);
console.log(newObj2.name);
// newObj2.say();


// 测试ES6的类
class Fruit {
  constructor(param) {
    this.name = param.name;
    this.price = param.price;
    this.num = param.num;
  }
  sell() {
    console.log(`${this.name}的总价：${this.price*this.num}`);
  }
}

let apple = new Fruit({
  name: 'apple',
  price: 5,
  num: 10
});

console.log(apple);
console.log(apple.name);
apple.sell();


// 测试
let excuteAfter5s = function () {
  return new Promise(function (resolve,reject) {
    window.setTimeout(function () {
      console.log('excuteAfter5s');
      resolve('excuteAfter5s finished');
    },5000);
  });
};

async function testAsyncFunc () {
  console.log('异步函数开始执行');
  let result = await excuteAfter5s();
  alert(result);
}

testAsyncFunc();
