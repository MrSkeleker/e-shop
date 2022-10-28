import ProductCard from 'components/product-card/product-card.component';
import { CategoriesContext } from 'contexts/categories.context';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CategoryPageContainer, CategoryPageTitle } from './category.styles.js';

const Category = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	const { category } = useParams();
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [categoriesMap, category, setProducts]);

	return (
		<Fragment>
			<CategoryPageTitle>{category}</CategoryPageTitle>
			<CategoryPageContainer>
				{products &&
					products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryPageContainer>
		</Fragment>
	);
};

export default Category;
