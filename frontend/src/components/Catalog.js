import React, { useState } from 'react';

const Catalog = ({ products, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4; // Display 4 products per page (2x2 grid)

  // Handle left and right scroll
  const handleScroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(Math.max(0, currentIndex - productsPerPage));
    } else {
      setCurrentIndex(Math.min(products.length - productsPerPage, currentIndex + productsPerPage));
    }
  };

  return (
    <div className="catalog-container">
      <div className="scroll-container">
        <button
          className="scroll-arrow left"
          onClick={() => handleScroll('left')}
        >
          &#8592;
        </button>

        <div className="product-list">
          {products.slice(currentIndex, currentIndex + productsPerPage).map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => onProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>

        <button
          className="scroll-arrow right"
          onClick={() => handleScroll('right')}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Catalog;
