'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    isRead: DataTypes.BOOLEAN,
    TweetId: DataTypes.INTEGER,
    subscriberId: DataTypes.INTEGER
  }, {});
  Notification.associate = function(models) {
    Notification.belongsTo(models.Tweet)
    
  };
  return Notification;
};