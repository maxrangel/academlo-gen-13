const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Post } = require('../models/post.model');
const { PostImg } = require('../models/postImg.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { Email } = require('../utils/email.util');
const { storage } = require('../utils/firebase.util');

const getAllPosts = catchAsync(async (req, res, next) => {
	// Include user (post's author)
	// Include comments
	// Include user (comment's author)
	const posts = await Post.findAll({
		attributes: ['id', 'title', 'content'],
		include: [
			{ model: User, attributes: ['id', 'name', 'email'] },
			{
				model: Comment,
				attributes: ['id', 'comment'],
				include: {
					model: User,
					attributes: ['id', 'name', 'email'],
				},
			},
		],
	});

	res.status(200).json({
		status: 'success',
		posts,
	});
});

const createPost = catchAsync(async (req, res, next) => {
	const { title, content } = req.body;
	const { sessionUser } = req;

	const newPost = await Post.create({
		title,
		content,
		userId: sessionUser.id,
	});

	if (req.files.length > 0) {
		const filesPromises = req.files.map(async file => {
			const imgRef = ref(storage, `posts/${Date.now()}_${file.originalname}`);
			const imgRes = await uploadBytes(imgRef, file.buffer);

			return await PostImg.create({
				postId: newPost.id,
				imgUrl: imgRes.metadata.fullPath,
			});
		});

		await Promise.all(filesPromises);
	}

	// Send mail when post has been created
	await new Email(sessionUser.email).sendNewPost(title, content);

	res.status(201).json({
		status: 'success',
		newPost,
	});
});

const getPostById = catchAsync(async (req, res, next) => {
	const { post } = req;

	// Map async
	const postImgsPromises = post.postImgs.map(async postImg => {
		const imgRef = ref(storage, postImg.imgUrl);

		const imgFullPath = await getDownloadURL(imgRef);

		postImg.imgUrl = imgFullPath;
	});

	await Promise.all(postImgsPromises);

	res.status(200).json({
		status: 'success',
		post,
	});
});

const updatePost = catchAsync(async (req, res, next) => {
	const { post } = req;

	await post.update({ title, content });

	res.status(204).json({ status: 'success' });
});

const deletePost = catchAsync(async (req, res, next) => {
	const { post } = req;

	await post.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
};
