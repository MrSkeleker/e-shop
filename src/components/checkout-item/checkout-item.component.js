import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	clearItemFromCart,
	removeProductFromCart,
} from 'store/cart/cart.action.js';
import { selectCartItems } from 'store/cart/cart.selector.js';
import {
	Arrow,
	Cell,
	CheckoutItemContainer,
	ImageContainer,
	QuantityCell,
	QuantityValue,
	RemoveButton,
} from './checkout-item.styles.js';

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHandler = () => dispatch(addProductToCart(cartItems, cartItem));
	const removeItemHandler = () =>
		dispatch(removeProductFromCart(cartItems, cartItem));

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
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
