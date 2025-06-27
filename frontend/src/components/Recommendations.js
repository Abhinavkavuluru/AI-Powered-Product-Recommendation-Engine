import React from 'react';

const Recommendations = ({ recommendations, isLoading }) => {
  // Ensure that recommendations is not empty and is an array
  console.log("Recommendations passed to component:", recommendations);  // Log recommendations
  
  return (
    <div className="recommendations-container">
      {isLoading ? (
        <p>Loading recommendations...</p>
      ) : recommendations && recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <h3>{rec.product.name}</h3>  {/* Correctly access product name */}
              <p>{rec.explanation}</p>  {/* Correctly access explanation */}
              <p>Confidence Score: {rec.confidence_score}</p>  {/* Correctly access score */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations yet. Set your preferences and browse some products!</p>
      )}
    </div>
  );
};


export default Recommendations;
