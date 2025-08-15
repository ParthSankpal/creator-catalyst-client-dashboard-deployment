// This is a mock API call using fetch.
// Replace the URL with your backend endpoint

export async function registerUser(formData) {
  try {
    console.log(formData);
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }

    const data = await response.json();
    return data; // returned user object
  } catch (error) {
    throw error;
  }
}
