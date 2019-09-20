// node-blog-api-mysql - 用户模块控制器
var sequelize = require('sequelize');
var sequelizeInit = require('./../sequelizeInit.js');

module.exports = {
  register: function (req,res) {

    let sequelizeLink = sequelizeInit();

    // sequelize.authenticate().then(function (result) {
    //   console.log(result);
    //
    //   res.json({
    //     status: false,
    //     resmsg: '注册失败'
    //   });
    //
    // }).catch(function (error) {
    //   console.log(error);
    //
    //   res.json({
    //     status: false,
    //     resmsg: '注册失败'
    //   });
    //
    // });

    let user = sequelizeLink.define(
      'user',
      {
        id: {
          type: sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        account: {
          type: sequelize.STRING,
          allowNull: false,
          unique: true
        },
        name: {
          type: sequelize.STRING,
          allowNull: true
        },
        password: {
          type: sequelize.STRING,
          allowNull: false
        }
      },
      {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'createTime',
        updatedAt: 'updateTime',
      }
    );

    user.sync({
      force: true
    }).then(function (result) {
      console.log(result);
    }).catch(function (error) {
      console.log(error);
    });

    // user.create({
    //   account: 'aaa',
    //   name: 'AAA',
    //   password: '123456'
    // }).then(function (result) {
    //   console.log(result);
    //
    //   res.json({
    //     status: true,
    //     resmsg: '注册成功',
    //     data: true
    //   });
    // }).catch(function (error) {
    //   console.log(error);
    //
    //   res.json({
    //     status: false,
    //     resmsg: '注册失败',
    //     data: false
    //   });
    // });

  },
};
