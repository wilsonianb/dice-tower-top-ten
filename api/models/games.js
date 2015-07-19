'use strict';
module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('Games', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'games',
    classMethods: {
      associate: function(models) {
        games.hasMany(models.Rankings);
      }
    }
  });
  return games;
};