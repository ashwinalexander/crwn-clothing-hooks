// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDL9SHYO8n7c8-K-sxlFzgJXWAdoGWLdf4',
	authDomain: 'crwn-clothing-db-5ec80.firebaseapp.com',
	projectId: 'crwn-clothing-db-5ec80',
	storageBucket: 'crwn-clothing-db-5ec80.appspot.com',
	messagingSenderId: '591555751823',
	appId: '1:591555751823:web:cbd7d49f9dab99a98165fa'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

//authorization
export const auth = getAuth(); //singleton
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

//database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	//check if the user id exists
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	//create document if it doesn't exist
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		//set inside database
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailandPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
