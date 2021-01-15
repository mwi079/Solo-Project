import { useReducer, createContext } from "react";

const token = window.localStorage.getItem("token");

const initialState = {
  user: null,
  isAuth: token ? true : false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload,
      };
    case "isAuth":
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      throw new Error();
  }
}

// useReducer cannot be used outside of component so I create one
// that return state and dispatch
const Store = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

const StateContext = createContext();
export { Store, StateContext };
