import CheckoutItem from 'components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from 'store/cart/cart.selector.js';
import {
	CheckoutContainer,
	CheckoutHeader,
	CheckoutTotal,
	HeaderBlock,
} from './checkout.styles.js';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectTotalPrice);

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
