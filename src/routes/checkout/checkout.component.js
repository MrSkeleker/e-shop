import CheckoutItem from 'components/checkout-item/checkout-item.component';
import { CartContext } from 'contexts/cart.context';
import { useContext, useEffect, useState } from 'react';
import { CheckoutContainer, CheckoutHeader, CheckoutTotal, HeaderBlock } from './checkout.styles.js';

const Checkout = () => {
	const [total, setTotal] = useState(0);
	const { cartItems } = useContext(CartContext);

	useEffect(() => {
		setTotal(
			cartItems.reduce(
				(sum, cartItem) => sum + cartItem.price * cartItem.quantity,
				0
			)
		);
	}, [cartItems, setTotal]);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Name</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map(cartItem => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<CheckoutTotal>Total: ${total}</CheckoutTotal>
		</CheckoutContainer>
	);
};

export default Checkout;
