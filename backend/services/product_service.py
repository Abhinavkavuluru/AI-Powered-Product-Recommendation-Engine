import json
from config import config

class ProductService:
    """
    Service to handle product data operations
    """
    
    def __init__(self):
        """
        Initialize the product service with data path from config
        """
        self.data_path = config['DATA_PATH']  # Path to the products JSON file
        self.products = self._load_products()
    
    def _load_products(self):
        """
        Load products from the JSON data file
        """
        try:
            with open(self.data_path, 'r') as file:
                return json.load(file)
        except Exception as e:
            print(f"Error loading product data: {str(e)}")
            return []
    
    def get_all_products(self):
        """
        Return all products
        """
        return self.products
    
    def get_product_by_id(self, product_id):
        """
        Get a specific product by ID
        """
        for product in self.products:
            if product['id'] == product_id:
                return product
        return None
    
    def get_products_by_category(self, category):
        """
        Get products filtered by category
        """
        return [p for p in self.products if p['category'] == category]
    
    def filter_products(self, preferences):
        """
        Filter products based on user preferences: price range, categories, and brands
        """
        filtered = self.products

        # Filter by price range
        if preferences["priceRange"] != "all":
            price_range = preferences["priceRange"].split("-")
            min_price = float(price_range[0])
            max_price = float(price_range[1])
            filtered = [p for p in filtered if min_price <= p["price"] <= max_price]

        # Filter by categories
        if preferences["categories"]:
            filtered = [p for p in filtered if p["category"] in preferences["categories"]]

        # Filter by brands
        if preferences["brands"]:
            filtered = [p for p in filtered if p["brand"] in preferences["brands"]]

        return filtered

    def get_products_from_browsing_history(self, browsing_history):
        """
        Get products based on browsing history (product IDs)
        """
        browsed_products = []
        for product_id in browsing_history:
            product = self.get_product_by_id(product_id)
            if product:
                browsed_products.append(product)
        return browsed_products
