import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/actions/user.actions';

import Button from '../button/button.component';

import classes from './header.module.css';

const Header = () => {
	// State
	const user = useSelector(state => state.user.user);
	const isAuth = useSelector(state => state.user.isAuth);

	const dispatch = useDispatch();

	const onLogoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className={classes.header}>
			<div className={classes.brand}>
				<Link to='/'>Academlo Blog</Link>
			</div>

			{isAuth && (
				<nav className={classes.navigation}>
					{/* TODO: SET USER ID */}
					<Link
						className={classes['navigation__link']}
						to={`/profile/${user.id}`}
					>
						Profile
					</Link>
					<Button
						className={classes['navigation__link']}
						onClick={onLogoutHandler}
					>
						Logout
					</Button>
				</nav>
			)}
		</header>
	);
};

export default Header;
