'use strict';
module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define('Segment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    location: DataTypes.TEXT,
    subnetInfo: DataTypes.TEXT
  }, {});
  Segment.associate = function(models) {
    Segment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Segment.hasMany(models.Packet, {foreignKey: 'segmentId', as: 'packets'})
  };
  return Segment;
};