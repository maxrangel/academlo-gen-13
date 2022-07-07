const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Post } = require('./models/post.model');
const { Comment } = require('./models/comment.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations

// 1 User <----> M Post
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User);

// 1 User <----> M Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User);

// 1 Post <----> M Comment
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post);

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('Express app running!!', PORT);
});
