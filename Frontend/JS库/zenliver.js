/*
  个人收集整理的常用工具函数
  ver: 20190731
*/


// 时间戳转日期时间字符串

// time: 待转换的时间戳
// format: 日期时间格式字符串，完整的格式为 'yyyy-MM-dd HH:mm:ss'（这里的 '-' 和 ':' 可以换成任意字符串）
function timestampToDate(time,format) {

  Date.prototype.Format = function (fmt) { //author: meizz

    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
       /* "h+": this.getHours(), //小时 */
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  let date = new Date(time);
  return date.Format(format);

}


// 日期时间字符串转时间戳

// date: 日期时间字符串，完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'
function dateToTimestamp(date) {
  return (new Date(Date.parse(date.replace(/-/g,"/")))).getTime();
}


// 日期时间字符串转星期

// date: 日期时间字符串，完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'
// type: 星期从哪一天开始，String，取值为：'sunday'（星期从周日开始）、'monday'（星期从周一开始）
function dateToWeek(date,type) {

  let dateObj = new Date(date);
  let day = dateObj.getDay();
  let dateTime = dateToTimestamp(date);

  if (type === 'sunday') {
    let sunday = timestampToDate(dateTime-(day-0)*24*60*60*1000,'yyyy-MM-dd');
    let saturday = timestampToDate(dateTime+(6-day)*24*60*60*1000,'yyyy-MM-dd');
    return {
      start: sunday,
      end: saturday
    };
  }

  if (type === 'monday') {
    let monday = timestampToDate(dateTime-(day-1)*24*60*60*1000,'yyyy-MM-dd');
    let sunday = timestampToDate(dateTime+(7-day)*24*60*60*1000,'yyyy-MM-dd');
    return {
      start: monday,
      end: sunday
    };
  }

}


// 根据指定日期时间字符串获取下月或上月的月份

// date: 日期时间字符串，完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'
// type: 获取类型，String，取值为 'next'（下个月） 或 'prev'（上个月）
// format: 日期时间格式字符串，完整的格式为 'yyyy-MM-dd HH:mm:ss'
function getPrevNextMonth(date,type,format) {

  let dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let nextYear = null;
  let nextMonth = null;
  let prevYear = null;
  let prevMonth = null;

  if (type === 'next') {

    if (month <= 10) {
      nextMonth = month + 1;
      nextYear = year;
    } else {
      nextMonth = 0;
      nextYear = year + 1;
    }

  }

  if (type === 'prev') {

    if (month >= 1) {
      prevMonth = month - 1;
      prevYear = year;
    } else {
      prevMonth = 11;
      prevYear = year - 1;
    }

  }

  let dateObjNew = new Date();

  if (type === 'next') {
    dateObjNew.setFullYear(nextYear);
    dateObjNew.setMonth(nextMonth);
  }

  if (type === 'prev') {
    dateObjNew.setFullYear(prevYear);
    dateObjNew.setMonth(prevMonth);
  }

  return timestampToDate(dateObjNew.getTime(),format);

}


// 判断一个DOM元素是否是另一个元素的子元素

// obj: 要判断的DOM对象
// parentObj: 另一个DOM对象，是或不是obj的父元素
function isParent(obj,parentObj) {
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
        if (obj == parentObj) {
            return true;
        }
        obj = obj.parentNode;
    }

    return false;
}


// 获取url中的单个查询参数

// url: 待处理的url，String，如果是获取当前页面的则传 window.location.href 即可
// paramName: 需获取的参数名，String
function getQueryParam(url,paramName) {

  var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
  var firstQueryIndex = url.indexOf('?');
  var queryString = url.slice(firstQueryIndex+1); // 获取完整的查询字符串（不包括 ?）
  var result = queryString.match(reg);

  if (result !== null) {
    return decodeURIComponent(result[2]);
  } else {
    return null;
  }

}


// 获取url中的所有查询参数（返回参数对象）

// url: 待处理的url，String，如果是获取当前页面的则传 window.location.href 即可
function getQueryParams(url) {
  var params = {};

  var firstQueryIndex = url.indexOf('?');

  if (firstQueryIndex >= 0) { // url中有问号

    var queryString = url.slice(firstQueryIndex+1); // 获取完整的查询字符串（不包括 ?）

    if (queryString.length > 0) { // 存在查询参数（但参数不一定都有值）
      var paramsPairs = queryString.split('&');
      console.log(paramsPairs);

      for (var i=0; i<paramsPairs.length; i++) {
        var paramsArr = paramsPairs[i].split('=');

        var name = decodeURIComponent(paramsArr[0]);
        var value = paramsArr[1] !== undefined ? decodeURIComponent(paramsArr[1]) : null; // 判断参数是否有值

        params[name] = value;
      }

    } else { // 不存在查询参数
      params = null;
    }

  } else { // url中没有问号
    params = null;
  }

  return params;
}


// 生成随机字符串（伪随机，用于对安全性要求不高的场景）

// len: 生成的随机字符串的长度（Number，可不传，默认为32）
function randomStr(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　  return pwd;
}


// 将 'data:' 格式的图片（base64数据）转换为blob对象（转换后可输出blob对象，获取图片大小等信息，还可用于文件上传）

// dataUrl: 图片的 'data:' 格式的url（base64数据）
function base64ToBlob(dataUrl) {
  var arr = dataUrl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
  // 去掉url的头，并转化为byte
  var bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  var ia = new Uint8Array(ab);

  for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: mime
  });
}
