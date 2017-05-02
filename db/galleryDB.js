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
  return db.Gallery.findAll({
    order: '"createdAt"'
  });
}

function putImage(body, id){
  return db.Gallery.update({
      author: body.author,
      link: body.link,
      description: body.description }, {
        where: {
          id: id
        }
    });
}

function getById(id){
  return db.Gallery.findOne({
    where: {
      id: id
    }
  });
}

return {
  postImage,
  getImages,
  putImage,
  getById
};

})();

