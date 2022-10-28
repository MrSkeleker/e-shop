import {
	FormInputContainer,
	FormInputLabel,
	Group,
} from './form-input.styles.js';

const FormInput = ({ label, inputOptions }) => {
	return (
		<Group>
			<FormInputContainer {...inputOptions} />
			<FormInputLabel shrink={inputOptions.value.length}>
				{label}
			</FormInputLabel>
		</Group>
	);
};

export default FormInput;
