import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCAzRYWP36CVj-vG6IWvkC_YVfaho7UXPg',
	authDomain: 'clothing-shop-b83f8.firebaseapp.com',
	projectId: 'clothing-shop-b83f8',
	storageBucket: 'clothing-shop-b83f8.appspot.com',
	messagingSenderId: '286993638679',
	appId: '1:286993638679:web:9d24be4a983654c2010352',
};

initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);
export const getRedirectResults = () => getRedirectResult(auth);

export const db = getFirestore();

export const createUserDocumentFromUserAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) {
		return;
	}

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (err) {
			console.log('error creating the user: ', err.message);
		}
	}

	return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = callback =>
	onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsData,
	keyField
) => {
	const collectionRef = collection(db, collectionKey);

	const batch = writeBatch(db);

	objectsData.forEach(objectData => {
		const docRef = doc(collectionRef, objectData[keyField].toLowerCase());

		batch.set(docRef, objectData);
	});

	batch.commit();
};

export const getCategoriesAndItems = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};
