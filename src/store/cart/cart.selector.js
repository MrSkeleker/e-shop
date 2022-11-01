import { createSelector } from 'reselect';

export const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.isCartOpen
);

export const selectTotalQunatity = createSelector(
	[selectCartItems],
	cartItems =>
		cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectTotalPrice = createSelector([selectCartItems], cartItems =>
	cartItems.reduce(
		(sum, cartItem) => sum + cartItem.price * cartItem.quantity,
		0
	)
);
