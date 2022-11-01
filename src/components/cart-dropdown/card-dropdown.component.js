import Button, { BUTTON_TYPES } from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setIsCartOpen } from 'store/cart/cart.action.js';
import { selectCartItems } from 'store/cart/cart.selector.js';
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles.js';

const CartDropdown = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		dispatch(setIsCartOpen(false));
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			{cartItems.length ? (
				<CartItems>
					{cartItems.map(cartItem => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))}
				</CartItems>
			) : (
				<EmptyMessage>The cart is empty</EmptyMessage>
			)}

			<Button buttonType={BUTTON_TYPES.BASE} onClick={goToCheckoutHandler}>
				Go to Checkout
			</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
