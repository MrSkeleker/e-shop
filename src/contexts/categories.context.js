import { createContext, useEffect, useReducer } from 'react';
import { getCategoriesAndItems } from 'utils/firebase/firebase.utils';
import { createAction } from 'utils/reducers/reducers.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

const CATEGORIES_REDUCER_ACTIONS = {
	SET_SHOP_CATEGORIES: 'SET_SHOP_CATEGORIES',
};

const categoriesReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_REDUCER_ACTIONS.SET_SHOP_CATEGORIES:
			return {
				...state,
				categoriesMap: payload,
			};
		default:
			throw new Error(`Unhandled action ${type} in Categories Reducer`);
	}
};

const INITIAL_STATE = {
	categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
	const [{ categoriesMap }, dispatch] = useReducer(
		categoriesReducer,
		INITIAL_STATE
	);

	const value = { categoriesMap };

	useEffect(() => {
		const loadShopData = async () => {
			const shopData = await getCategoriesAndItems();
			dispatch(
				createAction(CATEGORIES_REDUCER_ACTIONS.SET_SHOP_CATEGORIES, shopData)
			);
		};

		loadShopData();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
