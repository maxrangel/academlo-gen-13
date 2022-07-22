import axios from 'axios';

import { postsActions } from '../slices/posts.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = 'http://localhost:4000/api/v1/posts';

export const getPosts = () => {
	return async dispatch => {
		try {
			// API REQUEST
			const token = localStorage.getItem('token');

			const res = await axios.get(API_URL, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const submitPost = (title, content) => {
	return async dispatch => {
		try {
			// API REQUEST
			const postData = { title, content };

			const token = localStorage.getItem('token');

			const res = await axios.post(API_URL, postData, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { newPost, name } = res.data;

			const newPostData = { ...newPost, user: { name }, comments: [] };

			dispatch(postsActions.newPost({ newPost: newPostData }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const updatePost = (id, title, content) => {
	return async dispatch => {
		try {
			dispatch(postsActions.updatePost({ id, title, content }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const deletePost = id => {
	return async dispatch => {
		try {
			dispatch(postsActions.deletePost({ id }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const getMyPosts = () => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${API_URL}/me`, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const getProfilePosts = userId => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${API_URL}/profile/${userId}`, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
