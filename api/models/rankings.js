'use strict';
module.exports = function(sequelize, DataTypes) {
  var rankings = sequelize.define('Rankings', {
    game_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER,
    dude: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    start_time: DataTypes.STRING
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