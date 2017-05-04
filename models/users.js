 /*jshint esversion: 6*/
module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Users;
};