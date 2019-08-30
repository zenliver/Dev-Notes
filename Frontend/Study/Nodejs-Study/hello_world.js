var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var router = require('./router.js');

exports.helloWorld = function () {
  console.log('Hello World!');
};

exports.startServer = function () {

  var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '姓名： <input name="name"><br>' +
  '手机号码： <input name="mobile"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

  http.createServer(function (req,res) {
    console.log(req.url);
    console.log(url.parse(req.url,true));

    router.route(url.parse(req.url,true).pathname);

    let queryParams = url.parse(req.url,true).query;

    let postData = '';
    req.on('data',function (chunk) {
      postData += chunk;
    });

    req.on('end',function () {
      postData = querystring.parse(postData);
      console.log('服务端接收到的POST请求数据：');
      console.log(postData);

      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      // res.write(util.inspect(url.parse(req.url,true)),true,null,true);

      if (postData.name && postData.mobile) {
        res.write('姓名：'+postData.name+'\n');
        res.write('手机号码：'+postData.mobile);
      } else {
        res.write(postHTML);
      }

      res.end();

    });

  }).listen(8889);

  console.log('server is running on http://localhost:8889');
};
