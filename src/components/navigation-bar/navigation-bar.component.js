import { useContext } from 'react';
import { ReactComponent as Logo } from 'assets/crown.svg';
import { UserContext } from 'contexts/user.context';
import { signOutUser } from 'utils/firebase/firebase.utils';

import './navigation.styles.js';
import CartIcon from 'components/cart-icon/cart-icon.component';
import { CartContext } from 'contexts/cart.context';
import CartDropdown from 'components/cart-dropdown/card-dropdown.component';
import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer } from './navigation.styles.js';

const NavigationBar = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	};

	return (
		<NavigationContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>
			<NavLinksContainer>
				<NavLink to='/shop'>
					Shop
				</NavLink>
				{currentUser ? (
					<NavLink as='span' onClick={signOutHandler}>
						Sign Out
					</NavLink>
				) : (
					<NavLink to='/auth'>
						Sign In
					</NavLink>
				)}
				<CartIcon />
			</NavLinksContainer>
			{isCartOpen && <CartDropdown />}
		</NavigationContainer>
	);
};

export default NavigationBar;
