var sequelize = require('sequelize');
var config = require('./config.js');

module.exports = function () {
  return new sequelize(config.mysql.database,config.mysql.user,config.mysql.password,{
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  });
};
