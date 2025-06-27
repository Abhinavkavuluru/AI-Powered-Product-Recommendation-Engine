import requests
from config import config
from services.product_service import ProductService
import json

class LLMService:
    """
    Service to handle interactions with the LLM API (Together AI)
    """
    
    def __init__(self):
        """
        Initialize the LLM service with configuration
        """
        self.api_key = config['TOGETHER_API_KEY']  # Use the Together AI API key
        self.model_name = config['MODEL_NAME']
        self.api_url = "https://api.together.xyz/v1"  # Corrected endpoint URL
    
    def generate_recommendations(self, user_preferences, browsing_history, all_products):
        """
        Generate personalized product recommendations based on user preferences and browsing history
        
        Parameters:
        - user_preferences (dict): User's stated preferences
        - browsing_history (list): List of product IDs the user has viewed
        - all_products (list): Full product catalog
        
        Returns:
        - dict: Recommended products with explanations
        """
        # Filter products based on user preferences
        filtered_products = ProductService().filter_products(user_preferences)
        
        # Get products based on browsing history (product IDs)
        browsed_products = ProductService().get_products_from_browsing_history(browsing_history)
        
        # Create a prompt for the LLM
        prompt = self._create_recommendation_prompt(user_preferences, browsed_products, filtered_products)
        
        try:
            # Call Together AI's inference API to generate recommendations
            response = requests.post(
                self.api_url + "/chat/completions",  # Corrected endpoint path
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": self.model_name,
                    "messages": [{"role": "system", "content": "You are a product recommendation system."},
                                 {"role": "user", "content": prompt}],
                    "max_tokens": config['MAX_TOKENS'],
                    "temperature": config['TEMPERATURE']
                }
            )
            # Check if the response was successful
            response.raise_for_status()

            # Get the response JSON
            result_text = response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
            print(f"Together AI Response: {response.json()}")  # Log the raw response from Together AI

            # Parse the LLM response to extract recommendations
            recommendations = self._parse_recommendation_response(result_text, all_products)
            
            return recommendations
        except requests.exceptions.RequestException as e:
            # Improved error handling for API issues
            print(f"Error calling Together AI: {str(e)}")
            return {"recommendations": [], "error": f"API request failed: {str(e)}"}
        except Exception as e:
            # General error handling
            print(f"Failed to generate recommendations: {str(e)}")
            return {"recommendations": [], "error": f"Failed to generate recommendations: {str(e)}"}
    
    def _create_recommendation_prompt(self, user_preferences, browsed_products, filtered_products):
        """
        Create a prompt for the LLM to generate recommendations from real catalog

        Parameters:
        - user_preferences (dict): User's stated preferences
        - browsed_products (list): Products the user has viewed
        - filtered_products (list): Filtered products from the catalog based on preferences

        Returns:
        - str: Prompt for the LLM
        """
        prompt = "Based on the following user preferences, browsing history, and the product catalog, recommend 5 products with explanations.\n\n"

        # Add user preferences
        prompt += "User Preferences:\n"
        for key, value in user_preferences.items():
            prompt += f"- {key}: {value}\n"

        # Add browsing history
        prompt += "\nBrowsing History:\n"
        for product in browsed_products:
            prompt += f"- {product['name']} (Category: {product['category']}, Price: ${product['price']})\n"

        # Add filtered product catalog
        prompt += "\nProduct Catalog (Only recommend from these):\n"
        for p in filtered_products:
            prompt += f"- ID: {p['id']}, Name: {p['name']}, Category: {p['category']}, Price: ${p['price']}, Brand: {p['brand']}\n"

        # Instructions to the LLM
        prompt += (
            "\nPlease recommend 5 product IDs from the above catalog that best match the user's preferences and browsing history. "
            "For each recommendation, return:\n"
            "- product_id (must match one from the catalog above)\n"
            "- explanation (why this product is suitable)\n"
            "- score (1 to 10 confidence)\n\n"
            "Format the response as a JSON array with objects containing 'product_id', 'explanation', and 'score'."
        )

        return prompt

    
# Ensure the JSON response from Together AI is parsed properly
    def _parse_recommendation_response(self, llm_response, all_products):
        try:
            recommendations = []

            # Find the JSON part in the response
            start_idx = llm_response.find('[')
            end_idx = llm_response.rfind(']') + 1

            if start_idx == -1 or end_idx == 0:
                return {"recommendations": [], "error": "Failed to parse JSON response"}

            # Extract and parse the JSON string from the response
            json_str = llm_response[start_idx:end_idx]
            rec_data = json.loads(json_str)  # Ensure this is properly parsed as JSON

            # Match product IDs with full product details
            for rec in rec_data:
                product_id = rec.get('product_id')
                product_details = None

                # Match the product ID with full product info
                for product in all_products:
                    if product['id'] == product_id:
                        product_details = product
                        break

                if product_details:
                    recommendations.append({
                        "product": product_details,
                        "explanation": rec.get('explanation', ''),
                        "confidence_score": rec.get('score', 5)
                    })

            return {"recommendations": recommendations, "count": len(recommendations)}

        except Exception as e:
            print(f"Error parsing LLM response: {str(e)}")
            return {"recommendations": [], "error": f"Failed to parse recommendations: {str(e)}"}
    
