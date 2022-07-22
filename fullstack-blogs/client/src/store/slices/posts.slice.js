import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	initialState,
	name: 'posts',
	reducers: {
		getPosts(state, action) {
			state.posts = action.payload.posts;
		},
		newPost(state, action) {
			const { newPost } = action.payload;

			state.posts = [newPost, ...state.posts];
		},
		updatePost(state, action) {
			const { id, title, content } = action.payload;

			const postIndex = state.posts.findIndex(post => post.id === id);

			const updatedPost = { ...state.posts[postIndex], title, content };

			state.posts[postIndex] = updatedPost;
		},
		deletePost(state, action) {
			const { id } = action.payload;

			const postIndex = state.posts.findIndex(post => post.id === id);

			state.posts.splice(postIndex, 1);
		},
		newComment(state, action) {
			const { postId, newComment } = action.payload;

			const postIndex = state.posts.findIndex(post => post.id === postId);

			state.posts[postIndex].comments.push(newComment);
			const updatedPosts = state.posts;
			state.posts = updatedPosts;
		},
		deleteComment(state, action) {
			const { postId, commentId } = action.payload;

			const postIndex = state.posts.findIndex(post => post.id === postId);

			const commentIndex = state.posts[postIndex].comments.findIndex(
				comment => comment.id === commentId
			);

			state.posts[postIndex].comments.splice(commentIndex, 1);
		},
	},
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
