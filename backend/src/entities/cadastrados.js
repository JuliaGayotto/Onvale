const { DataTypes } = require('sequelize');
const connection = require('../config/db');

const Cadastrado = connection.define('Cadastrados', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Cadastrado.sync();

module.exports = Cadastrado