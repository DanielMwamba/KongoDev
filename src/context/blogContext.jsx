import React, { createContext, useState, useContext } from 'react';

const BlogContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  setUser: (user) => {},
  clearUser: () => {},
});

const BlogProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const setUserState = (action) => {
    switch (action.type) {
      case 'SET_USER':
        setUser(action.payload);
        break;
      case 'CLEAR_USER':
        setUser(null);
        break;
      default:
        break;
    }
  };

  return (
    <BlogContext.Provider
      value={{ isLoggedIn, user, login, logout, setUser: setUserState }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };