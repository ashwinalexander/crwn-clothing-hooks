import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	createUserDocumentFromAuth,
	signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

//auth = tracks auth states for websites and firebase instance
const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h2>Sign In page</h2>
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
