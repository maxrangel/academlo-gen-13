import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Redux actions
import { getMyPosts, getProfilePosts } from '../../store/actions/posts.actions';
import { checkToken } from '../../store/actions/user.actions';

// Components
import PostsList from '../../components/posts/posts-list/post-list.component';
import AddPostForm from '../../components/forms/add-post-form/add-post-form.component';

import classes from './profile.module.css';

const Profile = () => {
	// State
	const user = useSelector(state => state.user.user);
	const isAuth = useSelector(state => state.user.isAuth);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isAuth) {
			dispatch(checkToken());
			navigate('/auth');
		}
	}, [dispatch, isAuth, navigate]);

	const profileOwner = +params.id === user.id;

	useEffect(() => {
		// Check if this profile belongs to the session user (state)
		if (profileOwner) {
			dispatch(getMyPosts());
		} else {
			dispatch(getProfilePosts(params.id));
		}
	}, [dispatch, profileOwner, params]);

	if (!profileOwner) {
		return (
			<div className={classes.profile}>
				{/* <h2>{user.name} Profile</h2> */}
				<PostsList />
			</div>
		);
	}

	return (
		<div className={classes.profile}>
			<Row justify='space-around'>
				<Col span={6} xs={24} lg={10} pull={2}>
					<AddPostForm />
				</Col>
				<Col span={18} xs={24} lg={14}>
					<h2>{user.name} Profile</h2>
					<PostsList />
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
