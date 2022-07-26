import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux actions
import { checkToken } from '../../store/actions/user.actions';

// Components
import PostsList from '../../components/posts/posts-list/post-list.component';
import AddPostForm from '../../components/forms/add-post-form/add-post-form.component';

import classes from './home.module.css';

const Home = () => {
	// Check if user is authenticated from state
	const isAuth = useSelector(state => state.user.isAuth);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isAuth) navigate('/auth');
		else dispatch(checkToken());
	}, [navigate, isAuth, dispatch]);

	return (
		<div className={classes.home}>
			<Row justify='space-around'>
				<Col span={6} xs={24} lg={8}>
					<AddPostForm />
				</Col>
				<Col span={18} xs={24} lg={16}>
					<PostsList />
				</Col>
			</Row>
		</div>
	);
};

export default Home;
