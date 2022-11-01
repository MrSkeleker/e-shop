import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import CategoriesPreview from 'routes/categories-preview/categories-preview.component';
import Category from 'routes/category/category.component';
import { setCategories } from 'store/categories/categories.action';
import { getCategoriesAndItems } from 'utils/firebase/firebase.utils';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loadShopData = async () => {
			const shopData = await getCategoriesAndItems();
			dispatch(setCategories(shopData));
		};

		loadShopData();
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
