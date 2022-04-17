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

const removeCartItem = (cartItems, cartItemToRemove) => {
	//find cart item to remove

	//else return item with reduced quantity

	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//if quantity is equal to 1, remove item
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	} else {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
				? {
						...cartItem,
						quantity: cartItem.quantity - 1
				  }
				: cartItem
		);
	}
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	cartCount: 0,
	clearItemFromCart: () => {},
	cartTotal: 0
});

export const CartProvider = ({ children }) => {
	//get
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	//this will run anytime something in our dependency array changes (ie cartItems)
	//you want your functions to be single responsibility and so it's okay to have more than one useEffect
	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	//this will run anytime something in our dependency array changes (ie cartItems)
	//you want your functions to be single responsibility and so it's okay to have more than one useEffect
	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	//triggers whenever user clicks add to cart
	//we could have called SetCartItems directly but we wanted to change the shape of the item by adding quantity
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	//triggers whenever user clicks remove from  cart
	//we could have called SetCartItems directly but we wanted to change the shape of the item by adding quantity
	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	//triggers whenever user remove from  cart on the checkout page
	//we could have called SetCartItems directly but we wanted to change the shape of the item by adding quantity
	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	//create new object with the flag and the setter of the flag
	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		removeItemFromCart,
		clearItemFromCart,
		cartTotal
	};

	//pass that object to the CartContext provider
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
