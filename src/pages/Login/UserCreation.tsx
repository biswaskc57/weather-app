import React, { useState }  from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../Components/Wrapper/Wrapper';
import InputErrorMessage from '../../Components/ErrorMessage/InputErrorMessage';

import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const FORM_NAME = 'USER_ACCOUNT';

export interface UserAccount {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	email: string;
	password: string;
}

const UserCreationPage: React.FunctionComponent = () => {

	const { handleSubmit, formState: { errors,isDirty }, register } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			address: '',
		} as UserAccount
	});

	const navigate = useNavigate();
	const [isUserCreateSuccessful, setIsUserCreateSuccessful] = useState(false);

	function stateChange() {
		setIsUserCreateSuccessful(true);
		setTimeout(function () {
			navigate('/login');
		}, 2000);
	}
	const submit = async (form: UserAccount) => {
		const users = localStorage.getItem('users');

		if (!users) {
			localStorage.setItem('users', JSON.stringify([form]));
			stateChange();
			return;
		}

		const userList:  UserAccount [] = JSON.parse(users) ?JSON.parse(users) : [] ;
		const userExists = userList.some((user: UserAccount) =>{
			user.email === form.email && user.firstName === form.firstName && user.lastName === form.lastName;
		});

		if (userExists) {
			return alert('This user already exists');
		}

		userList.push(form);
		localStorage.setItem('users', JSON.stringify(userList));
		stateChange();
		return;
	};

	return (
		<Wrapper>
			<div className={styles.centeredFormContainer}>
				<h2>Please create a user</h2>
				{isUserCreateSuccessful && <i className= "fa fa-success"> User created</i>}
				<form id={FORM_NAME} onSubmit={handleSubmit(submit)}>
					<div>
						<TextField
							className={styles.inputFields}
							label="First Name"
							{...register('firstName', { required: 'First Name is required' })}
							fullWidth

						/>
						<InputErrorMessage>
							{errors.firstName && <>{errors.firstName.message}</>}
						</InputErrorMessage>
					</div>
					<div>
						<TextField
							className={styles.inputFields}
							label="Last Name"
							{...register('lastName', { required: 'Last Name is required' })}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.lastName && <>{errors.lastName.message}</>}
						</InputErrorMessage>
					</div>
					<div>
						<TextField
							className={styles.inputFields}
							label="Address"
							{...register('address', { required: 'Address is required' })}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.address && <>{errors.address.message}</>}
						</InputErrorMessage>
					</div>
					<div>
						<TextField
							className={styles.inputFields}
							label="Email"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Invalid email address',
								},
							})}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.email && <>{errors.email.message}</>}
						</InputErrorMessage>
					</div>
					<div>
						<TextField
							className={styles.inputFields}
							label="Phone number"
							{...register('phone', {
								required: 'phone number is required',
								// pattern: {
								// 	value: /^\+(\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}([\s.-]?)\d{4}$/,
								// 	message: 'Invalid phone number',
								// }
							})}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.phone && <>{errors.phone.message}</>}
						</InputErrorMessage>
					</div>
					<div>
						<TextField
							className={styles.inputFields}
							type="password"
							label="Password"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters.',
								},
							})}
							fullWidth
						/>
						<InputErrorMessage>
							{errors.password && <>{errors.password.message}</>}
						</InputErrorMessage>
					
					</div>
					<Button className={styles.submitButton} type="submit" form= {FORM_NAME} variant="contained" disabled={!isDirty} color="secondary">
          				Submit
					</Button>
					<Button className={styles.goToLoginButton}  type="button" variant="contained" color="primary">
						<Link to="/">Go back</Link> 
					</Button>
				</form>
			</div>
		</Wrapper>
	);
};

export default UserCreationPage;
