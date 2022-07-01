const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Actor = sequelize.define('actor', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(10),
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Actor };
