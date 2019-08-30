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
// console.log(content);
// console.log(content.toString());
console.log('文件读取完成');

// 异步读取方式（非阻塞）
fs.readFile('./file.txt',function (error,data) {
  if (error) {
    console.error(error);
  } else {
    // console.log(data.toString());
  }
});
console.log('文件读取完成');

var events = require('events');
var event = new events.EventEmitter();

event.on('testEvent',function () {
  // console.log('testEvent已触发');
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

// event.on('error',function () {
//   console.log('捕获到错误\n');
// });

// event.emit('error'); // 'error' 是一个特殊的事件，表示程序运行异常

let str1 = Buffer.from('test','ascii');
console.log(str1.toString('base64'));

var readStreamData = '';
var readStream = fs.createReadStream('./file.txt');
readStream.setEncoding('UTF8');

readStream.on('data',function (chunk) { // 开始有数据返回时
  // console.log(chunk);
  readStreamData += chunk;
});

readStream.on('end',function () { // 数据读取结束
  console.log(readStreamData);
  console.log('文件读取完成');
});

var writeData = '这是待写入文件的内容';
var writeStream = fs.createWriteStream('./output.txt');
writeStream.write(writeData,'UTF8');
writeStream.end();
writeStream.on('finish',function () {
  console.log('文件写入完成');
});

var readStream2 = fs.createReadStream('./file.txt');
var writeStream2 = fs.createWriteStream('./output2.txt');
readStream2.pipe(writeStream2);

let helloWorld = require('./hello_world.js');
console.log(helloWorld);
console.log(helloWorld.helloWorld.toString());
helloWorld.helloWorld();
helloWorld.startServer();

let helloWorld2 = require('./hello_world2.js');
console.log(helloWorld2);
console.log(helloWorld2.toString());
helloWorld2();

// console.log(global);
console.log(__filename);
console.log(global.__filename);
console.log(__dirname);

let timer1 = setTimeout(function () {
  console.log('setTimeout执行');
},2000);

clearTimeout(timer1);

let num = 0;
let timer2 = setInterval(function () {
  if (num === 3) {
    clearInterval(timer2);
    return ;
  }
  console.log('setInterval执行');
  num ++;
},1000);

fs.open('./file.txt','r+',function (error,data) {
  if (error) {
    console.error(error);
  } else {
    console.log('fs.open: ');
    console.log(data);
    console.log('===========');
  }
});

fs.stat('./file.txt',function (error,stat) {
  if (error) {
    console.error(error);
  } else {
    console.log(stat);
    console.log('是否为文件？'+stat.isFile());
    console.log('是否为目录？'+stat.isDirectory());
  }
});

fs.writeFile('./file2.txt','这里是通过 fs.writeFile 写入的内容',function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log('fs.writeFile 写入内容成功');

    console.log('读取写入的内容');

    fs.readFile('./file2.txt',function (error,data) {
      if (error) {
        console.error(error);
      } else {
        // console.log(data);
        console.log('fs.writeFile 写入的内容：'+data.toString());

        fs.unlink('./file2.txt',function (error) {
          if (error) {
            console.error(error);
          } else {
            console.log('file2.txt 删除成功');
          }
        });

      }
    });


  }
});

fs.mkdir('./test',function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log('test目录创建成功');

    console.log('新建文件');

    fs.mkdir('./test/tmp',function (error) {
      if (error) {
        console.error(error);
      } else {
        console.log('tmp目录创建成功');
      }
    });

    fs.writeFile('./test/1.txt','1.txt',function (error) {
      if (error) {
        console.error(error);
      } else {
        console.log('1.txt 创建/写入成功');

        console.log('读取新创建的test目录');

        fs.readdir('./test',function (error,files) {
          if (error) {
            console.error(error);
          } else {
            console.log(files);

            files.forEach(function (file) {
              console.log(file);
            });

            fs.rmdir('./test/tmp',function (error) {
              if (error) {
                console.error(error);
              } else {
                console.log('tmp目录删除成功');
              }
            });

            fs.unlink('./test/1.txt',function (error) {
              if (error) {
                console.error(error);
              } else {
                console.log('1.txt删除成功');
              }
            });

            fs.rmdir('./test',function (error) {
              if (error) {
                console.error(error);
              } else {
                console.log('test目录删除成功');
              }
            });

          }
        });

      }
    });

  }
});

var os = require('os');

console.log(os.type());
