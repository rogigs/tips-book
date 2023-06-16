import React, { createContext, useContext, useMemo, useReducer } from "react";
import { INITIAL_STATE } from "./initialState";
import { reducer } from "./reducer";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(() => ({ state, dispatch }), []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
