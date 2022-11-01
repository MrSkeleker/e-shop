import { createAction } from 'utils/reducers/reducers..utils';
import { CART_ACTION_TYPES } from './cart.types';

const removeCartItem = (items, item) =>
	items.filter(cartItem => cartItem.id !== item.id);

const updateCartItem = (items, item, extraQuantity) => {
	const existingCartItem = items.find(cartItem => cartItem.id === item.id);

	if (!existingCartItem && extraQuantity > 0) {
		return [...items, { ...item, quantity: extraQuantity }];
	} else if (
		existingCartItem &&
		existingCartItem.quantity + extraQuantity <= 0
	) {
		return removeCartItem(items, item);
	}

	return items.map(cartItem =>
		cartItem.id === item.id
			? { ...cartItem, quantity: cartItem.quantity + extraQuantity }
			: cartItem
	);
};

const incrementCartItem = (cartItems, productItem) =>
	updateCartItem(cartItems, productItem, 1);
const decrementCartItem = (cartItems, productItem) =>
	updateCartItem(cartItems, productItem, -1);

export const addProductToCart = (cartItems, product) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		incrementCartItem(cartItems, product)
	);
export const removeProductFromCart = (cartItems, product) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		decrementCartItem(cartItems, product)
	);
export const clearItemFromCart = (cartItems, cartItem) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		removeCartItem(cartItems, cartItem)
	);

export const setIsCartOpen = bool =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
