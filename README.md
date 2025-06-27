# **AI-Powered Product Recommendation Engine** ![AI](https://img.shields.io/badge/AI-Powered-blue?style=flat&logo=ai&logoColor=white)

**A powerful AI-driven product recommendation engine for eCommerce platforms** using **Meta-Llama-3.1-8B-Instruct-Turbo** and **React** for the frontend, with **FastAPI** powering the backend. This system generates personalized recommendations based on user preferences and browsing history.

---

## 🚀 **Features**

- **Personalized Recommendations**: Generate product suggestions tailored to the user's preferences and browsing history using advanced AI.
- **User Preferences Form**: Collect user preferences (price range, categories, brands) for a more accurate recommendation.
- **Product Catalog**: Dynamic product catalog with detailed information like price, category, brand, and rating.
- **Browsing History Tracking**: Keep track of products viewed by users to enhance future recommendations.
- **Interactive Frontend**: Built with **React**, providing a seamless experience for browsing and receiving recommendations.

---

## 🎯 **Demo**

[View Live Demo](https://your-demo-link.com)

---

## 🛠 **Technology Stack**

- **Backend**: FastAPI (Python)
- **Frontend**: React (JavaScript)
- **AI Model**: Meta-Llama-3.1-8B-Instruct-Turbo
- **Database**: Static product catalog in `products.json`
- **Deployment**: Docker (for containerized development and deployment)

---

## 💡 **How It Works**

1. **User Preferences**: Users input their preferences (price range, categories, and brands).
2. **Product Browsing**: Users browse the product catalog, adding viewed products to their browsing history.
3. **AI Recommendations**: Based on preferences and browsing history, the **Meta-Llama-3.1-8B-Instruct-Turbo** model generates personalized recommendations.
4. **Product Suggestions**: Users receive the top 5 product suggestions with explanations and confidence scores.

---

## ⚙️ **Setup Instructions**

### **Backend Setup**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Abhinavkavuluru/AI-Powered-Product-Recommendation-Engine.git
    cd backend
    ```

2. **Create a Virtual Environment**:
    - **Windows**:
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
    - **macOS/Linux**:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure Environment Variables**:
    Create a `.env` file in the root of the backend directory and add your **LLM API key**:
    ```bash
    TOGETHER_API_KEY=your-api-key
    MODEL_NAME=meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo
    MAX_TOKENS=500
    TEMPERATURE=0.7
    DATA_PATH=data/products.json
    ```

5. **Run the FastAPI Server**:
    ```bash
    uvicorn app:app --reload
    ```

   The backend will be accessible at `http://localhost:8000`.

### **Frontend Setup**

1. **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the React Development Server**:
    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

---

## 🛠 **API Documentation**

### **GET /api/products**
- **Description**: Fetches the complete product catalog.
- **Response**: A list of all products, including details like `id`, `name`, `category`, `price`, `brand`, etc.

### **POST /api/recommendations**
- **Description**: Generates personalized product recommendations based on user preferences and browsing history.
- **Request Body**:
    ```json
    {
      "preferences": {
        "priceRange": "0-50",
        "categories": ["Electronics", "Clothing"],
        "brands": ["Nike", "Apple"]
      },
      "browsing_history": ["product123", "product456"]
    }
    ```
- **Response**:
    ```json
    {
      "recommendations": [
        {
          "product": {
            "id": "product123",
            "name": "Ultra-Comfort Running Shoes",
            "category": "Footwear",
            "price": 89.99,
            "brand": "Nike"
          },
          "explanation": "These shoes are within your preferred price range and match your browsing history.",
          "confidence_score": 9
        }
      ]
    }
    ```

---

## 💡 **How to Use the Application**

1. **Set Preferences**: 
    - Select your preferred price range, categories, and brands under "Your Preferences".

2. **Browse Products**: 
    - Browse the catalog and add products to your browsing history.

3. **Get Recommendations**: 
    - Once preferences are set and products are browsed, click "Get Personalized Recommendations" to view tailored suggestions.

---

## 🧪 **Testing**

To run the backend API tests, execute:

```bash
pytest tests/test.py

