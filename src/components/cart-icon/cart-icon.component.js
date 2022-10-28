import { CartContext } from 'contexts/cart.context';
import { useContext, useEffect, useState } from 'react';

import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from './cart-icon.styles.js';

const CartIcon = () => {
	const [counter, setCounter] = useState(0);
	const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	useEffect(() => {
		setCounter(
			cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		);
	}, [cartItems, setCounter]);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{counter}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
