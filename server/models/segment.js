'use strict';
module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    location: DataTypes.TEXT,
    subnetInfo: DataTypes.TEXT
  }, {});
  Segment.associate = function(models) {
    Segment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Segment.hasMany(models.Packet, {as: 'packets'})
  };
  return Segment;
};