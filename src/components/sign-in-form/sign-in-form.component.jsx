import { useState } from 'react';
import {
	signInWithGooglePopup,
	createAuthUserWithEmailandPassword,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailandPassword
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultformFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignInForm = () => {
	//first value is the actual state variable = formFields
	//second value is a setter function
	const [formFields, setFormFields] = useState(defaultformFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultformFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailandPassword(
				email,
				password
			);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email');
					break;

				case 'auth/user-not-found':
					alert('incorrect email address');
					break;
				default:
					alert('error signing in');
			}
		}
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
