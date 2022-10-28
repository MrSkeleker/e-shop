import { createContext, useEffect, useState } from 'react';
import {
	createUserDocumentFromUserAuth,
	onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) {
				createUserDocumentFromUserAuth(user);
			}
			setCurrentUser(user);
		});

        return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
