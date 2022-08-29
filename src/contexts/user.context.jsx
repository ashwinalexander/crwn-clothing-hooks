import { createContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//very similar to a component that wraps around other components

//actual value you want to access : default value, not initial value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER"
};

//function that takes initial state, action and returns updated state depending on the action
const userReducer = (state, action) => {
  console.log("dispatch");
  console.log(action, "this is the action");
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null
};

//functional component with children,
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  console.log(currentUser, "this is the current user");

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  //run this function only once when the component mounts (so empty array)
  //similar to component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      console.log("setting current userr here");
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  //for every context that gets built there is a provider
  //provider lets you get value and the setter func anyone within the component tree
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
