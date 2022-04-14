import { createContext, useEffect, useState } from 'react';

//helps us add new products in and keep track of the quantity
const addCartItem = (cartItems, productToAdd) => {
	//find if cartItems contains productToAdd
	//if found, increment quantity
	//return new array with modified cartItems / new cart Item

	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? {
						...cartItem,
						quantity: cartItem.quantity + 1
				  }
				: cartItem
		);
	} else {
		return [...cartItems, { ...productToAdd, quantity: 1 }];
	}
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0
});

export const CartProvider = ({ children }) => {
	//get
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	//this will run anytime something in our dependency array changes (ie cartItems)
	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	//triggers whenever user clicks add to cart
	//we could have called SetCartItems directly but we wanted to change the shape of the item by adding quantity
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	//create new object with the flag and the setter of the flag
	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount
	};

	//pass that object to the CartContext provider
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
