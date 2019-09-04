var mysql = require('mysql');
var config = require('./../config.js');
var mysqlConnect = function () {
  return mysql.createConnection(config.mysql);
};

module.exports = {
  add: function (req,res) {
    console.log(req.body);

    let mysqlLink = mysqlConnect();

    mysqlLink.connect();

    let sql = 'INSERT INTO posts(title,summary,content,author,updateTime) VALUES(?,?,?,?,?)';

    let title = req.body.title;
    let summary = req.body.summary;
    let content = req.body.content;
    let author = req.body.author;
    let updateTime = Date.now();

    let sqlParams = [title,summary,content,author,updateTime];

    mysqlLink.query(sql,sqlParams,function (error,result) {
      if (error) {
        console.error(error);

        res.json({
          status: false,
          resmsg: '添加失败',
          data: null
        });

      } else {
        console.log(result);

        res.json({
          status: true,
          resmsg: '添加成功',
          data: true
        });

      }
    });

    mysqlLink.end();

  },
  list: function (req,res) {
    console.log(req.body);

    let mysqlLink = mysqlConnect();

    mysqlLink.connect();

    let sql = 'SELECT * FROM posts';
    let sqlParams = [];

    mysqlLink.query(sql,sqlParams,function (error,result) {

      if (error) {
        console.error(error);

        res.json({
          status: false,
          resmsg: '列表失败',
          data: null
        });

      } else {
        console.log(result);

        res.json({
          status: true,
          resmsg: 'ok',
          data: result
        });

      }

    });

    mysqlLink.end();

  },
  getDetail: function (req,res) {
    console.log(req.params);

    let mysqlLink = mysqlConnect();

    mysqlLink.connect();

    let sql = 'SELECT * FROM posts WHERE id = ?';
    let sqlParams = [req.params.id];

    mysqlLink.query(sql,sqlParams,function (error,result) {
      if (error) {
        console.error(error);

        res.json({
          status: false,
          resmsg: '获取文章详情失败',
          data: null
        });

      } else {
        console.log(result);

        if (result.length > 0) {

          res.json({
            status: true,
            resmsg: 'ok',
            data: result
          });

        } else {

          res.json({
            status: false,
            resmsg: '文章不存在',
            data: []
          });

        }

      }
    });

    mysqlLink.end();

  },
  edit: function (req,res) {
    console.log(req.body);

    let mysqlLink = mysqlConnect();

    mysqlLink.connect();

    let sql = 'UPDATE posts SET title=?, summary=?, content=?, author=? WHERE id=?';

    let title = req.body.title;
    let summary = req.body.summary;
    let content = req.body.content;
    let author = req.body.author;
    let id = req.body.id;

    let sqlParams = [title,summary,content,author,id];

    mysqlLink.query(sql,sqlParams,function (error,result) {
      if (error) {
        console.error(error);

        res.json({
          status: false,
          resmsg: '编辑失败',
          data: null
        });

      } else {
        console.log(result);

        res.json({
          status: true,
          resmsg: 'ok',
          data: true
        });

      }
    });

    mysqlLink.end();

  },
  del: function (req,res) {
    console.log(req.body);

    let mysqlLink = mysqlConnect();

    mysqlLink.connect();

    let sql = 'DELETE FROM posts WHERE id=?';
    let sqlParams = [req.body.id];

    mysqlLink.query(sql,sqlParams,function (error,result) {
      if (error) {
        console.error(error);

        res.json({
          status: false,
          resmsg: '删除失败',
          data: null
        });

      } else {
        console.log(result);

        res.json({
          status: true,
          resmsg: 'ok',
          data: true
        });

      }
    });

    mysqlLink.end();

  },
};
