import ProductCard from 'components/product-card/product-card.component';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectCategoriesMap } from 'store/categories/categories.selector.js';
import { CategoryPageContainer, CategoryPageTitle } from './category.styles.js';

const Category = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
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
