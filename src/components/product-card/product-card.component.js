import Button, { BUTTON_TYPES } from 'components/button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'store/cart/cart.action.js';
import { selectCartItems } from 'store/cart/cart.selector.js';
import {
	Name,
	Price,
	ProductCardContainer,
	ProductCartFooter,
} from './product-card.styles.js';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, price, imageUrl } = product;

	const addProductHandler = () =>
		dispatch(addProductToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name} />
			<ProductCartFooter>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</ProductCartFooter>
			<Button onClick={addProductHandler} buttonType={BUTTON_TYPES.INVERTED}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
