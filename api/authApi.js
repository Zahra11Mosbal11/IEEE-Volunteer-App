/**
 * Fetches protected user data from the authentication success endpoint.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The API response data containing user info.
 * @throws Will throw an error if the request fails.
 */
export const fetchProtectedData = async (token) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/auth/success', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch protected data:', error);
    throw error;
  }
};