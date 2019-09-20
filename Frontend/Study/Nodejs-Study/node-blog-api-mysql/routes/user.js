// node-blog-api-mysql - 用户模块路由
var express = require('express');
var router = express.Router();
var userCtrl = require('./../controllers/userCtrl.js');

router.post('/register',function (req,res) {
  userCtrl.register(req,res);
});

module.exports = router;
