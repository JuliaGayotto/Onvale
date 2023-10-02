const { Sequelize } = require('sequelize');

const connection = new Sequelize('onvale', 'root', 'fatec', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = connection;