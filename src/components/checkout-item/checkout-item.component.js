import { CartContext } from 'contexts/cart.context';
import { useContext } from 'react';

import { Arrow, Cell, CheckoutItemContainer, ImageContainer, QuantityCell, QuantityValue, RemoveButton } from './checkout-item.styles.js';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const { addProductToCart, removeProductFromCart, clearItemFromCart } =
		useContext(CartContext);

	const clearItemHandler = () => clearItemFromCart(cartItem);
	const addItemHandler = () => addProductToCart(cartItem);
	const removeItemHandler = () => removeProductFromCart(cartItem);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<Cell>{name}</Cell>
			<QuantityCell>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<QuantityValue>{quantity}</QuantityValue>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</QuantityCell>
			<Cell>{price}</Cell>
			<RemoveButton onClick={clearItemHandler}>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
