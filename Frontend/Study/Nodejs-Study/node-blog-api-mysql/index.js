var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');

app.set('views','./views');
app.set('view engine','ejs');

app.use('/',express.static('./public'));

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var postsRoute = require('./routes/posts.js');

app.use('/api/posts',postsRoute);

app.listen(8888,function () {
  console.log('api server is running on http://localhost:8888');
});
