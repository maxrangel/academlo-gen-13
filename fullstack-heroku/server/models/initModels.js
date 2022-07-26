// Models
const { User } = require('./user.model');
const { Post } = require('./post.model');
const { Comment } = require('./comment.model');
const { PostImg } = require('./postImg.model');

const initModels = () => {
	// 1 User <----> M Post
	User.hasMany(Post, { foreignKey: 'userId' });
	Post.belongsTo(User);

	// 1 User <----> M Comment
	User.hasMany(Comment, { foreignKey: 'userId' });
	Comment.belongsTo(User);

	// 1 Post <----> M Comment
	Post.hasMany(Comment, { foreignKey: 'postId' });
	Comment.belongsTo(Post);

	// 1 Post <----> M PostImg
	Post.hasMany(PostImg, { foreignKey: 'postId' });
	PostImg.belongsTo(Post);
};

module.exports = { initModels };
