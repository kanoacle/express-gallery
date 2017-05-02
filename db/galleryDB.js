 /*jshint esversion: 6*/
const db = require('../models');

module.exports = (function(){

function postImage(body){
  return db.Gallery.create({
      author: body.author,
      link: body.link,
      description: body.description
    });
  }

function getImages(){
  return db.Gallery.findAll();
}

function putImage(body){
  return db.Gallery.upsert({
      author: body.author,
      link: body.link,
      description: body.description
    });
}

return {
  postImage,
  getImages,
  putImage
};

})();

