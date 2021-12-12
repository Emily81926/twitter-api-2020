'use strict';

const subscribe = require("./subscribe");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    role: DataTypes.STRING,
    cover: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Reply)
    User.hasMany(models.Tweet)
    User.hasMany(models.Like)
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
    User.belongsToMany(User, {
      through: models.Subscribe,
      foreignKey: 'subscriberId',
      as: 'Subscribeds'
    })
    User.belongsToMany(User, {
      through: models.Subscribe,
      foreignKey: 'subscribedId',
      as: 'Subscribers'
    })
  };
  return User;
};