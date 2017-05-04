 /*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const gallery = require('../db/galleryDB');
const users = require('../db/usersDB');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function isAuthenticated (req, res, next) {
  console.log('checking');
  if(req.isAuthenticated()) {
    console.log('you good');
    next();
  }else {
    console.log('you bad!!!!');
    res.redirect('/gallery/login');
  }
}

//gallery
router.route('/')
  .get((req, res) => {
    gallery.getImages()
    .then(data => {
      res.render('gallery', {
         gallery: data,
         user: req.user
      });
    });
  })
  .post((req, res) => {
    gallery.postImage(req.body)
    .then(() => {
      res.redirect(303, '/gallery');
    });
  });


//sign-up page
router.route('/sign-up')
  .get((req, res) => {
    res.render('sign-up');
})
  .post((req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      users.createUser({
        username: req.body.username,
        password: hash
      }).then( () => {
        res.redirect('/gallery/login');
      });
    });
  });
});

//log in
router.route('/login')
  .get((req, res) => {
    res.render('login');
});

//new post
router.route('/new')
  .get(isAuthenticated, (req, res) => {
  res.render('new');
});

//gallery by id
router.route('/:id')
  .put((req, res) => {
    gallery.putImage(req.body, req.params.id)
    .then(() => {
      res.redirect(303, '/gallery');
    });
  })
  .get((req, res) => {
    gallery.getById(req.params.id)
    .then(data => {
      res.render('byid', {gallery: data});
    });
  })
  .delete((req, res) => {
    gallery.deleteById(req.params.id)
    .then(() => {
      res.redirect(303, '/gallery');
    });
  });

//edditing by id
router.route('/:id/edit')
.get((req, res) => {
  gallery.getById(req.params.id)
  .then((data) => {
    res.render('edit', {gallery: data});
  });
});




module.exports = router;