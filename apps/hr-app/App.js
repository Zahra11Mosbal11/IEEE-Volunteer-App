import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

/**
 * The root component of the IEEE HR App.
 * It wraps the application with the Authentication Provider and renders the Navigation.
 *
 * @returns {JSX.Element} The App root component
 */
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
