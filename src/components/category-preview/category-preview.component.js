import ProductCard from 'components/product-card/product-card.component';
import { Link } from 'react-router-dom';

import {
	CategoryPreviewContainer,
	Preview,
	Title,
} from './category-preview.styles.js';

const CategoryPreview = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Link to={`${title}`}>
					<Title>{title.toUpperCase()}</Title>
				</Link>
			</h2>
			<Preview>
				{products.slice(0, 4).map(product => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
