// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
// import { faker } from '@faker-js/faker';
// import Product from "./models/product.model.js";
// import mongoose from 'mongoose';
import {app} from './app.js'
//import Brand from "./models/brand.model.js";
dotenv.config({
    path: './.env'
})

// const brands = [
//     {
//       name: "Adidas",
//       logo: "",
//       description: "Adidas creates sportswear, shoes, and accessories for athletes.",
//     },
//     {
//       name: "Reebok",
//       logo: "reebok-logo-url",
//       description: "",
//     },
//     {
//       name: "Under Armour",
//       logo: "",
//       description: "Under Armour specializes in sports apparel, shoes, and accessories.",
//     },
//     {
//       name: "Asics",
//       logo: "",
//       description: "Asics is known for their running shoes and sports gear.",
//     },
//     {
//       name: "New Balance",
//       logo: "",
//       description: "New Balance creates athletic footwear and apparel.",
//     },
//     {
//       name: "Converse",
//       logo: "",
//       description: "Converse is famous for its iconic sneakers.",
//     },
//     {
//       name: "Vans",
//       logo: "",
//       description: "Vans is a popular brand for skateboarding and lifestyle shoes.",
//     },
//     {
//       name: "Fila",
//       logo: "",
//       description: "Fila is known for its athletic and casual footwear.",
//     },
//     {
//       name: "Others", // A placeholder for brands with missing logo or description
//       logo: "", // No logo
//       description: "This category includes brands without a logo or description.",
//     },
//   ];
//   async function insertBrands() {
//     try {
//       // Check if the brands already exist to prevent duplicates
//       const existingBrands = await Brand.find({ name: { $in: brands.map(b => b.name) } });
  
//       if (existingBrands.length === 0) {
//         // Insert brands if none are found
//         await Brand.insertMany(brands);
//         console.log("Brands inserted successfully!");
//       } else {
//         console.log("Brands already exist in the database.");
//       }
//     } catch (error) {
//       console.error("Error inserting brands:", error);
//     }
//   }
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        // generateAndInsertProducts();
        //updateSubcategoryNames();
        // insertBrands();
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



// const updateSubcategoryNames = asyncHandler(async () => {
//   // 1️⃣ Find all products where subcategory only has an _id and no name
//   const productsToUpdate = await Product.find({
//     "subcategory.name": { $exists: false }, // Only fetch products where subcategory name is missing
//   });

//   // 2️⃣ Iterate over the products to update the subcategory with the name
//   for (let product of productsToUpdate) {
//     const subcategoryId = product.subcategory._id;

//     // 3️⃣ Fetch the category that contains the subcategory
//     const category = await Category.findOne({ "subcategories._id": subcategoryId });
//     if (!category) {
//       console.log(`Category not found for subcategory: ${subcategoryId}`);
//       continue; // Skip if no category found
//     }

//     // 4️⃣ Find the subcategory inside the category's subcategories
//     const subcategory = category.subcategories.find(sub => sub._id.toString() === subcategoryId.toString());

//     if (subcategory) {
//       // 5️⃣ Update the product with both the _id and name of the subcategory
//       product.subcategory = {
//         _id: subcategory._id,
//         name: subcategory.name,
//       };

//       // Save the updated product
//       await product.save();
//       console.log(`Updated product with id: ${product._id} - Subcategory: ${subcategory.name}`);
//     }
//   }

//   return "Subcategories updated successfully!";
// });

// Run the script



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