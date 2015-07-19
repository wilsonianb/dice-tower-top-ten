'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('rankings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "games",
          key: "id",
          onUpdate: "RESTRICT",
          onDelete: "RESTRICT"
        }
      },
      list_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "top_ten_lists",
          key: "id",
          onUpdate: "RESTRICT",
          onDelete: "RESTRICT"
        }
      },
      dude: {
        type: Sequelize.STRING
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      start_time: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('rankings');
  }
};