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
  }
];

let topLevelNodes = getTopLevelNodes(arr201910231,'id','parentId','node');
console.log(topLevelNodes);
