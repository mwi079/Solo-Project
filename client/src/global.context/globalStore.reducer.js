import { useReducer, createContext } from "react";
import { getProfile } from "../services/ApiUserClientService";

const token = window.localStorage.getItem("token");

function getUserProfile(token) {
  return getProfile(token)
    .then((res) => res.data)
    .catch((error) => console.error(error));
}

// async function setUser(token) {
//   const result = await getUserProfile(token);
//   return result;
// }

const initialUser = token
  ? getUserProfile(token).then((user) => user.data)
  : null;

const initialState = {
  user: initialUser,
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
