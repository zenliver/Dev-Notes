console.log('My First Nodejs App');

var http = require('http');

http.createServer(function (request,response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World');
}).listen(8888);

console.log('Server is running at http://localhost:8888');

var fs = require('fs');

// 同步读取方式（阻塞）
let content = fs.readFileSync('./file.txt');
console.log(content);
console.log(content.toString());
console.log('文件读取完成');

// 异步读取方式（非阻塞）
fs.readFile('./file2.txt',function (error,data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data.toString());
  }
});
console.log('文件读取完成');

var events = require('events');
var event = new events.EventEmitter();

event.on('testEvent',function () {
  console.log('testEvent已触发');
});

setTimeout(function () {
  event.emit('testEvent');
},2000);


event.on('testEvent2',function (arg1,arg2) {
  console.log('listener1',arg1,arg2);
});

event.on('testEvent2',function (arg1,arg2) {
  console.log('listener2',arg1,arg2);
});

event.emit('testEvent2','aaa','bbb');

event.on('error',function () {
  console.log('捕获到错误\n');
});

event.emit('error'); // 'error' 是一个特殊的事件，表示程序运行异常
