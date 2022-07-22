import classes from './button.module.css';

const Button = ({ onClick, type, color, size, children }) => {
	return (
		<button
			onClick={onClick}
			type={type || 'submit'}
			className={`
			${classes.btn} 
			${classes[`${size || 'sm'}`]} 
			${classes[`btn--${color || 'primary'}`]}
			`}
		>
			{children}
		</button>
	);
};

export default Button;
