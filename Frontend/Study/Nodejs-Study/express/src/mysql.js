var mysql = require('mysql');

exports.mysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a123456@',
  database: 'nodejs_study'
});
