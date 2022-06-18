const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	port: 5432,
	database: 'facebook',
});

module.exports = { db, DataTypes };
