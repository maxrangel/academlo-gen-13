import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux actions
import { checkToken } from '../../store/actions/user.actions';

// Components
import Login from '../../components/auth/login/login.component';
import Signup from '../../components/auth/signup/signup.component';

const Auth = () => {
	// State
	const isAuth = useSelector(state => state.user.isAuth);
	const [showLoginForm, setShowLoginForm] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handlers
	const showLoginHandler = () => {
		setShowLoginForm(true);
	};

	const hideLoginHandler = () => {
		setShowLoginForm(false);
	};

	useEffect(() => {
		if (isAuth) navigate('/');
		else dispatch(checkToken());
	}, [navigate, isAuth, dispatch]);

	return (
		<div>
			{showLoginForm ? (
				<Login onHideLogin={hideLoginHandler} />
			) : (
				<Signup onShowLogin={showLoginHandler} />
			)}
		</div>
	);
};

export default Auth;
