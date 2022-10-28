import { useState } from 'react';
import {
	signInUserAuthWithEmailAndPassword,
	signInWithGooglePopup,
} from 'utils/firebase/firebase.utils';
import Button, { BUTTON_TYPES } from 'components/button/button.component';
import FormInput from 'components/form-input/form-input.component';

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles.js';

const DEFAULT_FORM_FIELDS = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
	const { email, password } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			await signInUserAuthWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('Incorrect password!');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email');
					break;
				default:
					console.log('error during log in: ', err.message);
			}
		}
	};

	const resetFormFields = () => {
		setFormFields(DEFAULT_FORM_FIELDS);
	};

	const logInWithGooglePopup = () => signInWithGooglePopup();

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					inputOptions={{
						type: 'email',
						name: 'email',
						onChange: handleChange,
						value: email,
					}}
				/>
				<FormInput
					label='Password'
					inputOptions={{
						type: 'password',
						name: 'password',
						onChange: handleChange,
						value: password,
					}}
				/>
				<ButtonsContainer>
					<Button buttonType={BUTTON_TYPES.BASE} type='submit'>Sign In</Button>
					<Button
						buttonType={BUTTON_TYPES.GOOGLE}
						type='button'
						onClick={logInWithGooglePopup}>
						Sign In With Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
