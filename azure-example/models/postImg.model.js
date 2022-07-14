const { db, DataTypes } = require('../utils/database.util');

const PostImg = db.define('postImg', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	postId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	imgUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { PostImg };
