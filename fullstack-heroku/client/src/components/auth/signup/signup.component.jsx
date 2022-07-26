import { useDispatch } from 'react-redux';
import { Input, Form } from 'antd';

// Redux actions
import { signup } from '../../../store/actions/user.actions';

// Component
import Button from '../../../components/ui/button/button.component';

import classes from '../auth.module.css';

const Signup = ({ onShowLogin }) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const submitHandler = e => {
		const userData = {
			name: e.name,
			email: e.email,
			password: e.password,
		};

		dispatch(signup(userData));

		form.resetFields();
		onShowLogin();
	};

	return (
		<div className={classes.container}>
			<h3 className={classes.header}>Create an account</h3>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				className={classes.form}
				name='signup'
				size='middle'
				onFinish={submitHandler}
			>
				<Form.Item label='Name' name='name' className={classes['form-item']}>
					<Input placeholder='John Doe' />
				</Form.Item>

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
						Create account
					</Button>
					<Button
						size='block'
						color='tertiary'
						onClick={onShowLogin}
						type='button'
					>
						Have an account?
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Signup;
