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

let arr201910231 = [
  {
    id: 1,
    parentId: 0
  },
  {
    id: 2,
    parentId: 100
  },
  {
    id: 3,
    parentId: null
  },
  {
    id: 4,
    parentId: 3
  },
  {
    id: 5,
    parentId: 4
  },
  {
    id: 6,
    parentId: 5
  },
  {
    id: 7,
    parentId: 5
  }
];

let topLevelNodes = getTopLevelNodes(arr201910231,'id','parentId','node');
console.log(topLevelNodes);


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

let node201910241 = arr201910231[2];

let allChildrenNodes = getAllChildrenNodes(JSON.parse(JSON.stringify(arr201910231)),'id','parentId',node201910241);

console.log(allChildrenNodes);


let arr201911081 = [1,2,3,4,5,6];
arr201911081.forEach(function (item) {
  console.log(item);
  if (item > 3) {
    return ;
  }
});

let scrollEl = document.getElementById('scroll');
let scrollEl1 = document.getElementById('scroll1');
let scrollEl2 = document.getElementById('scroll2');

for (var i = 0; i < 10; i++) {
  let item = document.createElement('p');

  function plusA(str,times) {
    let strNew = '';

    for (var i = 0; i < times; i++) {
      strNew += str;
    }

    return strNew;
  }

  item.innerHTML = plusA('a',i);

  scrollEl1.appendChild(item);
}

scrollEl2.innerHTML = scrollEl1.innerHTML;

let scrollDistance = 0;

window.setInterval(function () {
  console.log(scrollEl.scrollTop);
  scrollDistance += 1;

  if (scrollDistance >= (scrollEl1.scrollHeight)) {
    scrollDistance = 0;
  }

  scrollEl.scrollTop = scrollDistance;
},100);
