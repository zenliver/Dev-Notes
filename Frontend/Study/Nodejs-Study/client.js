var http = require('http');

let options = {
  host: 'localhost',
  port: '9000',
  path: '/test.html'
};

let callback = function (res) {
  let data = '';

  res.on('data',function (chunk) {
    data += chunk;
  });

  res.on('end',function () {
    console.log(data);
  });

};

http.request(options,callback).end();
