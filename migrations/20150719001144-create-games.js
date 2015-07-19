'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('games', {
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
    return queryInterface.dropTable('games');
  }
};