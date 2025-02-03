# E-Commerce Full-Stack Application

## 📌 Overview
This is a full-stack e-commerce application built using **Node.js, Express.js, MongoDB** for the backend and **React.js** for the frontend. It includes essential e-commerce functionalities like authentication, product management, cart handling, payments, and analytics.

## 🚀 Features
### 🛒 User Features
- **User Authentication** (Sign up, Login, Logout)
- **Browse Products** (Categories, Featured Products, Product Details)
- **Add to Cart & Remove Items**
- **Apply Coupons for Discounts**
- **Checkout with Stripe Payment Integration**
- **Order Summary & Purchase Confirmation**
- **Personalized Product Recommendations**

### 🛠️ Admin Features
- **Create, Edit, and Delete Products**
- **View Analytics Dashboard** (Track Orders, Sales, and User Activity)

### 📊 Tech Stack
#### **Frontend:**
- React.js (Components-based UI)
- React Router (Navigation)
- Redux (State Management)
- Tailwind CSS (Styling)

#### **Backend:**
- Node.js & Express.js (REST API)
- MongoDB & Mongoose (Database)
- Redis (Caching)
- Cloudinary (Image Uploads)
- Stripe (Payment Gateway)

## 📂 Project Structure
```
/backend
  ├── controllers/       # Handles business logic (Auth, Cart, Payment, etc.)
  ├── models/            # Mongoose Models (User, Product, Order, Coupon)
  ├── routes/            # API Routes (Auth, Cart, Products, Payments)
  ├── middleware/        # Authentication & Error Handling Middleware
  ├── lib/               # Third-party service integrations (Cloudinary, Stripe, Redis)
  ├── server.js          # Entry point of the backend

/frontend
  ├── src/
      ├── components/    # Reusable UI components (Product Card, Cart, etc.)
      ├── pages/         # React Pages (Home, Cart, Login, Admin)
      ├── stores/        # Redux Store for State Management
      ├── main.jsx       # React Entry Point
      ├── index.css      # Global Styles
  ├── public/            # Static Files
  ├── package.json       # Dependencies & Scripts
```

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/naggarx/Ecommerce.git
```
### **2️⃣ Install Dependencies**
```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
### **3️⃣ Setup Environment Variables**
Create a `.env` file in the **backend** directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_URL=your_redis_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
![Admin Screenshot](https://github.com/naggarx/Ecommerce/blob/main/frontend/public/Admin.png)

