 /*jshint esversion: 6*/
const db = require('../models');

module.exports = (function(){

function createUser(body){
  return db.Users.create({
      username: body.username,
      password: body.password,
    });
  }

return {
  createUser
};

})();

