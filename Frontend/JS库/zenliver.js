/*
  个人JS工具函数库
  ver: 20191216
*/


/* 时间戳转日期时间字符串 */

// 返回：转换后的日期时间字符串

// 参数：
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


/* 日期时间字符串转时间戳 */

// 返回：转换后的时间戳（Number）

// 参数：
// date: 日期时间字符串，完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'
function dateToTimestamp(date) {
  return (new Date(Date.parse(date.replace(/-/g,"/")))).getTime();
}


/* 日期时间字符串或时间戳转星期几字符串 */

// 返回：格式如 '周几' 、'星期几' 的字符串

// 参数：
// date: 日期时间字符串（String）或时间戳（Number）
// dayTextPrefix: 表示星期几或周几的字符串前缀，String，一般为：'周'、'星期'
function dateToDay(date,dayTextPrefix) {

  var transObj = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  };

  var day = new Date(date).getDay();

  return dayTextPrefix+transObj[day];
}


/* 根据指定日期（日期时间字符串或时间戳）获取其所属星期的起止日期 */
// 注意：本函数依赖另两个函数：dateToTimestamp()、timestampToDate()

// 返回：指定日期所属星期的起止日期对象（起止日属性值均为日期时间字符串）

// 参数：
// date: 指定日期的日期时间字符串（完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'）或时间戳（Number）
// startDay: 星期从哪一天开始，String，取值为：'sunday'（星期从周日开始）、'monday'（星期从周一开始）
function dateToWeek(date,startDay) {

  let dateObj = new Date(date);
  let day = dateObj.getDay();
  let dateTime = null;

  if (date.constructor === String) { // date是日期时间字符串
    dateTime = dateToTimestamp(date);
  } else { // date是时间戳
    dateTime = date;
  }

  if (startDay === 'sunday') {
    let sunday = timestampToDate(dateTime-(day-0)*24*60*60*1000,'yyyy-MM-dd');
    let saturday = timestampToDate(dateTime+(6-day)*24*60*60*1000,'yyyy-MM-dd');
    return {
      start: sunday,
      end: saturday
    };
  }

  if (startDay === 'monday') {
    let monday = timestampToDate(dateTime-(day-1)*24*60*60*1000,'yyyy-MM-dd');
    let sunday = timestampToDate(dateTime+(7-day)*24*60*60*1000,'yyyy-MM-dd');
    return {
      start: monday,
      end: sunday
    };
  }

}


/* 根据指定日期（日期时间字符串或时间戳）获取下个月或上个月的月份 */
// 注意：本函数依赖另一个函数：timestampToDate()

// 返回：指定日期的下个月或上个月的月份（日期时间字符串）

// 参数：
// date: 指定日期的日期时间字符串（完整的格式为 '2019-07-03 10:05:20' 或 '2019/07/03 10:05:20'）或时间戳（Number）
// type: 获取类型，String，取值为 'next'（下个月） 或 'prev'（上个月）
// returnFormat: 返回的月份的日期时间格式字符串，完整的格式为 'yyyy-MM-dd HH:mm:ss'
function getPrevNextMonth(date,type,returnFormat) {

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

  return timestampToDate(dateObjNew.getTime(),returnFormat);

}


/* 将指定时间转换为相对于当前时间的描述性字符串 */

// 返回：相对于当前时间的描述性字符串

// 参数：
// time: 待转换的时间，格式仅限时间戳，Number
// curTime: 当前时间的时间戳，Number
// type: 转换类型，String，取值为：'dayDesc' 日期描述型(如：今天、明天、后天)
function getRelativeTime(time,curTime,type) {

  if (type === 'dayDesc') { // 日期描述型

    let date = this.timestampToDate(time,'yyyy-MM-dd');
    let dateTime = this.dateToTimestamp(date+' 00:00:00');
    let curDate = this.timestampToDate(curTime,'yyyy-MM-dd');
    let curDateTime = this.dateToTimestamp(curDate+' 00:00:00');
    let minusVal = dateTime - curDateTime;
    let oneDayTime = 24*60*60*1000;

    switch (minusVal) {
      case -oneDayTime:
        return '昨天';
        break;
      case -(oneDayTime*2):
        return '前天';
        break;
      case 0:
        return '今天';
        break;
      case oneDayTime:
        return '明天';
        break;
      case oneDayTime*2:
        return '后天';
        break;
      default:
        return '';
    }

  }

}


/* 判断一个DOM元素是否是另一个元素的子元素 */

// 返回：Boolean（true 是，false 不是）

// 参数：
// obj: 一个DOM对象
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


/* 获取url中单个查询参数的值 */

// 返回：某个参数的值（字符串）

// 参数：
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


/* 获取url中的所有查询参数的值 */

// 返回：所有参数对象

// 参数：
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


