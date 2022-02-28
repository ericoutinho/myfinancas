'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Financas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: {
          noEmpty: {msg: "O campo data não pode ser vazio"}
        }
      },
      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          noEmpty: {msg: "O campo categoria não pode ser vazio"}
        },
        references: {
          model: "Categoria",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      titulo: {
        allowNull: null,
        type: Sequelize.STRING,
        validate: {
          noEmpty: {msg: "O campo titulo não pode ser vazio"}
        }
      },
      valor: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        validate: {
          noEmpty: {msg: "O campo valor não pode ser vazio"}
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Financas');
  }
};