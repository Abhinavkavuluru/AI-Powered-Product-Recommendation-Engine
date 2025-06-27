import React from 'react';

const UserPreferences = ({ preferences, onPreferencesChange }) => {
  const handlePriceRangeChange = (e) => {
    onPreferencesChange({ priceRange: e.target.value });
  };

const handleCategoriesChange = (e) => {
  const value = e.target.value;
  onPreferencesChange({ categories: value ? [value] : [] });  // Ensure it's an array
};

const handleBrandsChange = (e) => {
  const value = e.target.value;
  onPreferencesChange({ brands: value ? [value] : [] });  // Ensure it's an array
};


  return (
    <div className="preferences-container">
      <h3>Your Preferences</h3>

      <label>Price Range:</label>
      <select value={preferences.priceRange} onChange={handlePriceRangeChange}>
        <option value="all">All</option>
        <option value="0-50">0 - 50</option>
        <option value="51-100">51 - 100</option>
        <option value="101-200">101 - 200</option>
        <option value="201-500">201 - 500</option>
      </select>

      <label>Categories:</label>
      <select value={preferences.categories[0] || ""} onChange={handleCategoriesChange}>
        <option value="">Select Category</option>
        <option value="Footwear">Footwear</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Sportswear">Sportswear</option>
        <option value="Accessories">Accessories</option>
      </select>

      <label>Brands:</label>
      <select value={preferences.brands[0] || ""} onChange={handleBrandsChange}>
        <option value="">Select Brand</option>
        <option value="Nike">Nike</option>
        <option value="Apple">Apple</option>
        <option value="Adidas">Adidas</option>
        <option value="Samsung">Samsung</option>
        <option value="Sony">Sony</option>
      </select>
    </div>
  );
};

export default UserPreferences;