/* 去除简单数组（由字符串或数字组成的一维数组）中重复的元素 */

// 返回：一个新的不重复的简单数组

// 参数：
// arr: 有重复元素的简单数组
function removeDuplicatesOfSimpleArray(arr) {

  var noDuplicatesArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (noDuplicatesArr.indexOf(arr[i]) < 0) {
      noDuplicatesArr.push(arr[i]);
    }
  }

  return noDuplicatesArr;

}


/* 获取扁平数组中所有顶级节点 */

// 返回：所有顶级节点数组

// 参数：
// flatArr: 待处理的扁平数组，Array
// nodeKey: 每个节点的id属性名，String，常见的如：'id'
// parentNodeKey: 每个节点的父节点的属性名，String，常见的如：'parentId'
// returnType: 返回类型，String，取值为：'node' 返回顶级节点对象数组、'nodeKey' 返回顶级节点id数组、'parentNodeKey' 返回顶级节点的父节点id数组，如果没传则默认返回顶级节点对象数组
function getTopLevelNodes(flatArr,nodeKey,parentNodeKey,returnType) {

  // 判断扁平数组中哪些元素是顶级节点
  // 方法：如果某一节点的 parentId 的值不是任何一个节点的 id 值，就说明这个节点是顶级节点，否则就是普通节点
  // 扁平数组中可能只有一个顶级节点，此时这个顶级节点就是根节点，也可能有多个顶级节点，此时没有根节点

  var nodeKeyArr = [];

  flatArr.forEach(function (item) {
    nodeKeyArr.push(item[nodeKey]);
  });

  var resultArr = [];

  flatArr.forEach(function (item2) {
    if (nodeKeyArr.indexOf(item2[parentNodeKey]) < 0) { // 判断是否是顶级节点

      if (resultArr.indexOf(item2[parentNodeKey]) < 0) { // 过滤重复的

        switch (returnType) { // 判断返回类型
          case 'node':
            resultArr.push(item2);
            break;
          case 'nodeKey':
            resultArr.push(item2[nodeKey]);
            break;
          case 'parentNodeKey':
            resultArr.push(item2[parentNodeKey]);
            break;
          default:
            resultArr.push(item2);
        }

      }

    }
  });

  return resultArr;
}


/* 扁平数组转换为树形数组 */

// 返回：转换后的树形数组

// 参数：
// flatArr: 待处理的扁平数组，Array
// nodeKey: 节点的id属性名，String，常见的如：'id'
// parentNodeKey: 每个节点的父节点的属性名，String，常见的如：'parentId'
// childrenNodeKey: 每个节点的子节点数组的属性名，String，常见的如：'children'
// rootNodeParentKeyValue: 根节点的父节点的id属性值，根据实际的值来传，常见的如：0、null，也可以传一个不是根节点的节点的父节点的id属性值以获取一个【局部的树形数组】
// arrSortFunction: 返回的数组的排序函数，Function，如果传了则按照排序函数对数组及所有子节点进行排序，如果没传或传 null 则不进行排序
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


/* 扁平数组转换为树形数组（增强版） */
// 注意：此函数依赖另两个函数：getTopLevelNodes()、flatToTree()

// 返回：转换后的树形数组

// 参数：
// flatArr: 待处理的扁平数组，Array
// nodeKey: 每个节点的id属性名，String，常见的如：'id'
// parentNodeKey: 每个节点的父节点的属性名，String，常见的如：'parentId'
// childrenNodeKey: 每个节点的子节点数组的属性名，String，常见的如：'children'
// arrSortFunction: 返回的数组的排序函数，Function，如果传了则按照排序函数对数组及所有子节点进行排序，如果没传或传 null 则不进行排序
function flatToTreeEnhance(flatArr,nodeKey,parentNodeKey,childrenNodeKey,arrSortFunction) {

  var flatArrStr = JSON.stringify(flatArr);

  var topLevelNodesParentKeyValues = getTopLevelNodes(JSON.parse(flatArrStr),nodeKey,parentNodeKey);

  console.log(topLevelNodesParentKeyValues);

  var resultArr = [];

  if (topLevelNodesParentKeyValues.length === 1) {

    resultArr = flatToTree(JSON.parse(flatArrStr),nodeKey,parentNodeKey,childrenNodeKey,topLevelNodesParentKeyValues[0],arrSortFunction);

  } else {

    topLevelNodesParentKeyValues.forEach( (value) => {
      var curTreeArr = flatToTree(JSON.parse(flatArrStr),nodeKey,parentNodeKey,childrenNodeKey,value,arrSortFunction);

      resultArr = resultArr.concat(curTreeArr);
    });

  }

  console.log(resultArr);

  return resultArr;
}


/* 树形数组转换为扁平数组 */

