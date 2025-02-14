// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
// import { faker } from '@faker-js/faker';
// import Product from "./models/product.model.js";
// import mongoose from 'mongoose';
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        // generateAndInsertProducts();
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// const generateProduct = (categoryId, subcategoryId) => {
//     return {
//       name: faker.commerce.productName(),
//       images: ["https://t3.ftcdn.net/jpg/04/83/25/50/360_F_483255019_m1r1ujM8EOkr8PamCHF85tQ0rHG3Fiqz.jpg"],
//       brand: faker.company.name(),
//       quantity: faker.number.int({ min: 1, max: 100 }),
//       category: categoryId,
//       subcategory: subcategoryId,
//       description: faker.lorem.paragraph(),
//       rating: faker.number.int({ min: 1, max: 5 }),
//       numReviews: faker.number.int({ min: 1, max: 10 }),
//       price: parseFloat(faker.commerce.price()),
//       countInStock: faker.number.int({ min: 1, max: 100 }),
//     };
//   };
  
//   // Function to generate and insert products into the database
//   const generateAndInsertProducts = async () => {
//     const categories = [
//       new mongoose.Types.ObjectId('67a99efab53d4f6a8895945f'), // Example category IDs
//       new mongoose.Types.ObjectId('67a99f3cb53d4f6a8895946c'),
//     ];
  
//     const subcategories = [
//       new mongoose.Types.ObjectId('67a99efab53d4f6a88959460'),
//       new mongoose.Types.ObjectId('67a99efab53d4f6a88959461'),
//       new mongoose.Types.ObjectId('67a99efab53d4f6a88959462'),
//       new mongoose.Types.ObjectId('67a99efab53d4f6a88959463'),
//       new mongoose.Types.ObjectId('67a99f3cb53d4f6a8895946d'),
//       new mongoose.Types.ObjectId('67a99f3cb53d4f6a8895946e'),
//       new mongoose.Types.ObjectId('67a99f3cb53d4f6a8895946f'),
//       new mongoose.Types.ObjectId('67a99f3cb53d4f6a88959470'),
//     ];
  
//     const products = [];
  
//     // Generate 10 products per category-subcategory pair
//     for (const category of categories) {
//       for (const subcategory of subcategories) {
//         for (let i = 0; i < 5; i++) {
//           const product = generateProduct(category, subcategory);
//           products.push(product);
//         }
//       }
//     }
  
//     // Insert products into the database
//     try {
//       await Product.insertMany(products);
//       console.log('Products inserted successfully!');
//       mongoose.disconnect(); // Ensure to disconnect after all insertions are complete
//     } catch (error) {
//       console.error('Error inserting products:', error);
//       mongoose.disconnect();
//     }
//   };







/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/