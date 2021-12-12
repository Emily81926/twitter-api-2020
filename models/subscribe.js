'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscribe = sequelize.define('Subscribe', {
    subscriberId: DataTypes.INTEGER,
    subscribedId: DataTypes.INTEGER
  }, {});
  Subscribe.associate = function(models) {
    // associations can be defined here
  
  };
  return Subscribe;
};