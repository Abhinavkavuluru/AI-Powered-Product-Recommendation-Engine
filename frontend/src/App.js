import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory';
import { fetchProducts, getRecommendations } from './services/api';

function App() {
  // State for products catalog
  const [products, setProducts] = useState([]);
  
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({
    priceRange: 'all',
    categories: [],
    brands: []
  });
  
  // State for browsing history
  const [browsingHistory, setBrowsingHistory] = useState([]);
  
  // State for recommendations
  const [recommendations, setRecommendations] = useState([]);
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  
  // State to apply preferences to products
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);  // Initially, set filteredProducts to all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    loadProducts();
  }, []);

  // Handle product click to add to browsing history
  const handleProductClick = (productId) => {
    console.log("Product clicked, adding to history:", productId);  // Log product ID being added to history
    if (!browsingHistory.includes(productId)) {
      setBrowsingHistory([...browsingHistory, productId]);
    }
  };
  
  // Update user preferences
  const handlePreferencesChange = (newPreferences) => {
    setUserPreferences(prevPreferences => ({
      ...prevPreferences,
      ...newPreferences
    }));
  };

  // Apply the filters based on user preferences
  const applyFilters = () => {
    let filteredProductsList = [...products];
  
    // Filter by price range
    if (userPreferences.priceRange !== 'all') {
      const [minPrice, maxPrice] = userPreferences.priceRange.split('-').map(Number);
      filteredProductsList = filteredProductsList.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }
  
    // Category filter (case-insensitive)
if (userPreferences.categories.length > 0) {
  filteredProductsList = filteredProductsList.filter(product =>
    userPreferences.categories.some(cat => cat.toLowerCase() === product.category.toLowerCase())
  );
}

// Brand filter (case-insensitive)
if (userPreferences.brands.length > 0) {
  filteredProductsList = filteredProductsList.filter(product =>
    userPreferences.brands.some(brand => brand.toLowerCase() === product.brand.toLowerCase())
  );
}

  
    console.log("Filtered Products After Apply:", filteredProductsList);  // 👈 log here
  
    setFilteredProducts(filteredProductsList);
  };
  

  // Get recommendations based on preferences and browsing history
const handleGetRecommendations = async () => {
  setIsLoading(true);
  try {
    // Send preferences and browsing history to the backend API
    const response = await getRecommendations(userPreferences, browsingHistory);

    // Directly set recommendations in state, bypassing additional checks
    if (response && response.recommendations) {
      console.log("Recommendations received:", response.recommendations);
      setRecommendations(response.recommendations);  // Set recommendations directly
    } else {
      console.log("No recommendations or invalid response");
      setRecommendations([]);  // Clear if no recommendations
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
    setRecommendations([]);  // Set empty array if an error occurs
  } finally {
    setIsLoading(false);
  }
};






  
  // Clear browsing history
  const handleClearHistory = () => {
    setBrowsingHistory([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Powered Product Recommendation Engine</h1>
      </header>
      
      <main className="app-content">
        <div className="user-section">
          <UserPreferences 
            preferences={userPreferences}
            onPreferencesChange={handlePreferencesChange}
          />
          
          <button 
            className="apply-preferences-btn"
            onClick={applyFilters}  // Apply filters when clicked
          >
            Apply Preferences
          </button>
          
          <BrowsingHistory 
            history={browsingHistory}
            products={products}
            onClearHistory={handleClearHistory}
          />
          
          <button 
            className="get-recommendations-btn"
            onClick={handleGetRecommendations}
            disabled={isLoading}
          >
            {isLoading ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
          </button>
        </div>
        
        <div className="catalog-section">
          <h2>Product Catalog</h2>
          <Catalog 
            products={filteredProducts}  /* Pass the filtered products */
            onProductClick={handleProductClick}
            browsingHistory={browsingHistory}
          />
        </div>
        
        <div className="recommendations-section">
          <h2>Your Recommendations</h2>
          <Recommendations 
            recommendations={recommendations}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
