import { createContext, useState } from 'react';

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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addProductToCart = product =>
		setCartItems(incrementCartItem(cartItems, product));
	const removeProductFromCart = product =>
		setCartItems(decrementCartItem(cartItems, product));
	const clearItemFromCart = cartItem =>
		setCartItems(removeCartItem(cartItems, cartItem));

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
