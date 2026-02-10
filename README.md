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
- Redux Toolkit (if used, add here)
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

### Home Page
![Home](screenshots/home.png)

### Category Page
![Category](screenshots/category.png)

### Product Page
![Product](screenshots/product.png)

### Wishlist
![Wishlist](screenshots/wishlist.png)

---

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

## Folder Structure

