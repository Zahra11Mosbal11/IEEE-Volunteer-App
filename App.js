import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

/**
 * The root component of the IEEE Volunteer App.
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
