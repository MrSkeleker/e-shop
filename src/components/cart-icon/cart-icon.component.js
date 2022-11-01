import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from 'store/cart/cart.action.js';
import {
	selectIsCartOpen,
	selectTotalQunatity,
} from 'store/cart/cart.selector.js';
import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from './cart-icon.styles.js';

const CartIcon = () => {
	const dispatch = useDispatch();
	const totalQuantity = useSelector(selectTotalQunatity);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{totalQuantity}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
