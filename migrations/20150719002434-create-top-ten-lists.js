'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('top_ten_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('top_ten_lists');
  }
};