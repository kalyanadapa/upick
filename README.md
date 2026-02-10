# Upick – Full Stack MERN E-Commerce Application

A full-stack e-commerce web application built using the MERN stack.  
The platform supports role-based access for customers and store owners, product management, payments, and advanced filtering.

---

## Live Demo
https://upick-1.onrender.com/

---

## Features

### User Features
- Browse products by category and brand
- View product details
- Add to cart
- Wishlist functionality
- Secure checkout using Stripe
- Sorting and filtering by category, price, and features

### Store Owner Features
- Add new products
- Upload product images using Cloudinary
- Create categories and brands
- Manage product inventory
- Role-based dashboard

### System Features
- Role-based authentication and authorization
- Separate UI for users and store owners
- Image upload and optimization via Cloudinary
- Stripe payment integration
- Sorting and filtering functionality
- Responsive UI using Tailwind CSS

---

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Rtk Query for state management
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Integrations:
- Stripe Payment Gateway
- Cloudinary Image Upload

Deployment:
- Render

---

## Screenshots
### Admin login
<img width="1433" height="817" alt="image" src="https://github.com/user-attachments/assets/e8d893b8-3058-4472-9f2f-ba018f13b5d3" />

### Home Page

<img width="1440" height="809" alt="image" src="https://github.com/user-attachments/assets/b94c36cd-3d8b-4308-911d-c73a750f14b8" />

### Category Page
<img width="1435" height="816" alt="image" src="https://github.com/user-attachments/assets/af5d282f-73c0-44ec-a969-e281c6314d66" />


### Product Page
<img width="1440" height="816" alt="image" src="https://github.com/user-attachments/assets/3036e7d5-163c-4330-a1f4-74a932f69d30" />



## Architecture Overview

Client:
- Handles UI rendering
- Manages state
- Calls REST APIs

Server:
- Handles authentication
- Product CRUD operations
- Payment processing
- Image upload

Database:
- Stores users, products, orders, categories, brands

---


