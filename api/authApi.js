import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const { userToken, logout } = useContext(AuthContext);
const [message, setMessage] = useState('');
export const fetchProtectedData = async (token) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/auth/success', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });

    const data = await response.json();
    console.log('Protected API Response:', data);
    setMessage(data.message);
  } catch (error) {
    console.error('Failed to fetch protected data:', error);
  }
};