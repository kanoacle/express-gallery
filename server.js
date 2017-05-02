var express = require('express');
var app = express();

var db = require('./models');
const PORT = process.env.PORT || 3000;

app.listen(3000, function() {
  db.sequelize.sync();
});