import React from 'react';

const BrowsingHistory = ({ history, products, onClearHistory }) => {
  // Function to find a product by its ID
  const getProductById = (productId) => {
    console.log("Searching for product with ID:", productId);  // Log the product ID being searched
    return products ? products.find(product => String(product.id) === String(productId)) : null;  // Ensure matching is done correctly
  };

  return (
    <div className="history-container">
      <h3>Your Browsing History</h3>
      <ul>
        {history.length > 0 ? (
          history.map((productId, index) => {
            const product = getProductById(productId);  // Find the product by ID
            return (
              <li key={index}>
                {product ? `${product.name} - ${product.category}` : "Product not found"}
              </li>
            );
          })
        ) : (
          <p>No products in your browsing history.</p>
        )}
      </ul>
      <button onClick={onClearHistory}>Clear History</button>
    </div>
  );
};

export default BrowsingHistory;
