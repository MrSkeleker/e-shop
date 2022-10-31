import { createContext, useEffect, useReducer } from 'react';
import { createAction } from 'utils/reducers/reducers.utils';
import {
	createUserDocumentFromUserAuth,
	onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

const USER_REDUCER_ACTIONS = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_REDUCER_ACTIONS.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled action ${type} in User Reducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const setCurrentUser = user => {
		dispatch(createAction(USER_REDUCER_ACTIONS.SET_CURRENT_USER, user));
	};

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
