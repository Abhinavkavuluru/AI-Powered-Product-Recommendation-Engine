from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from typing import List
import os

from services.llm_service import LLMService
from services.product_service import ProductService

# Initialize FastAPI app
app = FastAPI(title="AI Product Recommendation API")

# Enable CORS for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize services
product_service = ProductService()
llm_service = LLMService()

# Define request models
class UserPreferences(BaseModel):
    priceRange: str = "all"
    categories: List[str] = []
    brands: List[str] = []

class RecommendationRequest(BaseModel):
    preferences: UserPreferences
    browsing_history: List[str] = []

# Root route (http://127.0.0.1:8000/)
@app.get("/")
async def root():
    return {"message": "Welcome to the AI Product Recommendation API"}

# Endpoint to get all products
@app.get("/api/products")
async def get_products():
    """
    Return the full product catalog
    """
    try:
        products = product_service.get_all_products()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching products: " + str(e))

# Endpoint to get product recommendations
@app.post("/api/recommendations")
async def get_recommendations(request: RecommendationRequest):
    try:
        recommendations = llm_service.generate_recommendations(
            user_preferences=request.preferences.dict(),
            browsing_history=request.browsing_history,
            all_products=product_service.get_all_products()
        )
        return recommendations
    except Exception as e:
        print(f"Error occurred while generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating recommendations: " + str(e))



# Custom exception handler for more user-friendly error messages
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return {
        "error": str(exc),
        "message": "An unexpected error occurred while processing your request"
    }

# Start the FastAPI app with Uvicorn
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
