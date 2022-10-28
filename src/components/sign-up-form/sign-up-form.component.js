import { useState } from 'react';
import {
	createUserAuthWithEmailAndPassword,
	createUserDocumentFromUserAuth,
} from 'utils/firebase/firebase.utils';
import Button, { BUTTON_TYPES } from 'components/button/button.component';
import FormInput from 'components/form-input/form-input.component';

import { SignUpContainer } from './sign-up-form.styles.js';

const DEFAULT_FORM_FIELDS = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		try {
			const response = await createUserAuthWithEmailAndPassword(
				email,
				password
			);

			if (response) {
				await createUserDocumentFromUserAuth(response.user, { displayName });
				resetFormFields();
			}
		} catch (err) {
			console.log(
				'error while creating the user using email and password: ',
				err.message
			);

			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use!');
			}
		}
	};

	const resetFormFields = () => {
		setFormFields(DEFAULT_FORM_FIELDS);
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					inputOptions={{
						type: 'text',
						name: 'displayName',
						onChange: handleChange,
						value: displayName,
					}}
				/>
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
				<FormInput
					label='Confirm Password'
					inputOptions={{
						type: 'password',
						name: 'confirmPassword',
						onChange: handleChange,
						value: confirmPassword,
					}}
				/>
				<Button buttonType={BUTTON_TYPES.BASE} type='submit'>
					Sign Up
				</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
