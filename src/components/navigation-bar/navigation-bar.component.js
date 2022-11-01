import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from 'assets/crown.svg';
import { signOutUser } from 'utils/firebase/firebase.utils';

import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/card-dropdown.component';
import { setCurrentUser } from 'store/user/user.action.js';
import { selectCurrentUser } from 'store/user/user.selector.js';

import {
	LogoContainer,
	NavigationContainer,
	NavLink,
	NavLinksContainer,
} from './navigation.styles.js';
import { selectIsCartOpen } from 'store/cart/cart.selector.js';

const NavigationBar = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutHandler = async () => {
		await signOutUser();
		dispatch(setCurrentUser(null));
	};

	return (
		<NavigationContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>
			<NavLinksContainer>
				<NavLink to='/shop'>Shop</NavLink>
				{currentUser ? (
					<NavLink as='span' onClick={signOutHandler}>
						Sign Out
					</NavLink>
				) : (
					<NavLink to='/auth'>Sign In</NavLink>
				)}
				<CartIcon />
			</NavLinksContainer>
			{isCartOpen && <CartDropdown />}
		</NavigationContainer>
	);
};

export default NavigationBar;
