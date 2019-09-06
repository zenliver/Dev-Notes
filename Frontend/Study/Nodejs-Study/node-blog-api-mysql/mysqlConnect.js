var mysql = require('mysql');
var config = require('./config.js');

module.exports = function () {
  return mysql.createConnection(config.mysql);
};
