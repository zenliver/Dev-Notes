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
    console.log(error2.toString());
  });

}).catch(function (error) {

  console.log(error);

  console.log('出现错误，已进入catch流程');
  console.log('catch到错误：'+error);

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


// try catch 测试
try {
  test();
} catch (e) {
  console.log(typeof e);
  let el201907101 = document.querySelector('#el201907101');
  el201907101.innerHTML = e.toString();
} finally {
  console.log('try finished');
}

// 测试


// Blob测试
let blobObj = {
  test: 'test'
};
let myBlob = new Blob([],{
  type: ''
});


try {
  dddddd
} catch (e) {
  alert(e.toString());
} finally {

}


function flatToTree(flatArr,nodeKey,parentNodeKey,childrenNodeKey,rootNodeParentKeyValue,arrSortFunction) {

  var treeArr = [];

  for (var i = 0; i < flatArr.length; i++) {

    if (flatArr[i][parentNodeKey] === rootNodeParentKeyValue) {

      // 递归调用
      var levelTempArr = flatToTree(flatArr,nodeKey,parentNodeKey,childrenNodeKey,flatArr[i][nodeKey],arrSortFunction);

      if (levelTempArr.length > 0) {
        flatArr[i][childrenNodeKey] = levelTempArr;
      }

      treeArr.push(flatArr[i]);

      // 数组排序
      if (treeArr.length > 1) {
        if (arrSortFunction) {
          treeArr.sort(arrSortFunction);
        }
      }

    }

  }

  return treeArr;
}

let arr10181807 = [{"id":86,"menu_code":"T_CLOUD_PAYFEE","menu_name":"校园支付","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanager_campus","sort_num":12,"state":null,"desc":"","create_time":"2016-03-31T06:58:25.000Z","modify_time":"2017-08-21T10:06:23.000Z","icon":"jxhd-payfee","menu_mode":0,"is_hide":null,"menu_id":86,"authority_name":"校园支付"},{"id":87,"menu_code":"T_CLOUD_PAYFEE_ADD_SCHOOL","menu_name":"发布交费通知","detail_name":null,"parent_menu_id":196,"menu_type":8,"menu_url_state":"#/schoolmanager_campus/campusadd","sort_num":1,"state":null,"desc":"","create_time":"2016-03-31T06:58:58.000Z","modify_time":"2017-09-20T01:55:21.000Z","icon":"icon-menu-notice-add","menu_mode":0,"is_hide":null,"menu_id":87,"authority_name":"发布交费通知"},{"id":88,"menu_code":"T_CLOUD_PAYFEE_LIST_SCHOOL","menu_name":"交费通知列表","detail_name":null,"parent_menu_id":196,"menu_type":8,"menu_url_state":"#/schoolmanager_campus/campuslist","sort_num":2,"state":null,"desc":"","create_time":"2016-03-31T06:59:20.000Z","modify_time":"2017-09-20T01:55:34.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":88,"authority_name":"交费通知列表"},{"id":101,"menu_code":"T_CLOUD_SCHEDULE","menu_name":"作息课表","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schedule_manage/schedule_setting","sort_num":8,"state":null,"desc":"","create_time":"2016-04-13T02:12:20.000Z","modify_time":"2017-09-19T10:43:38.000Z","icon":"jxhd-schedule","menu_mode":0,"is_hide":null,"menu_id":101,"authority_name":"作息课表"},{"id":103,"menu_code":"T_CLOUD_NOTICE_ADD_SCHOOL_MANAGE","menu_name":"发通知","detail_name":null,"parent_menu_id":180,"menu_type":8,"menu_url_state":"#/schoolmanager_notice/add","sort_num":1,"state":null,"desc":"","create_time":"2016-04-13T03:39:48.000Z","modify_time":"2017-09-19T04:11:02.000Z","icon":"icon-menu-notice-add","menu_mode":0,"is_hide":null,"menu_id":103,"authority_name":"发通知"},{"id":112,"menu_code":"T_CLOUD_SCHEDULE_SETTING","menu_name":"作息时间","detail_name":null,"parent_menu_id":101,"menu_type":8,"menu_url_state":"#/schedule_manage/schedule_setting","sort_num":1,"state":null,"desc":"","create_time":"2016-04-13T11:23:11.000Z","modify_time":"2017-09-19T10:43:31.000Z","icon":"icon-menu-notice-add","menu_mode":0,"is_hide":null,"menu_id":112,"authority_name":"作息时间"},{"id":114,"menu_code":"T_CLOUD_SCHEDULE_SCHOOL_RECORD","menu_name":"全校课表","detail_name":null,"parent_menu_id":101,"menu_type":8,"menu_url_state":"#/schedule_manage/schoolmanage_course","sort_num":3,"state":null,"desc":"","create_time":"2016-04-13T11:25:21.000Z","modify_time":"2017-09-19T10:43:49.000Z","icon":"icon-menu-schedule","menu_mode":0,"is_hide":null,"menu_id":114,"authority_name":"全校课表"},{"id":115,"menu_code":"T_CLOUD_SUBJECT_SETTING","menu_name":"科目设置","detail_name":null,"parent_menu_id":101,"menu_type":8,"menu_url_state":"#/schedule_manage/subject_setting","sort_num":4,"state":null,"desc":"","create_time":"2016-04-13T11:26:12.000Z","modify_time":"2017-09-19T10:44:01.000Z","icon":"icon-course-setting","menu_mode":0,"is_hide":null,"menu_id":115,"authority_name":"科目设置"},{"id":116,"menu_code":"T_CLOUD_NOTICE_DISTRICT_LIST","menu_name":"教育局通知","detail_name":null,"parent_menu_id":182,"menu_type":8,"menu_url_state":"/schoolmanager_notice/education_notice_list","sort_num":7,"state":null,"desc":"","create_time":"2016-04-13T11:40:37.000Z","modify_time":"2017-09-23T10:35:54.000Z","icon":"icon-edu-department-notice","menu_mode":0,"is_hide":null,"menu_id":116,"authority_name":"教育局通知"},{"id":118,"menu_code":"T_CLOUD_NOTICE_SETTING","menu_name":"教育局通知设置","detail_name":null,"parent_menu_id":182,"menu_type":8,"menu_url_state":"/schoolmanager_notice/education_notice_setting","sort_num":8,"state":null,"desc":"","create_time":"2016-04-13T11:43:50.000Z","modify_time":"2017-09-23T10:35:27.000Z","icon":"icon-audit-setting","menu_mode":0,"is_hide":null,"menu_id":118,"authority_name":"教育局通知设置"},{"id":166,"menu_code":"T_CLOUD_NOTICE_LIST_SCHOOL_MANAGE","menu_name":"通知列表","detail_name":null,"parent_menu_id":180,"menu_type":8,"menu_url_state":"#/schoolmanager_notice/list","sort_num":2,"state":null,"desc":"","create_time":"2016-06-15T09:23:01.000Z","modify_time":"2017-09-19T04:11:09.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":166,"authority_name":"通知列表"},{"id":174,"menu_code":"T_CLOUD_WGW","menu_name":"微官网","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"/wgw/messageadd","sort_num":13,"state":null,"desc":"","create_time":"2016-07-06T08:37:45.000Z","modify_time":"2017-09-19T02:24:36.000Z","icon":"jxhd-wgw","menu_mode":0,"is_hide":null,"menu_id":174,"authority_name":"微官网"},{"id":175,"menu_code":"T_CLOUD_WGW_TERM","menu_name":"栏目设置","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/termlist","sort_num":1,"state":null,"desc":"","create_time":"2016-07-06T08:59:32.000Z","modify_time":"2017-09-12T02:46:38.000Z","icon":"icon-wgw-column-setting","menu_mode":0,"is_hide":null,"menu_id":175,"authority_name":"栏目设置"},{"id":177,"menu_code":"T_CLOUD_ACTIVITY_ADD_SCHOOL","menu_name":"发活动","detail_name":null,"parent_menu_id":181,"menu_type":8,"menu_url_state":"#/schoolmanager_activity/add","sort_num":4,"state":null,"desc":"","create_time":"2016-07-11T02:28:32.000Z","modify_time":"2017-09-20T02:09:19.000Z","icon":"icon-menu-activity-add","menu_mode":0,"is_hide":null,"menu_id":177,"authority_name":"发活动"},{"id":178,"menu_code":"T_CLOUD_ACTIVITY_LIST_SCHOOL","menu_name":"活动列表","detail_name":null,"parent_menu_id":181,"menu_type":8,"menu_url_state":"#/schoolmanager_activity/activitylist","sort_num":5,"state":null,"desc":"","create_time":"2016-07-11T02:36:15.000Z","modify_time":"2017-09-20T02:09:33.000Z","icon":"icon-menu-activity-list","menu_mode":0,"is_hide":null,"menu_id":178,"authority_name":"活动列表"},{"id":180,"menu_code":"T_CLOUD_NOTICE_MODULE","menu_name":"通知","detail_name":null,"parent_menu_id":479,"menu_type":8,"menu_url_state":"#/schoolmanager_notice","sort_num":1,"state":null,"desc":"","create_time":"2016-07-11T02:57:13.000Z","modify_time":"2017-09-19T04:10:55.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":180,"authority_name":"通知"},{"id":181,"menu_code":"T_CLOUD_ACTIVITY_MODULE","menu_name":"活动","detail_name":null,"parent_menu_id":479,"menu_type":8,"menu_url_state":"0","sort_num":2,"state":null,"desc":"","create_time":"2016-07-11T03:02:15.000Z","modify_time":"2017-07-18T06:51:47.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":181,"authority_name":"活动"},{"id":182,"menu_code":"T_CLOUD_EDU_NOTICE_MODULE","menu_name":"教育局","detail_name":null,"parent_menu_id":479,"menu_type":8,"menu_url_state":"0","sort_num":4,"state":null,"desc":"","create_time":"2016-07-11T03:08:20.000Z","modify_time":"2017-09-23T10:36:05.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":182,"authority_name":"教育局"},{"id":186,"menu_code":"T_CLOUD_REPAIR","menu_name":"校务报修","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/repair","sort_num":14,"state":null,"desc":"","create_time":"2016-07-14T09:38:20.000Z","modify_time":"2017-08-07T08:28:47.000Z","icon":"jxhd-repair","menu_mode":0,"is_hide":null,"menu_id":186,"authority_name":"校务报修"},{"id":187,"menu_code":"T_CLOUD_REPAIR_LIST","menu_name":"报修列表","detail_name":null,"parent_menu_id":186,"menu_type":8,"menu_url_state":"#/repair/list","sort_num":1,"state":null,"desc":"","create_time":"2016-07-20T01:56:27.000Z","modify_time":"2017-07-18T06:56:29.000Z","icon":"icon-repair-list","menu_mode":0,"is_hide":null,"menu_id":187,"authority_name":"报修列表"},{"id":188,"menu_code":"T_CLOUD_REPAIR_SETTING","menu_name":"报修设置","detail_name":null,"parent_menu_id":186,"menu_type":8,"menu_url_state":"#/repair/setting","sort_num":2,"state":null,"desc":"","create_time":"2016-07-20T01:57:02.000Z","modify_time":"2017-07-18T06:56:33.000Z","icon":"icon-repair-setting","menu_mode":0,"is_hide":null,"menu_id":188,"authority_name":"报修设置"},{"id":196,"menu_code":"SCHOOLMANAGER_PAYFEE","menu_name":"校园支付","detail_name":null,"parent_menu_id":86,"menu_type":8,"menu_url_state":"#/schoolmgr_payfee","sort_num":1,"state":1,"desc":null,"create_time":"2017-08-21T10:01:15.000Z","modify_time":"2017-08-21T10:01:15.000Z","icon":null,"menu_mode":0,"is_hide":null,"menu_id":196,"authority_name":"校园支付"},{"id":197,"menu_code":"T_CLOUD_PAYFEE_CARD","menu_name":"校园卡","detail_name":null,"parent_menu_id":86,"menu_type":8,"menu_url_state":"0","sort_num":2,"state":null,"desc":"","create_time":"2016-08-19T02:56:56.000Z","modify_time":"2017-10-23T09:13:06.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":197,"authority_name":"校园卡"},{"id":198,"menu_code":"T_CLOUD_PAYFEE_CARD_RACHARGE","menu_name":"充值查询","detail_name":null,"parent_menu_id":197,"menu_type":8,"menu_url_state":"#/schoolmanager_campus/campuscardracharge","sort_num":1,"state":null,"desc":"","create_time":"2016-08-19T02:59:04.000Z","modify_time":"2017-10-23T09:14:19.000Z","icon":"icon-CHARAGE-LIST","menu_mode":0,"is_hide":null,"menu_id":198,"authority_name":"充值查询"},{"id":199,"menu_code":"T_CLOUD_PAYFEE_CARD_COUSUME","menu_name":"消费查询","detail_name":null,"parent_menu_id":197,"menu_type":8,"menu_url_state":"#/schoolmanager_campus/campuscardconsume","sort_num":2,"state":null,"desc":"","create_time":"2016-08-19T03:01:22.000Z","modify_time":"2017-10-23T09:14:23.000Z","icon":"icon-file-pdf2","menu_mode":0,"is_hide":null,"menu_id":199,"authority_name":"消费查询"},{"id":200,"menu_code":"T_CLOUD_PAYFEE_CARD_BALANCE","menu_name":"余额查询","detail_name":null,"parent_menu_id":197,"menu_type":8,"menu_url_state":"#/schoolmanager_campus/campuscardbalance","sort_num":3,"state":null,"desc":"","create_time":"2016-08-19T03:03:33.000Z","modify_time":"2017-10-23T09:14:28.000Z","icon":"icon-BALANCE-LIST","menu_mode":0,"is_hide":null,"menu_id":200,"authority_name":"余额查询"},{"id":201,"menu_code":"T_CLOUD_ELECTIVE_SCHOOL_MANAGE_COURSE","menu_name":"选课","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanager_elective","sort_num":30,"state":null,"desc":"","create_time":"2016-08-25T09:57:55.000Z","modify_time":"2017-10-11T07:21:18.000Z","icon":"jxhd-elective","menu_mode":0,"is_hide":null,"menu_id":201,"authority_name":"选课"},{"id":202,"menu_code":"T_CLOUD_ELECTIVE_COURSE_LIST_SCHOOL_MANAGE","menu_name":"选课列表","detail_name":null,"parent_menu_id":201,"menu_type":8,"menu_url_state":"#/schoolmanager_elective/electivelist","sort_num":1,"state":null,"desc":"","create_time":"2016-08-25T09:59:02.000Z","modify_time":"2017-10-11T07:21:07.000Z","icon":"icon-menu-attendance-info","menu_mode":0,"is_hide":null,"menu_id":202,"authority_name":"选课列表"},{"id":203,"menu_code":"T_CLOUD_ELECTIVE_COURSE_STASTICS_SCHOOL_MANAGE","menu_name":"选课统计","detail_name":null,"parent_menu_id":201,"menu_type":8,"menu_url_state":"#/schoolmanager_elective/electivestastics","sort_num":2,"state":null,"desc":"","create_time":"2016-08-25T09:59:43.000Z","modify_time":"2017-10-11T07:21:34.000Z","icon":"icon-statistics2","menu_mode":0,"is_hide":null,"menu_id":203,"authority_name":"选课统计"},{"id":213,"menu_code":"T_CLOUD_SCHOOL_ADMIN_ATTENDANCE","menu_name":"学生考勤","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance","sort_num":31,"state":null,"desc":"","create_time":"2016-10-18T06:00:22.000Z","modify_time":"2019-05-28T08:27:50.000Z","icon":"jxhd-attendance","menu_mode":0,"is_hide":null,"menu_id":213,"authority_name":"学生考勤"},{"id":214,"menu_code":"T_CLOUD_ATTENDANCE_DOWNLOAD","menu_name":"考勤数据下载","detail_name":null,"parent_menu_id":213,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance/schooladminattendance","sort_num":10,"state":null,"desc":"新版本不要了，先保留链接","create_time":"2016-10-18T06:05:29.000Z","modify_time":"2019-01-20T22:01:28.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":214,"authority_name":"考勤数据下载"},{"id":216,"menu_code":"T_CLOUD_SCHOOL_AUTHORITY","menu_name":"权限管理","detail_name":null,"parent_menu_id":623,"menu_type":8,"menu_url_state":"/authoritymgr/index","sort_num":32,"state":null,"desc":"","create_time":"2016-11-01T07:58:10.000Z","modify_time":"2017-09-27T03:08:15.000Z","icon":"sys-authority","menu_mode":0,"is_hide":null,"menu_id":216,"authority_name":"权限管理"},{"id":477,"menu_code":"JXHD_SCHOOLADMIN_MENU","menu_name":"信息管理","detail_name":null,"parent_menu_id":613,"menu_type":8,"menu_url_state":"#/jxhdadmin","sort_num":1,"state":null,"desc":"","create_time":"2016-11-21T05:49:43.000Z","modify_time":"2017-09-21T07:03:56.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":477,"authority_name":"信息管理"},{"id":479,"menu_code":"T_CLOUD_SCHOOL_MANAGE_NOTICE","menu_name":"通知活动","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanager_notice/notice","sort_num":2,"state":null,"desc":"","create_time":"2016-11-21T05:54:31.000Z","modify_time":"2017-09-13T03:19:09.000Z","icon":"jxhd-notice","menu_mode":0,"is_hide":null,"menu_id":479,"authority_name":"通知活动"},{"id":480,"menu_code":"T_CLOUD_HOME","menu_name":"快捷区","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/index","sort_num":1,"state":null,"desc":"","create_time":"2016-11-21T05:55:12.000Z","modify_time":"2017-09-21T07:04:05.000Z","icon":"jxhd-index","menu_mode":0,"is_hide":null,"menu_id":480,"authority_name":"快捷区"},{"id":539,"menu_code":"T_CLOUD_ORGANIZE","menu_name":"组织架构管理","detail_name":null,"parent_menu_id":623,"menu_type":8,"menu_url_state":"#/schoolmanager_organize/Organize","sort_num":13,"state":null,"desc":"","create_time":"2016-12-20T07:50:27.000Z","modify_time":"2017-08-07T08:29:30.000Z","icon":"sys-organize","menu_mode":0,"is_hide":null,"menu_id":539,"authority_name":"组织架构管理"},{"id":540,"menu_code":"T_CLOUD_ORGANIZE_BASIC_INFORMATION","menu_name":"基本信息","detail_name":null,"parent_menu_id":539,"menu_type":8,"menu_url_state":"#/schoolmanager_organize/basicInfo","sort_num":1,"state":null,"desc":"","create_time":"2016-12-21T03:55:01.000Z","modify_time":"2017-08-11T09:10:37.000Z","icon":"icon-menu-attendance-info","menu_mode":0,"is_hide":null,"menu_id":540,"authority_name":"基本信息"},{"id":541,"menu_code":"T_CLOUD_ORGANIZE_ORGANIZE","menu_name":"组织架构","detail_name":null,"parent_menu_id":539,"menu_type":8,"menu_url_state":"#/schoolmanager_organize/organize","sort_num":2,"state":null,"desc":"","create_time":"2016-12-21T03:57:02.000Z","modify_time":"2017-08-11T09:10:29.000Z","icon":"icon-structure","menu_mode":0,"is_hide":null,"menu_id":541,"authority_name":"组织架构"},{"id":543,"menu_code":"T_CLOUD_WGW_BASEINFO","menu_name":"官网基础信息","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/baseschool","sort_num":2,"state":null,"desc":"","create_time":"2016-12-23T02:16:09.000Z","modify_time":"2017-09-12T02:48:15.000Z","icon":"icon-wgw-basic-info","menu_mode":0,"is_hide":null,"menu_id":543,"authority_name":"官网基础信息"},{"id":544,"menu_code":"T_CLOUD_WGW_PUBMESSAGE","menu_name":"发布信息","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/messageadd","sort_num":3,"state":null,"desc":"","create_time":"2016-12-23T02:17:05.000Z","modify_time":"2017-09-12T02:50:34.000Z","icon":"icon-wgw-publish","menu_mode":0,"is_hide":null,"menu_id":544,"authority_name":"发布信息"},{"id":545,"menu_code":"T_CLOUD_WGW_MESSAGELIST","menu_name":"信息列表","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/contentlist","sort_num":4,"state":null,"desc":"","create_time":"2016-12-23T02:18:04.000Z","modify_time":"2017-09-12T02:49:51.000Z","icon":"icon-wgw-info-list","menu_mode":0,"is_hide":null,"menu_id":545,"authority_name":"信息列表"},{"id":546,"menu_code":"T_CLOUD_WGW_TEMPLATE","menu_name":"模板选择","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/templatemgr","sort_num":5,"state":null,"desc":"","create_time":"2016-12-23T02:18:50.000Z","modify_time":"2017-09-12T02:51:53.000Z","icon":"icon-wgw-model-select","menu_mode":0,"is_hide":null,"menu_id":546,"authority_name":"模板选择"},{"id":548,"menu_code":"T_CLOUD_WGW_CONTROLS","menu_name":"功能小控件","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/controls","sort_num":7,"state":null,"desc":"","create_time":"2016-12-23T02:20:30.000Z","modify_time":"2017-08-08T09:12:29.000Z","icon":"icon-wgw-contrlos","menu_mode":0,"is_hide":null,"menu_id":548,"authority_name":"功能小控件"},{"id":555,"menu_code":"CENTER_SCHOOLADMIN_MENU","menu_name":"资源管理","detail_name":null,"parent_menu_id":613,"menu_type":8,"menu_url_state":"#/schmgr_res","sort_num":3,"state":null,"desc":"","create_time":"2016-12-27T10:37:12.000Z","modify_time":"2017-09-21T07:04:20.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":555,"authority_name":"资源管理"},{"id":560,"menu_code":"Schmgr_ResLocal","menu_name":"本地资源","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"/schmgr_resschool/list","sort_num":2,"state":null,"desc":"","create_time":"2016-12-28T03:25:22.000Z","modify_time":"2019-01-10T02:04:54.000Z","icon":"res-icon-local","menu_mode":0,"is_hide":null,"menu_id":560,"authority_name":"本地资源"},{"id":561,"menu_code":"ADMIN_RESPUBLIC","menu_name":"公开资源","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"/schmgr_respublic/oos_list","sort_num":7,"state":null,"desc":"","create_time":"2016-12-28T03:27:31.000Z","modify_time":"2019-01-08T22:40:30.000Z","icon":"res-icon-respublic","menu_mode":0,"is_hide":null,"menu_id":561,"authority_name":"公开资源"},{"id":562,"menu_code":"ADMIN_RES_AUDIT","menu_name":"资源管理","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"#/schmgr_resmy","sort_num":1,"state":null,"desc":"","create_time":"2016-12-28T03:27:50.000Z","modify_time":"2017-08-07T08:50:17.000Z","icon":"res-icon-resmgr","menu_mode":0,"is_hide":null,"menu_id":562,"authority_name":"资源管理"},{"id":566,"menu_code":"ADMIN_RESRELEASE","menu_name":"上传资源","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/release","sort_num":1,"state":null,"desc":"","create_time":"2016-12-28T11:14:42.000Z","modify_time":"2017-07-18T07:44:29.000Z","icon":"icon-upload2","menu_mode":0,"is_hide":null,"menu_id":566,"authority_name":"上传资源"},{"id":567,"menu_code":"ADMIN_RESMY_RELEASELIST","menu_name":"我发布的资源","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/releaseList","sort_num":2,"state":null,"desc":"","create_time":"2016-12-28T11:15:36.000Z","modify_time":"2017-07-18T07:44:34.000Z","icon":"icon-local-resource2","menu_mode":0,"is_hide":null,"menu_id":567,"authority_name":"我发布的资源"},{"id":568,"menu_code":"ADMIN_RESMY_COLLECTLIST","menu_name":"我的收藏","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/collectList","sort_num":3,"state":null,"desc":"","create_time":"2016-12-28T11:16:12.000Z","modify_time":"2017-07-18T07:44:38.000Z","icon":"icon-not-collect2","menu_mode":0,"is_hide":null,"menu_id":568,"authority_name":"我的收藏"},{"id":569,"menu_code":"ADMIN_RESAUDIT_AUDITLIST","menu_name":"审核列表","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/auditList","sort_num":4,"state":null,"desc":"","create_time":"2016-12-28T11:17:03.000Z","modify_time":"2018-09-19T07:02:27.000Z","icon":"icon-area-resource","menu_mode":0,"is_hide":null,"menu_id":569,"authority_name":"审核列表"},{"id":570,"menu_code":"ADMIN_RESSTATISTICS","menu_name":"资源统计","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/resstatistics","sort_num":5,"state":null,"desc":"","create_time":"2016-12-28T11:18:22.000Z","modify_time":"2017-09-15T11:24:10.000Z","icon":"icon-statistics22","menu_mode":0,"is_hide":null,"menu_id":570,"authority_name":"资源统计"},{"id":571,"menu_code":"ADMIN_RESAUDIT_AUDITSET","menu_name":"审核设置","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/auditset","sort_num":6,"state":null,"desc":"","create_time":"2016-12-28T11:19:02.000Z","modify_time":"2017-07-18T07:44:51.000Z","icon":"icon-audit-setting2","menu_mode":0,"is_hide":null,"menu_id":571,"authority_name":"审核设置"},{"id":572,"menu_code":"T_CLOUD_EXAM_SCHOOL_MANAGE","menu_name":"成绩","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanager_exam/exam","sort_num":5,"state":null,"desc":"","create_time":"2017-01-04T09:13:35.000Z","modify_time":"2017-08-07T08:28:02.000Z","icon":"jxhd-exam","menu_mode":0,"is_hide":null,"menu_id":572,"authority_name":"成绩"},{"id":573,"menu_code":"T_CLOUD_SCORE_ADD","menu_name":"发成绩","detail_name":null,"parent_menu_id":572,"menu_type":8,"menu_url_state":"#/schoolmanager_exam/examadd","sort_num":1,"state":null,"desc":"","create_time":"2017-01-04T09:16:17.000Z","modify_time":"2017-09-19T10:02:08.000Z","icon":"icon-examt-add","menu_mode":0,"is_hide":null,"menu_id":573,"authority_name":"发成绩"},{"id":574,"menu_code":"T_CLOUD_SCORE_LIST","menu_name":"成绩列表","detail_name":null,"parent_menu_id":572,"menu_type":8,"menu_url_state":"#/schoolmanager_exam/examlist","sort_num":2,"state":null,"desc":"","create_time":"2017-01-04T09:17:05.000Z","modify_time":"2017-09-19T10:02:13.000Z","icon":"icon-menu-exam-list","menu_mode":0,"is_hide":null,"menu_id":574,"authority_name":"成绩列表"},{"id":584,"menu_code":"T_CLOUD_VOTE","menu_name":"投票","detail_name":null,"parent_menu_id":479,"menu_type":8,"menu_url_state":"0","sort_num":3,"state":null,"desc":"","create_time":"2017-01-16T07:06:54.000Z","modify_time":"2017-07-18T06:52:03.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":584,"authority_name":"投票"},{"id":585,"menu_code":"T_CLOUD_VOTE_ADD","menu_name":"发投票","detail_name":null,"parent_menu_id":584,"menu_type":8,"menu_url_state":"#/schoolmanager_vote/add","sort_num":1,"state":null,"desc":"","create_time":"2017-01-16T07:09:31.000Z","modify_time":"2017-09-20T02:09:45.000Z","icon":"icon-menu-vote-add","menu_mode":0,"is_hide":null,"menu_id":585,"authority_name":"发投票"},{"id":586,"menu_code":"T_CLOUD_VOTE_LIST","menu_name":"投票列表","detail_name":null,"parent_menu_id":584,"menu_type":8,"menu_url_state":"#/schoolmanager_vote/votelist","sort_num":2,"state":null,"desc":"","create_time":"2017-01-16T07:10:33.000Z","modify_time":"2017-09-20T02:09:59.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":586,"authority_name":"投票列表"},{"id":592,"menu_code":"T_CLOUD_INDEX_NOTICE_ADD_SCHOOL_MANAGE","menu_name":"发布通知","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/schoolmanager_notice/add","sort_num":1,"state":null,"desc":"","create_time":"2017-02-14T10:33:28.000Z","modify_time":"2017-09-21T02:57:08.000Z","icon":"icon-menu-notice-add","menu_mode":1,"is_hide":null,"menu_id":592,"authority_name":"发布通知"},{"id":593,"menu_code":"T_CLOUD_INDEX_PAYFEE_ADD_SCHOOL","menu_name":"发布支付","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/schoolmanager_campus/campusadd","sort_num":3,"state":null,"desc":"","create_time":"2017-02-14T11:13:46.000Z","modify_time":"2017-09-21T02:57:35.000Z","icon":"icon-menu-notice-add","menu_mode":1,"is_hide":null,"menu_id":593,"authority_name":"发布支付"},{"id":594,"menu_code":"T_CLOUD_INDEX_USER_MANAGE_USER_LIST","menu_name":"查通讯录","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/usermgr/usermgrlist/student","sort_num":5,"state":null,"desc":"","create_time":"2017-02-14T12:30:09.000Z","modify_time":"2017-09-21T02:58:09.000Z","icon":"icon-parent","menu_mode":1,"is_hide":null,"menu_id":594,"authority_name":"查通讯录"},{"id":595,"menu_code":"T_CLOUD_INDEX_SCHEDULE_SCHOOL_RECORD","menu_name":"查课程表","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/schedule_manage/schoolmanage_course","sort_num":7,"state":null,"desc":"","create_time":"2017-02-14T12:31:11.000Z","modify_time":"2017-09-21T02:58:26.000Z","icon":"icon-menu-schedule","menu_mode":1,"is_hide":null,"menu_id":595,"authority_name":"查课程表"},{"id":598,"menu_code":"T_CLOUD_MANAGE_RECIPE_LIST","menu_name":"阳光食谱","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schoolmanager_recipe","sort_num":8,"state":null,"desc":"","create_time":"2017-02-21T04:18:15.000Z","modify_time":"2017-08-07T08:28:19.000Z","icon":"jxhd-recipe","menu_mode":0,"is_hide":null,"menu_id":598,"authority_name":"阳光食谱"},{"id":599,"menu_code":"T_CLOUD_MANAGE_RECIPE_LIST_WEEK","menu_name":"本周食谱","detail_name":null,"parent_menu_id":598,"menu_type":8,"menu_url_state":"#/schoolmanager_recipe/recipeListddit","sort_num":1,"state":null,"desc":"","create_time":"2017-02-21T04:20:02.000Z","modify_time":"2017-08-16T07:29:33.000Z","icon":"icon-recipe","menu_mode":0,"is_hide":null,"menu_id":599,"authority_name":"本周食谱"},{"id":604,"menu_code":"Ｎ_MENU_USERMGR","menu_name":"用户管理","detail_name":null,"parent_menu_id":623,"menu_type":8,"menu_url_state":"#/usermgr","sort_num":12,"state":null,"desc":"","create_time":"2017-03-10T02:46:36.000Z","modify_time":"2017-08-07T08:29:14.000Z","icon":"sys-usermgr","menu_mode":0,"is_hide":null,"menu_id":604,"authority_name":"用户管理"},{"id":605,"menu_code":"N_MENU_USERMGR_USERANALYSIS","menu_name":"用户分析","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"#/usermgr/useranalysis","sort_num":1,"state":null,"desc":"","create_time":"2017-03-10T02:49:34.000Z","modify_time":"2017-07-18T07:45:26.000Z","icon":"icon-user-manage-statistics","menu_mode":0,"is_hide":null,"menu_id":605,"authority_name":"用户分析"},{"id":606,"menu_code":"N_MENU_USERMGR_USERMGR","menu_name":"用户管理","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"#/usermgr/usermgrlist","sort_num":2,"state":null,"desc":"","create_time":"2017-03-10T02:50:50.000Z","modify_time":"2017-08-14T09:37:00.000Z","icon":"icon-usermgr-list","menu_mode":0,"is_hide":null,"menu_id":606,"authority_name":"用户管理"},{"id":607,"menu_code":"N_MENU_USERMGR_USERIMPORT","menu_name":"用户批量操作","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"#/usermgr/userimport","sort_num":4,"state":null,"desc":"","create_time":"2017-03-10T02:51:37.000Z","modify_time":"2019-04-21T18:16:26.000Z","icon":"icon-usermgr-userimport","menu_mode":0,"is_hide":null,"menu_id":607,"authority_name":"用户批量操作"},{"id":608,"menu_code":"N_MENU_USERMGR_USERAUDIT","menu_name":"用户审核","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"#/usermgr/useraudit","sort_num":5,"state":null,"desc":"","create_time":"2017-03-10T02:52:52.000Z","modify_time":"2019-04-21T18:16:08.000Z","icon":"icon-usermgr-useraudit","menu_mode":0,"is_hide":null,"menu_id":608,"authority_name":"用户审核"},{"id":609,"menu_code":"ADMIN_RES_CATALOG_MANAGE","menu_name":"资源目录设置","detail_name":null,"parent_menu_id":562,"menu_type":8,"menu_url_state":"#/schmgr_resmy/resourceCatalog","sort_num":7,"state":null,"desc":"","create_time":"2017-04-10T07:01:44.000Z","modify_time":"2018-09-19T08:33:06.000Z","icon":"icon-resource-catalog","menu_mode":0,"is_hide":null,"menu_id":609,"authority_name":"资源目录设置"},{"id":613,"menu_code":"ADMIN_MENUS_ROOT","menu_name":"学校管理员菜单","detail_name":null,"parent_menu_id":null,"menu_type":8,"menu_url_state":"0","sort_num":2,"state":null,"desc":null,"create_time":"2017-04-24T11:45:19.000Z","modify_time":"2017-07-18T10:34:52.000Z","icon":null,"menu_mode":null,"is_hide":null,"menu_id":613,"authority_name":"学校管理员菜单"},{"id":623,"menu_code":"SYS_SCHOOLADMIN_MENU","menu_name":"系统管理","detail_name":null,"parent_menu_id":613,"menu_type":8,"menu_url_state":"#/sys","sort_num":4,"state":null,"desc":null,"create_time":"2017-05-20T08:15:14.000Z","modify_time":"2017-08-10T07:47:46.000Z","icon":null,"menu_mode":0,"is_hide":null,"menu_id":623,"authority_name":"系统管理"},{"id":624,"menu_code":"SCHOOLMANAGER_OFFICE","menu_name":"应用中心","detail_name":null,"parent_menu_id":613,"menu_type":8,"menu_url_state":"/schoolmanager_office/index","sort_num":2,"state":null,"desc":null,"create_time":"2017-05-20T08:16:20.000Z","modify_time":"2017-09-21T07:04:13.000Z","icon":null,"menu_mode":0,"is_hide":null,"menu_id":624,"authority_name":"应用中心"},{"id":629,"menu_code":"N_MENU_USERMGR_SETSTUENDS","menu_name":"设置学生账号","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"#/usermgr/setstudents","sort_num":6,"state":null,"desc":null,"create_time":"2017-05-25T07:53:12.000Z","modify_time":"2019-04-21T18:15:48.000Z","icon":"icon-audit-setting","menu_mode":0,"is_hide":null,"menu_id":629,"authority_name":"设置学生账号"},{"id":639,"menu_code":"SCHOOL_ALBUM","menu_name":"班级相册","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"0","sort_num":32,"state":null,"desc":null,"create_time":"2017-07-04T07:11:13.000Z","modify_time":"2017-09-19T10:46:19.000Z","icon":"jxhd-picture","menu_mode":0,"is_hide":null,"menu_id":639,"authority_name":"班级相册"},{"id":641,"menu_code":"SCHOOL_ALBUM_LIST","menu_name":"相册列表","detail_name":null,"parent_menu_id":639,"menu_type":8,"menu_url_state":"/schoolmanager_album/album_list","sort_num":1,"state":null,"desc":null,"create_time":"2017-07-04T07:14:22.000Z","modify_time":"2017-09-19T10:42:47.000Z","icon":"icon-iconfont-kuaijiecaidan","menu_mode":0,"is_hide":null,"menu_id":641,"authority_name":"相册列表"},{"id":643,"menu_code":"SCHOOL_REVIEW_LIST","menu_name":"审核列表","detail_name":null,"parent_menu_id":639,"menu_type":8,"menu_url_state":"/schoolmanager_album/audit_list","sort_num":2,"state":null,"desc":null,"create_time":"2017-07-04T07:15:21.000Z","modify_time":"2017-09-19T10:42:43.000Z","icon":"icon-usermgr-useraudit","menu_mode":0,"is_hide":null,"menu_id":643,"authority_name":"审核列表"},{"id":717,"menu_code":"HOME_SCHOOLMGR_WGW","menu_name":"官网动态","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"#","sort_num":101,"state":null,"desc":null,"create_time":"2017-07-25T06:46:16.000Z","modify_time":"2017-09-21T02:58:56.000Z","icon":"default","menu_mode":2,"is_hide":null,"menu_id":717,"authority_name":"官网动态"},{"id":718,"menu_code":"HOME_SCHOOLMGR_NOTICE","menu_name":"通知","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"#","sort_num":102,"state":1,"desc":null,"create_time":"2017-07-25T06:47:03.000Z","modify_time":"2017-07-25T06:47:03.000Z","icon":"info","menu_mode":2,"is_hide":null,"menu_id":718,"authority_name":"通知"},{"id":719,"menu_code":"HOME_SCHOOLMGR_PAYFEE","menu_name":"校园支付","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"#","sort_num":105,"state":1,"desc":null,"create_time":"2017-07-25T06:47:46.000Z","modify_time":"2017-07-25T06:47:46.000Z","icon":"info","menu_mode":2,"is_hide":null,"menu_id":719,"authority_name":"校园支付"},{"id":730,"menu_code":"NOTICE_DELETE_AUTH","menu_name":"删除权限","detail_name":null,"parent_menu_id":166,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":1,"desc":null,"create_time":"2017-08-09T06:01:10.000Z","modify_time":"2017-08-09T06:01:10.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":730,"authority_name":"删除权限"},{"id":732,"menu_code":"CAMPUS_PAY_DELETE_AUTH","menu_name":"删除权限","detail_name":null,"parent_menu_id":88,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":null,"desc":null,"create_time":"2017-08-11T02:23:58.000Z","modify_time":"2017-08-18T07:57:09.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":732,"authority_name":"删除权限"},{"id":734,"menu_code":"USERMGR_ALL_AUTH","menu_name":"管理权限","detail_name":null,"parent_menu_id":606,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":null,"desc":null,"create_time":"2017-08-14T03:44:34.000Z","modify_time":"2017-08-14T06:53:29.000Z","icon":"0","menu_mode":3,"is_hide":null,"menu_id":734,"authority_name":"管理权限"},{"id":742,"menu_code":"ELECTIVE_ADD_AUTH","menu_name":"新增权限","detail_name":null,"parent_menu_id":202,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":1,"desc":null,"create_time":"2017-08-14T09:20:58.000Z","modify_time":"2017-08-14T09:20:58.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":742,"authority_name":"新增权限"},{"id":743,"menu_code":"ELECTIVE_MANAGE_AUTH","menu_name":"管理权限","detail_name":null,"parent_menu_id":202,"menu_type":8,"menu_url_state":"0","sort_num":2,"state":1,"desc":null,"create_time":"2017-08-14T09:28:13.000Z","modify_time":"2017-08-14T09:28:13.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":743,"authority_name":"管理权限"},{"id":746,"menu_code":"EDU_SCHOOLMANAGER_APPLIST","menu_name":"教学应用","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"#/app/list","sort_num":9,"state":null,"desc":null,"create_time":"2017-08-16T00:37:15.000Z","modify_time":"2019-01-08T22:39:22.000Z","icon":"res-appcenter","menu_mode":0,"is_hide":null,"menu_id":746,"authority_name":"教学应用"},{"id":752,"menu_code":"MANAGE_SCHOLSCHEDULE_AUH","menu_name":"管理员课程表权限","detail_name":null,"parent_menu_id":114,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":null,"desc":null,"create_time":"2017-08-21T02:48:53.000Z","modify_time":"2017-09-30T09:42:22.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":752,"authority_name":"管理员课程表权限"},{"id":753,"menu_code":"Ｎ_MENU_MESSAGEMGR","menu_name":"消息管理","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/messagemgr","sort_num":14,"state":null,"desc":null,"create_time":"2017-08-21T07:46:21.000Z","modify_time":"2017-10-17T08:36:54.000Z","icon":"res-icon-statistics","menu_mode":0,"is_hide":null,"menu_id":753,"authority_name":"消息管理"},{"id":754,"menu_code":"N_MENU_MESSAGEMGR_STASTICSANALYSIS","menu_name":"统计分析","detail_name":null,"parent_menu_id":753,"menu_type":8,"menu_url_state":"#/messagemgr/stasticsanalysis","sort_num":1,"state":null,"desc":null,"create_time":"2017-08-21T07:50:46.000Z","modify_time":"2017-10-16T01:40:05.000Z","icon":"icon-statistics22","menu_mode":0,"is_hide":null,"menu_id":754,"authority_name":"统计分析"},{"id":755,"menu_code":"N_MENU_MESSAGEMGR_MESSAGELIST","menu_name":"消息列表","detail_name":null,"parent_menu_id":753,"menu_type":8,"menu_url_state":"#/messagemgr/messagelist","sort_num":2,"state":null,"desc":null,"create_time":"2017-08-21T07:53:58.000Z","modify_time":"2017-08-21T09:10:45.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":755,"authority_name":"消息列表"},{"id":758,"menu_code":"T_CLOUD_WGW_PICTURE","menu_name":"图库","detail_name":null,"parent_menu_id":174,"menu_type":8,"menu_url_state":"#/wgw/powerpoint","sort_num":6,"state":null,"desc":null,"create_time":"2017-08-23T06:20:24.000Z","modify_time":"2017-09-12T02:52:15.000Z","icon":"icon-wgw-img-lib","menu_mode":0,"is_hide":null,"menu_id":758,"authority_name":"图库"},{"id":762,"menu_code":"SCHOOLMANAGER_RES_DETAIL","menu_name":"资源详情","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"/res/resdetail","sort_num":10,"state":null,"desc":null,"create_time":"2017-09-19T02:34:08.000Z","modify_time":"2019-01-08T22:39:08.000Z","icon":null,"menu_mode":-1,"is_hide":null,"menu_id":762,"authority_name":"资源详情"},{"id":767,"menu_code":"SCHOOLMANAGER_MYINFO_SETTING","menu_name":"个人设置","detail_name":null,"parent_menu_id":613,"menu_type":8,"menu_url_state":"/my_setting/basicinfo","sort_num":10,"state":1,"desc":null,"create_time":"2017-09-20T11:33:50.000Z","modify_time":"2017-09-20T11:33:50.000Z","icon":null,"menu_mode":-1,"is_hide":null,"menu_id":767,"authority_name":"个人设置"},{"id":771,"menu_code":"MESSAGEMGR_MANAGE_AUTH","menu_name":"管理权限","detail_name":null,"parent_menu_id":755,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":1,"desc":null,"create_time":"2017-09-26T06:40:56.000Z","modify_time":"2017-09-26T06:40:56.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":771,"authority_name":"管理权限"},{"id":773,"menu_code":"SIMULATE_LIST","menu_name":"仿真实验","detail_name":null,"parent_menu_id":555,"menu_type":8,"menu_url_state":"/schoolmanager_simulate/list","sort_num":8,"state":null,"desc":null,"create_time":"2017-09-26T08:41:28.000Z","modify_time":"2019-01-08T22:40:00.000Z","icon":"res-icon-simulate","menu_mode":0,"is_hide":null,"menu_id":773,"authority_name":"仿真实验"},{"id":774,"menu_code":"N_MENU_MESSAGEMGR_INTEGRATION","menu_name":"积分","detail_name":null,"parent_menu_id":753,"menu_type":8,"menu_url_state":"#/messagemgr/integration","sort_num":3,"state":null,"desc":null,"create_time":"2017-09-27T02:58:40.000Z","modify_time":"2017-11-24T08:20:32.000Z","icon":"icon-my-points","menu_mode":0,"is_hide":null,"menu_id":774,"authority_name":"积分"},{"id":775,"menu_code":"WGW_CONTENT_LIST_AUTH","menu_name":"管理权限","detail_name":null,"parent_menu_id":545,"menu_type":8,"menu_url_state":"0","sort_num":null,"state":null,"desc":null,"create_time":"2017-10-11T07:52:23.000Z","modify_time":"2017-10-11T08:02:55.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":775,"authority_name":"管理权限"},{"id":779,"menu_code":"T_CLOUD_ALBUM_CONTROL_SCHOOL","menu_name":"相册操作设置","detail_name":null,"parent_menu_id":639,"menu_type":8,"menu_url_state":"/schoolmanager_album/album_control","sort_num":3,"state":null,"desc":null,"create_time":"2017-10-17T06:19:31.000Z","modify_time":"2017-10-17T08:39:10.000Z","icon":"icon-audit-setting2","menu_mode":0,"is_hide":null,"menu_id":779,"authority_name":"相册操作设置"},{"id":783,"menu_code":"HOME_SCHOOLMGR_ACTIVITY","menu_name":"活动","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/activity/schoolmgrActivity","sort_num":105,"state":null,"desc":null,"create_time":"2017-10-17T08:05:02.000Z","modify_time":"2017-10-17T08:44:24.000Z","icon":"default","menu_mode":2,"is_hide":null,"menu_id":783,"authority_name":"活动"},{"id":786,"menu_code":"HOME_SCHOOLMGR_VOTE","menu_name":"投票","detail_name":null,"parent_menu_id":480,"menu_type":8,"menu_url_state":"/vote/schoolmgrVote","sort_num":107,"state":1,"desc":null,"create_time":"2017-10-17T09:05:16.000Z","modify_time":"2017-10-17T09:05:16.000Z","icon":"default","menu_mode":2,"is_hide":null,"menu_id":786,"authority_name":"投票"},{"id":789,"menu_code":"MYSETTING_BASICINFO","menu_name":"个人信息","detail_name":null,"parent_menu_id":767,"menu_type":8,"menu_url_state":"/my_setting/basicinfo","sort_num":1,"state":null,"desc":null,"create_time":"2017-10-19T10:18:36.000Z","modify_time":"2017-10-19T10:18:50.000Z","icon":"icon-user","menu_mode":0,"is_hide":null,"menu_id":789,"authority_name":"个人信息"},{"id":790,"menu_code":"MYSETTING_INTEGRAL","menu_name":"我的积分","detail_name":null,"parent_menu_id":767,"menu_type":8,"menu_url_state":"/my_setting/integral","sort_num":2,"state":1,"desc":null,"create_time":"2017-10-19T10:20:31.000Z","modify_time":"2017-10-19T10:20:31.000Z","icon":"icon-my-points","menu_mode":0,"is_hide":null,"menu_id":790,"authority_name":"我的积分"},{"id":792,"menu_code":"MYSETTING_SETTING","menu_name":"设置孩子账号","detail_name":null,"parent_menu_id":767,"menu_type":8,"menu_url_state":"/my_setting/setting","sort_num":3,"state":null,"desc":null,"create_time":"2017-10-19T10:24:09.000Z","modify_time":"2017-10-28T09:25:00.000Z","icon":"icon-audit-setting","menu_mode":0,"is_hide":null,"menu_id":792,"authority_name":"设置孩子账号"},{"id":793,"menu_code":"MYSETTING_AMENDWORD","menu_name":"修改密码","detail_name":null,"parent_menu_id":767,"menu_type":8,"menu_url_state":"/my_setting/amendWord","sort_num":4,"state":null,"desc":null,"create_time":"2017-10-19T10:25:07.000Z","modify_time":"2017-10-19T10:33:49.000Z","icon":"icon-modifi-password","menu_mode":0,"is_hide":null,"menu_id":793,"authority_name":"修改密码"},{"id":812,"menu_code":"AUTHORITY_RECIPE","menu_name":"本周食谱管理权限","detail_name":null,"parent_menu_id":599,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":null,"desc":null,"create_time":"2017-10-24T02:35:45.000Z","modify_time":"2017-10-24T02:37:54.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":812,"authority_name":"本周食谱管理权限"},{"id":813,"menu_code":"WGW_CONTENT_LIST_AUTH_ADD","menu_name":"新增权限","detail_name":null,"parent_menu_id":545,"menu_type":8,"menu_url_state":"0","sort_num":null,"state":1,"desc":null,"create_time":"2017-11-27T08:21:26.000Z","modify_time":"2017-11-27T08:21:26.000Z","icon":null,"menu_mode":3,"is_hide":null,"menu_id":813,"authority_name":"新增权限"},{"id":814,"menu_code":"Ｎ_MENU_TEMPLATE_SETTING","menu_name":"模版设置","detail_name":null,"parent_menu_id":623,"menu_type":8,"menu_url_state":"#/template_setting","sort_num":33,"state":null,"desc":null,"create_time":"2018-01-05T02:16:13.000Z","modify_time":"2018-01-05T02:16:50.000Z","icon":"sys-template","menu_mode":0,"is_hide":null,"menu_id":814,"authority_name":"模版设置"},{"id":815,"menu_code":"N_MENU_TEMPLATE","menu_name":"模版","detail_name":null,"parent_menu_id":814,"menu_type":8,"menu_url_state":"#/template_setting/template","sort_num":1,"state":1,"desc":null,"create_time":"2018-01-05T02:17:15.000Z","modify_time":"2018-01-05T02:17:15.000Z","icon":"icon-model","menu_mode":0,"is_hide":null,"menu_id":815,"authority_name":"模版"},{"id":816,"menu_code":"T_CLOUD_ABSENCE","menu_name":"请假出勤","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/absence","sort_num":33,"state":null,"desc":null,"create_time":"2018-07-24T18:50:35.000Z","modify_time":"2018-07-27T08:13:40.000Z","icon":"jxhd-absence","menu_mode":0,"is_hide":null,"menu_id":816,"authority_name":"请假出勤"},{"id":817,"menu_code":"T_CLOUD_ABSENCE_LIST","menu_name":"缺勤列表","detail_name":null,"parent_menu_id":816,"menu_type":8,"menu_url_state":"#/absence/list","sort_num":1,"state":null,"desc":null,"create_time":"2018-07-24T18:57:09.000Z","modify_time":"2018-08-09T22:02:53.000Z","icon":"icon-absence-list","menu_mode":0,"is_hide":null,"menu_id":817,"authority_name":"缺勤列表"},{"id":818,"menu_code":"T_CLOUD_ABSENCE_SETTING","menu_name":"缺勤原因设置","detail_name":null,"parent_menu_id":816,"menu_type":8,"menu_url_state":"#/absence/setting","sort_num":3,"state":null,"desc":null,"create_time":"2018-07-24T18:58:40.000Z","modify_time":"2019-03-31T22:15:44.000Z","icon":"icon-absence-setting","menu_mode":0,"is_hide":null,"menu_id":818,"authority_name":"缺勤原因设置"},{"id":821,"menu_code":"T_CLOUD_ATTENDANCE_RULE","menu_name":"教职工考勤","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/attendanceRule","sort_num":34,"state":null,"desc":null,"create_time":"2018-11-05T02:10:00.000Z","modify_time":"2019-01-26T22:35:34.000Z","icon":"jxhd-attendance_rule","menu_mode":0,"is_hide":null,"menu_id":821,"authority_name":"教职工考勤"},{"id":822,"menu_code":"T_CLOUD_ATTENDANCE_RULE_LIST","menu_name":"规则列表","detail_name":null,"parent_menu_id":821,"menu_type":8,"menu_url_state":"#/attendanceRule/list","sort_num":1,"state":null,"desc":null,"create_time":"2018-11-05T02:13:38.000Z","modify_time":"2019-01-26T22:39:52.000Z","icon":"icon-course-setting","menu_mode":0,"is_hide":null,"menu_id":822,"authority_name":"规则列表"},{"id":825,"menu_code":"T_CLOUD_DORMITORY_ATTENDANCE_DORMITORY_EDIT","menu_name":"宿舍设置","detail_name":null,"parent_menu_id":855,"menu_type":8,"menu_url_state":"#/dormitory_attendance/dormitory_edit","sort_num":1,"state":null,"desc":"","create_time":"2018-11-19T19:00:17.000Z","modify_time":"2019-01-26T22:29:51.000Z","icon":"icon-home-add","menu_mode":0,"is_hide":null,"menu_id":825,"authority_name":"宿舍设置"},{"id":826,"menu_code":"T_CLOUD_DORMITORY_ATTENDANCE_DORMITORY_ALLOCATION","menu_name":"宿舍分配","detail_name":null,"parent_menu_id":855,"menu_type":8,"menu_url_state":"#/dormitory_attendance/dormitory_allocation","sort_num":2,"state":null,"desc":"","create_time":"2018-11-22T05:42:19.000Z","modify_time":"2019-01-26T22:27:57.000Z","icon":"icon-addook-myclassmat","menu_mode":0,"is_hide":null,"menu_id":826,"authority_name":"宿舍分配"},{"id":829,"menu_code":"T_CLOUD_ATTENDANCE_REPORT","menu_name":"数据统计","detail_name":null,"parent_menu_id":821,"menu_type":8,"menu_url_state":"#/attendanceReport/report","sort_num":4,"state":null,"desc":null,"create_time":"2018-12-05T09:25:28.000Z","modify_time":"2019-03-11T18:00:22.000Z","icon":"icon-statistics2","menu_mode":0,"is_hide":null,"menu_id":829,"authority_name":"数据统计"},{"id":830,"menu_code":"T_CLOUD_STUDENT_ATTENDANCE_RULE_LIST","menu_name":"规则列表","detail_name":null,"parent_menu_id":854,"menu_type":8,"menu_url_state":"#/studentAttendanceRule/list","sort_num":1,"state":null,"desc":null,"create_time":"2018-12-23T22:36:57.000Z","modify_time":"2019-05-28T08:29:11.000Z","icon":"icon-course-setting","menu_mode":0,"is_hide":null,"menu_id":830,"authority_name":"规则列表"},{"id":836,"menu_code":"Schmgr_ResSchool","menu_name":"学校资源","detail_name":null,"parent_menu_id":560,"menu_type":8,"menu_url_state":"/schmgr_resschool/list","sort_num":2,"state":null,"desc":"","create_time":"2019-01-10T02:09:21.000Z","modify_time":"2019-06-24T07:47:38.000Z","icon":"icon-school-resource","menu_mode":0,"is_hide":null,"menu_id":836,"authority_name":"学校资源"},{"id":837,"menu_code":"Schmgr_ResArea","menu_name":"区本资源","detail_name":null,"parent_menu_id":560,"menu_type":8,"menu_url_state":"/schmgr_resarea/list","sort_num":3,"state":null,"desc":"","create_time":"2019-01-10T02:12:58.000Z","modify_time":"2019-06-24T07:47:25.000Z","icon":"icon-area-resource","menu_mode":0,"is_hide":null,"menu_id":837,"authority_name":"区本资源"},{"id":846,"menu_code":"T_CLOUD_STATISTICAL_SCHOOL_DATA","menu_name":"校门考勤统计","detail_name":null,"parent_menu_id":856,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance/schooldatastatistical","sort_num":2,"state":null,"desc":"","create_time":"2019-01-16T18:54:59.000Z","modify_time":"2019-01-26T21:55:27.000Z","icon":"icon-primary-school","menu_mode":0,"is_hide":null,"menu_id":846,"authority_name":"校门考勤统计"},{"id":847,"menu_code":"T_CLOUD_STATISTICAL_ATTENDANCE_DATA","menu_name":"宿舍考勤统计","detail_name":null,"parent_menu_id":856,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance/attendancedatastatistical","sort_num":3,"state":null,"desc":"","create_time":"2019-01-16T18:56:35.000Z","modify_time":"2019-01-26T22:00:40.000Z","icon":"icon-edu-department-notice","menu_mode":0,"is_hide":null,"menu_id":847,"authority_name":"宿舍考勤统计"},{"id":848,"menu_code":"T_CLOUD_CARD_DETAIL","menu_name":"考勤明细","detail_name":null,"parent_menu_id":856,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance/studentcarddetail","sort_num":1,"state":null,"desc":"","create_time":"2019-01-16T19:11:20.000Z","modify_time":"2019-08-08T02:54:00.000Z","icon":"icon-review-learning","menu_mode":0,"is_hide":null,"menu_id":848,"authority_name":"考勤明细"},{"id":849,"menu_code":"T_CLOUD_STUDENT_CARD_DETAIL","menu_name":"打卡明细","detail_name":null,"parent_menu_id":821,"menu_type":8,"menu_url_state":"#/schoolmanagerattendance/teachercarddetail","sort_num":2,"state":null,"desc":"","create_time":"2019-01-20T18:53:46.000Z","modify_time":"2019-01-26T22:40:06.000Z","icon":"icon-review-learning","menu_mode":0,"is_hide":null,"menu_id":849,"authority_name":"打卡明细"},{"id":854,"menu_code":"T_CLOUD_STUDENT_ATTENDANCE","menu_name":"考勤设置","detail_name":null,"parent_menu_id":213,"menu_type":8,"menu_url_state":"0","sort_num":1,"state":null,"desc":"","create_time":"2019-01-20T21:52:20.000Z","modify_time":"2019-05-28T08:28:19.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":854,"authority_name":"考勤设置"},{"id":855,"menu_code":"T_CLOUD_DORMITORY","menu_name":"宿舍管理","detail_name":null,"parent_menu_id":213,"menu_type":8,"menu_url_state":"0","sort_num":3,"state":null,"desc":"","create_time":"2019-01-20T21:58:48.000Z","modify_time":"2019-01-20T22:03:50.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":855,"authority_name":"宿舍管理"},{"id":856,"menu_code":"T_CLOUD_STATISTICAL_ATTENDANCE","menu_name":"考勤数据","detail_name":null,"parent_menu_id":213,"menu_type":8,"menu_url_state":"0","sort_num":2,"state":null,"desc":"","create_time":"2019-01-20T22:03:29.000Z","modify_time":"2019-01-20T22:03:29.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":856,"authority_name":"考勤数据"},{"id":859,"menu_code":"TO_CLOUD_SCHOOL_ADVICE","menu_name":"校园建议","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/schooladvice","sort_num":35,"state":null,"desc":"","create_time":"2019-02-14T21:35:51.000Z","modify_time":"2019-02-20T07:16:48.000Z","icon":"jxhd-school_advice","menu_mode":0,"is_hide":null,"menu_id":859,"authority_name":"校园建议"},{"id":860,"menu_code":"TO_CLOUD_SCHOOL_ADVICE_LIST","menu_name":"建议列表","detail_name":null,"parent_menu_id":859,"menu_type":8,"menu_url_state":"#/schooladvice/list","sort_num":1,"state":null,"desc":"","create_time":"2019-02-14T21:37:27.000Z","modify_time":"2019-02-14T21:37:27.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":860,"authority_name":"建议列表"},{"id":861,"menu_code":"TO_CLOUD_SCHOOL_ADVICE_SETTING","menu_name":"建议设置","detail_name":null,"parent_menu_id":859,"menu_type":8,"menu_url_state":"#/schooladvice/setting","sort_num":2,"state":null,"desc":"","create_time":"2019-02-14T21:38:20.000Z","modify_time":"2019-02-14T21:38:20.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":861,"authority_name":"建议设置"},{"id":862,"menu_code":"T_CLOUD_ATTENDANCE_VACATE_LIST","menu_name":"请假列表","detail_name":null,"parent_menu_id":821,"menu_type":8,"menu_url_state":"#/attendanceVacate/list","sort_num":3,"state":null,"desc":"","create_time":"2019-03-11T18:00:10.000Z","modify_time":"2019-03-11T18:00:10.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":862,"authority_name":"请假列表"},{"id":863,"menu_code":"SchoolMgr_Course_Live","menu_name":"课程直播","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"/school_live","sort_num":36,"state":null,"desc":"","create_time":"2019-03-12T22:02:15.000Z","modify_time":"2019-03-28T00:51:09.000Z","icon":"jxhd_course_live","menu_mode":0,"is_hide":null,"menu_id":863,"authority_name":"课程直播"},{"id":864,"menu_code":"SchoolMgr_Course_List","menu_name":"课程列表","detail_name":null,"parent_menu_id":863,"menu_type":8,"menu_url_state":"/school_live/list","sort_num":1,"state":null,"desc":"","create_time":"2019-03-12T23:03:53.000Z","modify_time":"2019-03-12T23:08:36.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":864,"authority_name":"课程列表"},{"id":865,"menu_code":"T_CLOUD_ABSENCE_VACATELIST","menu_name":"请假列表","detail_name":null,"parent_menu_id":816,"menu_type":8,"menu_url_state":"#/absence/vacateList","sort_num":2,"state":null,"desc":"","create_time":"2019-03-31T22:16:50.000Z","modify_time":"2019-03-31T22:16:50.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":865,"authority_name":"请假列表"},{"id":866,"menu_code":"SchoolManager_Card_Manage","menu_name":"卡号管理","detail_name":null,"parent_menu_id":604,"menu_type":8,"menu_url_state":"/usermgr/card_manage","sort_num":3,"state":null,"desc":"","create_time":"2019-04-21T18:14:17.000Z","modify_time":"2019-04-21T19:54:07.000Z","icon":"icon-user","menu_mode":0,"is_hide":null,"menu_id":866,"authority_name":"卡号管理"},{"id":867,"menu_code":"T_CLOUD_SELF_ENROLLMENT","menu_name":"招生报名","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/selfEnrollment","sort_num":37,"state":null,"desc":"","create_time":"2019-04-21T18:20:56.000Z","modify_time":"2019-04-28T00:18:23.000Z","icon":"jxhd-self-enrollment","menu_mode":0,"is_hide":null,"menu_id":867,"authority_name":"招生报名"},{"id":868,"menu_code":"T_CLOUD_SELF_ENROLLMENT_LIST","menu_name":"招生列表","detail_name":null,"parent_menu_id":867,"menu_type":8,"menu_url_state":"#/selfEnrollment/list","sort_num":1,"state":null,"desc":"","create_time":"2019-04-21T18:22:58.000Z","modify_time":"2019-04-21T18:22:58.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":868,"authority_name":"招生列表"},{"id":869,"menu_code":"T_CLOUD_PRIVACY_NOTICE_LIST","menu_name":"隐私通知","detail_name":null,"parent_menu_id":180,"menu_type":8,"menu_url_state":"#/schoolmanager_notice/privacy_notice_list","sort_num":3,"state":null,"desc":"","create_time":"2019-05-27T07:26:21.000Z","modify_time":"2019-05-27T07:26:21.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":869,"authority_name":"隐私通知"},{"id":876,"menu_code":"T_CLOUD_INFORMATION_COLLECTION","menu_name":"信息采集","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/informationCollection","sort_num":38,"state":null,"desc":"","create_time":"2019-05-29T06:22:10.000Z","modify_time":"2019-05-29T06:22:10.000Z","icon":"jxhd-information_collection","menu_mode":0,"is_hide":null,"menu_id":876,"authority_name":"信息采集"},{"id":877,"menu_code":"T_CLOUD_DATA_COLLECTION_LIST","menu_name":"资料收集","detail_name":null,"parent_menu_id":876,"menu_type":8,"menu_url_state":"#/dataCollection/list","sort_num":2,"state":null,"desc":"","create_time":"2019-05-29T06:24:07.000Z","modify_time":"2019-06-17T01:37:19.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":877,"authority_name":"资料收集"},{"id":878,"menu_code":"TO_CLOUD_SCHOOL_VISIT","menu_name":"校园访客","detail_name":null,"parent_menu_id":477,"menu_type":8,"menu_url_state":"#/visit","sort_num":39,"state":null,"desc":"","create_time":"2019-05-29T07:34:52.000Z","modify_time":"2019-06-13T02:09:05.000Z","icon":"jxhd-visit","menu_mode":0,"is_hide":null,"menu_id":878,"authority_name":"校园访客"},{"id":879,"menu_code":"TO_CLOUD_SCHOOL_VISIT_LIST","menu_name":"访客列表","detail_name":null,"parent_menu_id":878,"menu_type":8,"menu_url_state":"#/visit/list","sort_num":1,"state":null,"desc":"","create_time":"2019-05-29T07:35:50.000Z","modify_time":"2019-05-29T07:35:50.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":879,"authority_name":"访客列表"},{"id":880,"menu_code":"TO_CLOUD_SCHOOL_VISIT_SETTING","menu_name":"预约设置","detail_name":null,"parent_menu_id":878,"menu_type":8,"menu_url_state":"#/visit/setting","sort_num":2,"state":null,"desc":"","create_time":"2019-05-29T07:36:44.000Z","modify_time":"2019-05-29T07:36:44.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":880,"authority_name":"预约设置"},{"id":883,"menu_code":"T_CLOUD_ATTENDANCE_ADNORMAL_LIST","menu_name":"异常考勤申请列表","detail_name":null,"parent_menu_id":821,"menu_type":8,"menu_url_state":"#/attendanceAdnormal/list","sort_num":3,"state":null,"desc":"","create_time":"2019-06-05T03:29:06.000Z","modify_time":"2019-06-05T03:29:06.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":883,"authority_name":"异常考勤申请列表"},{"id":886,"menu_code":"T_CLOUD_DATA_COLLECTION_ADD","menu_name":"发起收集","detail_name":null,"parent_menu_id":876,"menu_type":8,"menu_url_state":"#/dataCollection/add/-1","sort_num":1,"state":null,"desc":"","create_time":"2019-06-17T01:36:31.000Z","modify_time":"2019-06-17T01:44:57.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":886,"authority_name":"发起收集"},{"id":895,"menu_code":"Schmgr_Res_Class_List","menu_name":"班级资源","detail_name":null,"parent_menu_id":560,"menu_type":8,"menu_url_state":"/schmgr_resclass/list","sort_num":1,"state":null,"desc":"","create_time":"2019-06-24T07:47:05.000Z","modify_time":"2019-06-24T07:47:50.000Z","icon":"icon-local-resource2","menu_mode":0,"is_hide":null,"menu_id":895,"authority_name":"班级资源"},{"id":896,"menu_code":"Schmgr_School_Bus_Attendance_Bus_Manage","menu_name":"校车管理","detail_name":null,"parent_menu_id":213,"menu_type":8,"menu_url_state":"0","sort_num":4,"state":null,"desc":"","create_time":"2019-07-15T05:38:21.000Z","modify_time":"2019-07-15T05:38:21.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":896,"authority_name":"校车管理"},{"id":897,"menu_code":"Schmgr_School_Bus_Attendance_Bus_Info_List","menu_name":"校车列表","detail_name":null,"parent_menu_id":896,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten/bus_info","sort_num":2,"state":null,"desc":"","create_time":"2019-07-15T05:41:03.000Z","modify_time":"2019-07-23T03:12:21.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":897,"authority_name":"校车列表"},{"id":898,"menu_code":"Schmgr_School_Bus_Attendance_Bus_Allocation_List","menu_name":"校车分配","detail_name":null,"parent_menu_id":896,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten/bus_allocation","sort_num":3,"state":null,"desc":"","create_time":"2019-07-15T05:56:17.000Z","modify_time":"2019-10-18T09:47:37.000Z","icon":"icon-addook-myclassmat","menu_mode":0,"is_hide":null,"menu_id":898,"authority_name":"校车分配"},{"id":899,"menu_code":"Schmgr_Schoolbus_Attendance_Stats","menu_name":"校车考勤统计","detail_name":null,"parent_menu_id":856,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten/stats","sort_num":4,"state":null,"desc":"","create_time":"2019-07-17T09:03:04.000Z","modify_time":"2019-07-17T09:03:04.000Z","icon":"icon-statistics2","menu_mode":0,"is_hide":null,"menu_id":899,"authority_name":"校车考勤统计"},{"id":903,"menu_code":"Schmgr_School_Bus_Attendance_Bus_Line_List","menu_name":"线路列表","detail_name":null,"parent_menu_id":896,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten/bus_line","sort_num":1,"state":null,"desc":"","create_time":"2019-07-23T03:10:02.000Z","modify_time":"2019-07-23T03:10:02.000Z","icon":"icon-menu-notice-list","menu_mode":0,"is_hide":null,"menu_id":903,"authority_name":"线路列表"},{"id":907,"menu_code":"schmgr_schbus_atten_test","menu_name":"测试菜单1748","detail_name":null,"parent_menu_id":896,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten_test","sort_num":10,"state":null,"desc":"","create_time":"2019-10-18T09:50:08.000Z","modify_time":"2019-10-18T09:50:08.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":907,"authority_name":"测试菜单1748"},{"id":908,"menu_code":"schmgr_schbus_atten_test","menu_name":"测试菜单1750","detail_name":null,"parent_menu_id":907,"menu_type":8,"menu_url_state":"/schmgr_schbus_atten_test","sort_num":1,"state":null,"desc":"","create_time":"2019-10-18T09:51:14.000Z","modify_time":"2019-10-18T09:51:14.000Z","icon":"","menu_mode":0,"is_hide":null,"menu_id":908,"authority_name":"测试菜单1750"}];

console.log(flatToTree(arr10181807,'menu_id','parent_menu_id','children',213));
