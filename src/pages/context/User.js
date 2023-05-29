import React, { createContext, useState } from "react";

const INITIAL_STATE = {
  post: {
    modalActivate: true,
  },
};

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useState(INITIAL_STATE);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
