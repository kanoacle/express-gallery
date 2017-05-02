 /*jshint esversion: 6*/
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const gallery = require('./routes/galleryRoute.js');
var methodOverride = require('method-override');

const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use('/static', express.static('public'));

//parse application
app.use(bodyParser.urlencoded({extended: true}));

//method override
app.use(methodOverride('_method'));

//attach gallery router to express
app.use('/gallery', gallery);

//handlebars setup
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.listen(3000, function() {
  db.sequelize.sync();
});

module.exports = app;