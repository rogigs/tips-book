import React, { createContext, useContext, useReducer } from "react";
import { INITIAL_STATE } from "./initialState";
import { reducer } from "./reducer";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
