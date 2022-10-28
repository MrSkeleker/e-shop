import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndItems } from 'utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	const value = { categoriesMap };

	useEffect(() => {
		const loadShopData = async () => {
			const shopData = await getCategoriesAndItems();
			setCategoriesMap(shopData);
		};

		loadShopData();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
