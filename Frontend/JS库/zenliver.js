/*
  个人收集整理的常用工具函数
  ver: 20191023
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


// 获取扁平数组中所有顶级节点（返回数组）

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


// 扁平数组转换为树形数组

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


// 扁平数组转换为树形数组（增强版）

// 此函数依赖另两个函数：getTopLevelNodes()、flatToTree()

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


// 树形数组转换为扁平数组

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


// 获取扁平数组中某一节点的所有父级节点（追朔到根节点，返回数组）

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


// 获取扁平数组中某一节点的所有子级节点（延展到最后一级叶子节点，返回数组）

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