// 返回：转换后的扁平数组

// 参数：
// treeArr: 待处理的树形数组，Array
// childrenNodeKey: 每个节点的子节点数组的属性名，String，常见的如：'children'
function treeToFlat(treeArr,childrenNodeKey) {

  var flatArr = [];

  function treeToFlatFunc(arr,childrenKey) {

    for (var i = 0; i < arr.length; i++) {
      flatArr.push(arr[i]);

      if (arr[i][childrenKey]) {
        treeToFlatFunc(arr[i][childrenKey],childrenKey); // 递归调用
      }
    }

  }

  treeToFlatFunc(treeArr,childrenNodeKey);

  // 删除扁平数组中的所有对象的 children 属性
  for (var j = 0; j < flatArr.length; j++) {
    if (flatArr[j][childrenNodeKey]) {
      delete flatArr[j][childrenNodeKey];
    }
  }

  return flatArr;
}


/* 获取扁平数组中某一节点的所有父级节点（追朔到根节点） */

// 返回：某一节点的所有父级节点数组

// 参数：
// flatArr: 待处理的扁平数组，Array
// nodeKey: 每个节点的id属性名，String，常见的如：'id'
// parentNodeKey: 每个节点的父节点的属性名，String，常见的如：'parentId'
// curNode: 当前节点对象，Object
function getAllParentsNodes(flatArr,nodeKey,parentNodeKey,curNode) {

  var allParentsNodes = [];

  function process(arr,key,parentKey,curObj) {
    for (var i = 0; i < arr.length; i++) {

      if (arr[i][key] === curObj[parentKey]) {
        allParentsNodes.push(arr[i]);

        process(arr,key,parentKey,arr[i]); // 递归调用

        break;
      }

    }
  }

  process(flatArr,nodeKey,parentNodeKey,curNode);

  return allParentsNodes;
}


/* 获取扁平数组中某一节点的所有子级节点（延展到最后一级叶子节点） */

// 返回：某一节点的所有子级节点数组

// 参数：
// flatArr: 待处理的扁平数组，Array
// nodeKey: 每个节点的id属性名，String，常见的如：'id'
// parentNodeKey: 每个节点的父节点的属性名，String，常见的如：'parentId'
// curNode: 当前节点对象，Object
function getAllChildrenNodes(flatArr,nodeKey,parentNodeKey,curNode) {

  var allChildrenNodes = [];

  function process(arr,key,parentKey,node) {

    arr.forEach(function (item) {

      if (item[parentKey] === node[key]) {

        allChildrenNodes.push(item);

        // 递归调用
        process(arr,key,parentKey,item);

      }

    });

  }

  process(flatArr,nodeKey,parentNodeKey,curNode);

  return allChildrenNodes;
}


/* 生成随机字符串（伪随机，适用于对安全性要求不高的场景） */

// 返回：一个随机字符串

// 参数：
// length: 生成的随机字符串的长度，Number，可不传，默认为32
function getRandomStr(length) {
  length = length || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = '';

  for (let i = 0; i < length; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
}


/* 将 'data:' 格式的图片（base64数据）转换为blob对象（转换后可输出blob对象，获取图片大小等信息，可用于文件上传） */

// 返回：blob对象

// 参数：
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


/* 从缓存或服务端获取数据（适用于Vue项目） */

// 返回：无

// 参数：
// type: 本地缓存的类型，String，取值为：'sessionStorage'、'localStorage'
// storageKey: 本地缓存中的存储key，String
// dataKey: Vue组件中的data属性名，String
// dataEditCallback: 缓存数据保存之前对数据进行处理的回调，Function
// dataSetCallback: 缓存数据保存之后的回调，Function
// getDataFromServerFunc: 从服务端获取数据的方法，Function
function getDataFromCacheOrServer(type,storageKey,dataKey,dataEditCallback,dataSetCallback,getDataFromServerFunc) {

  let data = window[type][storageKey];

  // 先检查缓存中是否有数据，如果有则读取缓存中的数据，如果没有则从服务端获取

  if (data) { // 缓存中有数据，从缓存读取

    // 数据保存之前对数据进行处理的回调
    if (dataEditCallback && dataEditCallback.constructor === Function) {
      dataEditCallback(data); // 传入data并处理
    }

    // 保存数据
    try { // data 是JSON字符串
      this[dataKey] = JSON.parse(data);
    } catch (e) { // data 是普通字符串
      this[dataKey] = data;
    } finally {

    }

    // 数据保存之后的回调
    if (dataSetCallback && dataSetCallback.constructor === Function) {
      dataSetCallback();
    }

  } else { // 缓存中没有数据，从服务端获取

    if (getDataFromServerFunc && getDataFromServerFunc.constructor === Function) {
      getDataFromServerFunc();
    }

  }

}
