var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');

http.createServer(function (req,res) {
  let pathname = url.parse(req.url,true).pathname;
  console.log(pathname);

  fs.readFile('.'+pathname,function (error,data) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if (error) {
      console.error(error);
      res.write(util.inspect(error));
      res.end();
    } else {
      res.write(data.toString());
      res.end();
    }
  });

}).listen(9000);

console.log('server is running on http://localhost:9000');
