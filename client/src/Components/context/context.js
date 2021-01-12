import { createContext, useContext, useReducer } from "react";

// this context object will contain the authentication token and user details.
const AuthStateContext = createContext();

// this context object to pass the dispatch method given to us by the useReducer that we will be creating later to manage the state. This makes it easy to provide the dispatch method to components that need it.
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error("you must provide a context");
  return context;
}

export function useAuthDispatcH() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error("you must provide a context");
  return context;
}

export const AuthProvider = ({ children }) => {
  // keeps/manages state
  // useReducer returns a user object as state and a dispatch method for triggering state updates/changes
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
