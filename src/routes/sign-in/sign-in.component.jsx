import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect,
	signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

//auth = tracks auth states for websites and firebase instance
const SignIn = () => {
	useEffect(async () => {
		const response = await getRedirectResult(auth);
		if (response) {
			const userDocRef = await createUserDocumentFromAuth(response.user);
		}
	}, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	const logGoogleRedirectUser = async () => {
		const { user } = await signInWithGoogleRedirect();
		console.log(user);
	};

	return (
		<div>
			<h2>Sign In page</h2>
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>
			<button onClick={logGoogleRedirectUser}>
				Sign In with Google Redirect
			</button>
		</div>
	);
};

export default SignIn;
