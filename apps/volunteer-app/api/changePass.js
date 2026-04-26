/**
 * Updates the user's password.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} oldPassword - The current password.
 * @param {string} newPassword - The new password.
 * @returns {Promise<Object>} The API response.
 * @throws Will throw an error if the request fails.
 */
export const updatePassword = async (token, oldPassword, newPassword) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/auth/update_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    });
    console.log("change password response:", response)
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
    }
    return data;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
};