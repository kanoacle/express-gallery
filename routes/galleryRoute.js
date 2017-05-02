 /*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const gallery = require('../db/galleryDB');

//gallery
router.route('/')
  .get((req, res) => {
    gallery.getImages()
    .then(data => {
      console.log(data);
      res.send(data);
    });
  })
  .post((req, res) => {
    gallery.postImage(req.body)
    .then(data => {
      res.redirect('/gallery');
    });
  });

//gallery by id
router.route('/:id')
  .put((req, res) => {
    gallery.putImage(req.body, req.params.id)
    .then(data => {
      res.redirect(303,'/gallery');
    });
  });


module.exports = router;