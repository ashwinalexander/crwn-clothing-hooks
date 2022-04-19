import { createContext, useContext, useState, useEffect } from 'react';
// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//actual value you want to access : default value, not initial value
export const CategoriesContext = createContext({
	categoriesMap: {}
});

//for any context, we need both context value and the provider
export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	//because getCandD is async, we want to call a new async func within the callback
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		};

		//and then call that async function within the callback. This is how to use an async function within useEffect
		getCategoriesMap();
	}, []);

	const value = { categoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
