import { useDispatch } from 'react-redux';
import { Input, Form } from 'antd';

// Redux actions
import { login } from '../../../store/actions/user.actions';

// Component
import Button from '../../../components/ui/button/button.component';

import classes from '../auth.module.css';

const Login = ({ onHideLogin }) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const submitHandler = e => {
		dispatch(login(e.email, e.password));

		form.resetFields();

		// navigate('/');
	};

	return (
		<div className={classes.container}>
			<h3 className={classes.header}>Log into Academlo Blog</h3>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				className={classes.form}
				name='login'
				size='middle'
				onFinish={submitHandler}
			>
				<Form.Item label='Email' name='email' className={classes['form-item']}>
					<Input placeholder='john@gmail.com' />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					className={classes['form-item']}
				>
					<Input.Password placeholder='supersecretpassword' />
				</Form.Item>

				<div className={classes.actions}>
					<Button size='block' type='submit'>
						Log in
					</Button>
					<Button
						size='block'
						color='tertiary'
						onClick={onHideLogin}
						type='button'
					>
						Don't have an account?
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Login;
