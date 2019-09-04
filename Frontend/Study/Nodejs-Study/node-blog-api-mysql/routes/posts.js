var express = require('express');
var router = express.Router();
var postsCtrl = require('./../controllers/postsCtrl.js');

router.post('/add',function (req,res) {
  postsCtrl.add(req,res);
});

router.get('/list',function (req,res) {
  postsCtrl.list(req,res);
});

router.get('/detail/:id',function (req,res) {
  postsCtrl.getDetail(req,res);
});

router.post('/edit',function (req,res) {
  postsCtrl.edit(req,res);
});

router.post('/del',function (req,res) {
  postsCtrl.del(req,res);
});

module.exports = router;
