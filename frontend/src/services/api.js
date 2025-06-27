const API_BASE_URL = 'http://localhost:8000/api'; // Correct the port to 8000

// Centralized function for handling the fetch requests
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('An error occurred while processing your request.');
  }
};

// Fetch all products from the API
export const fetchProducts = async () => {
  return await fetchData(`${API_BASE_URL}/products`);
};

// Get recommendations based on user preferences and browsing history
export const getRecommendations = async (preferences, browsingHistory) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      preferences,
      browsing_history: browsingHistory,
    }),
  };

  console.log("Sending preferences:", preferences);
  console.log("Sending browsing history:", browsingHistory);

  return await fetchData(`${API_BASE_URL}/recommendations`, options);  // Get response from backend
};

