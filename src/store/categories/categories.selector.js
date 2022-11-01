import { createSelector } from 'reselect';

const selectCategoriesReducer = state => state.categories;

export const selectCategories = createSelector(
	[selectCategoriesReducer],
	categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	categories =>
		categories.reduce((acc, doc) => {
			const { title, items } = doc;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);
