'use strict';
module.exports = function(sequelize, DataTypes) {
  var rankings = sequelize.define('Rankings', {
    game_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER,
    dude: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Sam', 'Tom', 'Zee']]
      }
    },
    rank: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      }
    },
    start_time: {
      type: DataTypes.STRING,
      validate: {
        is: /(([0-5]?[0-9]h)|([0-5]?[0-9]m)|([0-5][0-9]s))/
      }
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'rankings',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rankings;
};