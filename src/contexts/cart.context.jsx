import { createContext, useState } from 'react';

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {}
});

export const CartProvider = ({ children }) => {
	//get
	const [isCartOpen, setIsCartOpen] = useState(false);

	//create new object with the flag and the setter of the flag
	const value = { isCartOpen, setIsCartOpen };

	//pass that object to the CartContext provider
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
