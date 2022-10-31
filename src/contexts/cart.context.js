import { createContext, useReducer } from 'react';
import { createAction } from 'utils/reducers/reducers.utils';

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	addProductToCart: () => {},
	removeProductFromCart: () => {},
	clearItemFromCart: () => {},
	cartItems: [],
});

const CART_REDUCER_ACTIONS = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_REDUCER_ACTIONS.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
			};
		case CART_REDUCER_ACTIONS.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled action ${type} in Cart Reducer`);
	}
};

const INITIAL_STATE = {
	cartItems: [],
	isCartOpen: false,
};

export const CartProvider = ({ children }) => {
	const [{ isCartOpen, cartItems }, dispatch] = useReducer(
		cartReducer,
		INITIAL_STATE
	);

	const addProductToCart = product =>
		dispatch(
			createAction(
				CART_REDUCER_ACTIONS.SET_CART_ITEMS,
				incrementCartItem(cartItems, product)
			)
		);
	const removeProductFromCart = product =>
		dispatch(
			createAction(
				CART_REDUCER_ACTIONS.SET_CART_ITEMS,
				decrementCartItem(cartItems, product)
			)
		);
	const clearItemFromCart = cartItem =>
		dispatch(
			createAction(
				CART_REDUCER_ACTIONS.SET_CART_ITEMS,
				removeCartItem(cartItems, cartItem)
			)
		);
	const setIsCartOpen = bool => {
		dispatch(createAction(CART_REDUCER_ACTIONS.SET_IS_CART_OPEN, bool));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addProductToCart,
		removeProductFromCart,
		clearItemFromCart,
		cartItems,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
