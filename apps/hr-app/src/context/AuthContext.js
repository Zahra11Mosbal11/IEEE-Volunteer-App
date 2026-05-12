/**
 * @file AuthContext.js
 * @description Authentication context for managing user tokens and session state.
 */

import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

/**
 * AuthProvider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
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
