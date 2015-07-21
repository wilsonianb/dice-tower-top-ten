'use strict';
module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('Games', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      validate: {
        contains: {
          args: 'https://boardgamegeek.com/boardgame',
          msg: 'Must be valid boardgamegeek url'
        }
      }
    }
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