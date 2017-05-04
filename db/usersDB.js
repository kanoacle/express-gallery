 /*jshint esversion: 6*/
const db = require('../models');

module.exports = (function(){

function createUser(body){
  return db.Users.create({
      username: body.username,
      password: body.password,
    });
  }

function getUserImages(author) {
return db.Gallery.findAll({
    where: {
      username: body.author
    }
  });
}


return {
  createUser
};

})();

