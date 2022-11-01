import { createAction } from 'utils/reducers/reducers..utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const setCategories = data =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, data);
