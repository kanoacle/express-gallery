 /*jshint esversion: 6*/
module.exports = function(sequelize, DataTypes) {
  let Gallery = sequelize.define("Gallery", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  });
  return Gallery;
};