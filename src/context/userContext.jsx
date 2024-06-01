import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserAndPersist = (userData) => {
    setUser(userData);
    // logique de persistance si nécessaire
  };

  const clearUser = () => {
    setUser(null);
    // logique de suppression de la persistance si nécessaire
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
