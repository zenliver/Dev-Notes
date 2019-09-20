var async = require('async');

let arr = [10,20,30,40];
async.map(
  arr,
  function (item,cb) {
    console.log(item);
    item ++;
    console.log(item);
    cb(null,item);
  },
  function (error,result) {
    if (error) {
      console.log('发生了异常：');
      console.log(error);
    } else {
      console.log(result);
    }
  }
);
