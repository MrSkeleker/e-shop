import './button.styles.js';
import { BaseButton, GoogleButton, InvertedButton } from './button.styles.js';

export const BUTTON_TYPES = {
	BASE: 'base',
	INVERTED: 'inverted',
	GOOGLE: 'google',
};

const getButton = buttonType =>
	({
		[BUTTON_TYPES.BASE]: BaseButton,
		[BUTTON_TYPES.INVERTED]: InvertedButton,
		[BUTTON_TYPES.GOOGLE]: GoogleButton,
	}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
