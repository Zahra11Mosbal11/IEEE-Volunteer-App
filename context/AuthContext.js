import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

/**
 * Provides authentication state and actions (login, logout, token verification)
 * to the rest of the application.
 *
 * @param {Object} props - React components
 * @param {React.ReactNode} props.children - Child components that require auth context
 * @returns {JSX.Element} The AuthContext provider
 */
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const login = async (token) => {
    await SecureStore.setItemAsync('userToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  };

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    setUserToken(token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
