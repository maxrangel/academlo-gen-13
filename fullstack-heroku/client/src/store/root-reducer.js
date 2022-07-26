// Reducers
import userReducer from './slices/user.slice';
import postsReducer from './slices/posts.slice';
import errorReducer from './slices/error.slice';

const rootReducer = {
	user: userReducer,
	posts: postsReducer,
	error: errorReducer,
};

export default rootReducer;
