export const fetchCertData = async (token) => {
  try {
    const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/get_cert_status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch certificate:', error);
    throw error;
  }
};