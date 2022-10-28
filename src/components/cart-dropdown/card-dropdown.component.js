import Button, { BUTTON_TYPES } from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { CartContext } from 'contexts/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.js';

const CartDropdown = () => {
	const { cartItems, setIsCartOpen } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		setIsCartOpen(false);
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
