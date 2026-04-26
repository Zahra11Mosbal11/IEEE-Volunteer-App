/**
 * Fetches the user's certificate progress status.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The API response containing certificate criteria and progress.
 * @throws Will throw an error if the request fails.
 */
export const fetchCertData = async (token) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/get_cert_status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("certificate response:", response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch certificate:', error);
    throw error;
  }
};