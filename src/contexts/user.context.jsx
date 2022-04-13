import { createContext } from 'react';
import { useState } from 'react';

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

	//for every context that gets built there is a provider
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
