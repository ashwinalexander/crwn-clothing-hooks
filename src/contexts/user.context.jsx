import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
//very similar to a component that wraps around other components

//actual value you want to access : default value, not initial value
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
});

//functional component with children,
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	//run this function only once when the component mounts (so empty array)
	//similar to component mount
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log(user);

			if (user) {
				createUserDocumentFromAuth(user);
			}

			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	//for every context that gets built there is a provider
	//provider lets you get value and the setter func anyone within the component tree
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
