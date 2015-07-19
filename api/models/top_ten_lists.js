'use strict';
module.exports = function(sequelize, DataTypes) {
  var top_ten_lists = sequelize.define('Lists', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'top_ten_lists',
    classMethods: {
      associate: function(models) {
        top_ten_lists.hasMany(models.Rankings);
      }
    }
  });
  return top_ten_lists;
};