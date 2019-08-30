var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var util = require('util');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/upload/'}).array('image'));
app.use(cookieParser());


app.get('/',function (req,res) {
  res.send('首页');
});

// 响应get请求
app.get('/hello_world',function (req,res) {
  console.log(req.path);
  console.log(req.params);
  console.log(req.query);
  console.log(req.get('Cookie'));
  console.log(req.get('User-Agent'));

  res.append('Access-Control-Allow-Origin','*');

  res.json({
    data: {
      a: 111
    },
    status: true
  });

  // res.send('Hello World');
});

// get方式提交表单
app.get('/submit_form_get',function (req,res) {
  console.log(req.query);

  let response = {
    name: req.query.name,
    mobile: req.query.mobile
  }

  res.json(response);

});

// post方式提交表单
app.post('/submit_form_post',urlencodedParser,function (req,res) {
  console.log(req.query);
  console.log(req.body);

  let response = {
    data: {
      name: req.body.name,
      mobile: req.body.mobile
    },
    resmsg: '提交成功',
    status: true
  }

  res.json(response);

});

// 文件上传
app.post('/upload_file',function (req,res) {
  console.log(req.body);
  console.log(req.cookies);
  res.send('上传成功');
});

// RESTAPI测试

// 获取用户列表
app.get('/user_list',function (req,res) {
  fs.readFile('./data/users.json',function (error,data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data.toString());

      res.json(JSON.parse(data.toString()));
    }
  });
});

// 添加用户
app.post('/add_user',function (req,res) {
  console.log(req.body);

  let newUser = {
    name: 'LiJun',
    password: '123',
    profession: 'programmer',
    id: 4
  };

  fs.readFile('./data/users.json','utf8',function (error,data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      console.log(typeof data);

      let dataObj = JSON.parse(data);

      dataObj.user4 = newUser;

      res.json(dataObj);
    }
  });

});

// 删除用户
app.post('/del_user',function (req,res) {
  console.log(req.body);

  fs.readFile('./data/users.json',function (error,data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data.toString());

      let dataObj = JSON.parse(data.toString());
      delete dataObj.user3;

      res.json(dataObj);

    }
  });

});

// 获取用户详情
app.get('/user_detail/:id',function (req,res) {
  console.log(req.query);
  console.log(req.params);

  let id = req.params.id;

  fs.readFile('./data/users.json','utf8',function (error,data) {
    let dataObj = JSON.parse(data);

    let userData = dataObj['user'+id];

    res.json(userData);

  });

});

var server = app.listen(9001,function () {
  // console.log(server.address());

  let host = server.address().address;
  let port = server.address().port;
  console.log('express app is running on http://localhost:9001');

});
