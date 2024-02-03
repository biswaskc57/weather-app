import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

import { UserAccount } from './UserCreation';
import InputErrorMessage from '../../components/ErrorMessage/InputErrorMessage';

import styles from './login.module.scss';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useAppContext } from '../../contexts/LocationContext';

const FORM_NAME = 'login-form';

interface loginCredentials{
  email: string,
  password: string
}
const LoginPage: React.FunctionComponent = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({defaultValues:{email: '', password: ''}});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const { dispatch } = useAppContext();

	const onSubmit = (form:loginCredentials) => {
		const users = localStorage.getItem('users');
		if (!users) {
			setError('The user could not be found. Please sign up a new user.');
			return;
		}

		const userList:  UserAccount [] = JSON.parse(users) ?JSON.parse(users) : [] ;
		const userExists = userList.some((user: UserAccount) =>{
			return	user.email === form.email && user.password === form.password;
		});

		if (userExists) {
		 	dispatch({type: 'ADD_USER', user: {email: form.email, password: form.password }});
			navigate('/home');
			return;
		}
		setError('The user could not be found. Please sign up a new user.');
	};

	return (
		<Wrapper>
			<div className = {styles.centeredFormContainer}>
				<h2>Login Page</h2>
				<form id={FORM_NAME} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputFields}>
						<TextField
							label="Email"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Invalid email address',
								},
							})}
							onChange={()=>setError('')}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.email &&<>{errors.email.message}</> }
						</InputErrorMessage>
					</div>
					<div className={styles.inputFields}>
						<TextField
							label="Password"
							type="password"
							{...register('password', { required: 'Password is required' })}
							fullWidth
							onChange={()=>setError('')}
						/>
						<InputErrorMessage>
							{errors.password && <>{errors.password.message}</>}
						</InputErrorMessage>
					</div>
					{error && <InputErrorMessage> {error}</InputErrorMessage>}
					<div className={styles.buttons}>
						<Button className={styles.loginButton} type="submit" form={FORM_NAME} variant="contained" color="primary">
         					Login
						</Button>
						<Button className={styles.createUserButton}  type="button" variant="contained" color="inherit">
							<Link to="/create-user">Create a new user</Link> 
						</Button>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default LoginPage;
