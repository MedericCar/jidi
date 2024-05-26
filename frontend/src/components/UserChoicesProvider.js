import React, { createContext, useState } from 'react';

export const UserChoicesContext = createContext();

export const UserChoicesProvider = ({ children }) => {
  const [userChoices, setUserChoices] = useState({});

  return (
    <UserChoicesContext.Provider value={{ userChoices, setUserChoices }}>
      {children}
    </UserChoicesContext.Provider>
  );
};
