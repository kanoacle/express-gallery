 /*jshint esversion: 6*/
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const gallery = require('./routes/galleryRoute.js');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt');
const { Users } = require('./models');
const db = require('./models');
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

//parse application
app.use(bodyParser.urlencoded({extended: true}));

//method override
app.use(methodOverride('_method'));

// serving static files
app.use('/static', express.static('public'));

//handlebars setup
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//user-flow
app.use(session({
  store: new RedisStore(),
  secret: 'something_super-weird',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    Users.findOne({
      where: {
        username: username
      }
    })
    .then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }else {
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            return done(null, user);
          }else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    }).catch(err => {
      console.log('error: ', err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  Users.findOne({
    where: {
      id: user.id
    }
  })
  .then(user => {
    return done(null, user);
  });
});

//attach gallery router to express
app.use('/gallery', gallery);

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/user/new', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      Users.create({
        username: req.body.username,
        password: hash
      }).then( () => {
        res.redirect('/login');
      });
    });
  });
});



app.get('/gallery/new', isAuthenticated, (req, res) => {
  // console.log('req.user: ', req.user);
  console.log('req.user id', req.user.id);
  console.log('req.username', req.user.username);
  // console.log('req.user.password: ', req.user.password);

  console.log('pinging the secret');
  res.render('new');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery/new',
  failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/gallery');
});

function isAuthenticated (req, res, next) {
  console.log('checking');
  if(req.isAuthenticated()) {
    console.log('you good');
    next();
  }else {
    console.log('you bad!!!!');
    res.redirect('/login');
  }
}

app.listen(3000, function() {
  db.sequelize.sync();
});

module.exports = app;