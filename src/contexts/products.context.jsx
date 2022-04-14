import { createContext, useContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

//actual value you want to access : default value, not initial value
export const ProductsContext = createContext({
	products: []
});

//for any context,we need both context value and the provider
export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState(PRODUCTS);
	const value = { products };
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
