import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration settings
config = {
    'TOGETHER_API_KEY': os.getenv('TOGETHER_API_KEY'),  # API key from environment variable
    'MODEL_NAME': os.getenv('MODEL_NAME', 'llama-2/7b'),  # Default model is LLaMA-2
    'MAX_TOKENS': int(os.getenv('MAX_TOKENS', 500)),  # Default to 500 tokens
    'TEMPERATURE': float(os.getenv('TEMPERATURE', 0.7)),  # Default temperature 0.7
    'DATA_PATH': os.getenv('DATA_PATH', 'data/products.json')  # Default data path
}
