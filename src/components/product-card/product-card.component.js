import Button, { BUTTON_TYPES } from 'components/button/button.component';
import { CartContext } from 'contexts/cart.context';
import { useContext } from 'react';
import {
	Name,
	Price,
	ProductCardContainer,
	ProductCartFooter,
} from './product-card.styles.js';

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addProductToCart } = useContext(CartContext);

	const addProductHandler = () => addProductToCart(product);

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
