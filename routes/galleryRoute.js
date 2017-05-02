 /*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const gallery = require('../db/galleryDB');

//gallery
router.route('/')
  .get((req, res) => {
    gallery.getImages()
    .then(data => {
      res.render('gallery', {gallery: data});
    });
  })
  .post((req, res) => {
    gallery.postImage(req.body)
    .then(() => {
      res.redirect(303, '/gallery');
    });
  });

//new post
router.route('/new')
.get((req, res) => {
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
      res.render('gallery', {gallery: data});
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