/**
 * Fetches the active yellow and red flags assigned to the user.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The API response containing arrays of flags.
 * @throws Will throw an error if the request fails.
 */
export const fetchFlagsData = async (token) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/get_flags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch flags:', error);
    throw error;
  }
};