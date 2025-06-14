import mongoose from "mongoose"
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js"
import Category from "../models/category.model.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { productTypes } from "../config/ProductTypes.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from "jsonwebtoken"
// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate({
      path: "category", // Populate the category field
      select: "_id name", // Select category name and _id only
    });

  // No need to look up subcategories since it's already included in the product
  const result = products.map(product => {
    return {
      ...product.toObject(),
      category: {
        _id: product.category._id,
        name: product.category.name,
      },
      // Directly use the subcategory from the product itself
      subcategory: product.subcategory ? { _id: product.subcategory._id, name: product.subcategory.name } : null,
    };
  });

  return res.status(200).json(new ApiResponse(200, result, "All Products fetched Successfully"));
});

export const getAllProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { category, subcategories, minPrice, maxPrice } = req.query;

    let query = {};
    if (category) query.category = category;

    if (subcategories) {
      const subcategoryIds = subcategories.split(",").map(id => id.trim());

      if (!category) {
        return res.status(400).json({ error: "Category must be provided with subcategories" });
      }

      const parentCategory = await Category.findById(category);
      if (!parentCategory) return res.status(404).json({ error: "Category not found" });

      const validSubIds = parentCategory.subcategories.map(sub => sub._id.toString());
      const invalid = subcategoryIds.filter(id => !validSubIds.includes(id));
      if (invalid.length > 0) {
        return res.status(400).json({ error: `Invalid subcategories: ${invalid}` });
      }

      query["subcategory._id"] = { $in: subcategoryIds.map(id => new mongoose.Types.ObjectId(id)) };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(query)
      .populate("category", "_id name")
      .sort({ price: 1 })
      .lean();

    let updatedProducts = products;
    const token = req.cookies?.accessToken;
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        userId = decoded._id;
        const user = await User.findById(userId).select("wishlist");

        if (user) {
          updatedProducts = products.map(prod => ({
            ...prod,
            is_liked: user.wishlist.some(wishId => wishId.toString() === prod._id.toString())
          }));
        }
      } catch (err) {
        console.error("JWT error or user fetch failed:", err.message);
      }
    } else {
      updatedProducts = products.map(prod => ({ ...prod, is_liked: false }));
    }

    return res.status(200).json({
      success: true,
      data: updatedProducts,
      message: "Products fetched successfully"
    });
  } catch (err) {
    console.error("Unhandled error in product fetch:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  console.log("Received product ID:", req.params.id);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.error("Invalid Product ID Format");
    return res.status(400).json({ error: "Invalid Product ID" });
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    console.error("Product not found");
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json(product);
});

// export const createProduct = asyncHandler(async (req, res) => {
//   const { name, brand, category, subcategory, description, price, quantity, countInStock } = req.body;

//   // Validation
//   if (!name || !brand || !category || !price) {
//     throw new ApiError(400, "All required fields must be provided");
//   }

//   // Check for uploaded files
//   if (!req.files || req.files.length === 0) {
//     throw new ApiError(400, "At least one product image is required");
//   }

//   console.log("Uploaded Files: ", req.files); // Debug log

//   // Upload each image to Cloudinary and store URLs
//   let productImageUrls = [];

//   try {
//     for (const file of req.files) {
//       const cloudinaryResult = await uploadOnCloudinary(file.path);
//       if (cloudinaryResult) {
//         productImageUrls.push(cloudinaryResult.url);
//       }
//     }

//     if (productImageUrls.length === 0) {
//       throw new ApiError(400, "Product image upload failed");
//     }
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     throw new ApiError(500, "Product image upload failed");
//   }

//   // Create new product
//   const newProduct = new Product({
//     name,
//     brand,
//     category,
//     subcategory,
//     description,
//     price,
//     quantity,
//     countInStock,
//     images: productImageUrls, // Store array of image URLs
//   });

//   await newProduct.save();

//   return res.status(201).json(new ApiResponse(201, newProduct, "Product created successfully"));
// });

// Update a product (Admin protected)

// export const createProduct = asyncHandler(async (req, res) => {
//   const { name, brand, category, subcategory, description, price, quantity, countInStock } = req.body;

//   // 1️⃣ Validate Required Fields
//   if (!name || !brand || !category || !subcategory || !price) {
//     throw new ApiError(400, "All required fields must be provided");
//   }
//   const brandData = await Brand.findById(brand);  // Assuming Brand is a model
//   if (!brandData) {
//     throw new ApiError(404, "Brand not found");
//   }
//   // 2️⃣ Check if category exists
//   const categoryData = await Category.findById(category);
//   if (!categoryData) {
//     throw new ApiError(404, "Category not found");
//   }

//   // 3️⃣ Find subcategory inside the category's subcategories array
//   const subcategoryData = categoryData.subcategories.find(sub => sub._id.toString() === subcategory);
//   if (!subcategoryData) {
//     throw new ApiError(404, "Subcategory not found in the selected category");
//   }

//   // 4️⃣ Upload product images to Cloudinary (if files exist)
//   let productImageUrls = [];
//   if (req.files?.length > 0) {
//     const uploadPromises = req.files.map(async (file) => {
//       const cloudinaryResult = await uploadOnCloudinary(file.path);
//       return cloudinaryResult?.url;
//     });

//     productImageUrls = (await Promise.all(uploadPromises)).filter(url => url); // Remove undefined values
//   }

//   // 5️⃣ Create new product with subcategory (_id + name)
//   const newProduct = new Product({
//     name,
//     brand: {
//       _id: brandData._id,      // Store brand ID
//       name: brandData.name,    // Store brand name
//     },
//     category, // Stores only the category ID
//     subcategory: {
//       _id: subcategoryData._id,
//       name: subcategoryData.name, // Store subcategory name dynamically
//     },
//     description,
//     price,
//     quantity,
//     countInStock,
//     images: productImageUrls,
//   });

//   // 6️⃣ Save product
//   await newProduct.save();
//   return res.status(201).json(new ApiResponse(201, newProduct, "Product created successfully"));
// });


export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, subcategory, description, price, quantity, countInStock, discountPrice,type } = req.body;

  // 1️⃣ Validate Required Fields
  if (!name || !brand || !category || !subcategory || !price || !quantity || !countInStock) {
    throw new ApiError(400, "All required fields must be provided");
  }
  if (!productTypes[type]) {
    throw new ApiError(400, "Invalid product type");
  }
  // 2️⃣ Check if the brand exists
  const brandData = await Brand.findById(brand);
  if (!brandData) {
    throw new ApiError(404, "Brand not found");
  }

  // 3️⃣ Check if category exists
  const categoryData = await Category.findById(category);
  if (!categoryData) {
    throw new ApiError(404, "Category not found");
  }

  // 4️⃣ Find subcategory inside the category's subcategories array
  const subcategoryData = categoryData.subcategories.find(sub => sub._id.toString() === subcategory);
  if (!subcategoryData) {
    throw new ApiError(404, "Subcategory not found in the selected category");
  }

  // 5️⃣ Upload product images to Cloudinary (if files exist)
  let productImageUrls = [];
  if (req.files?.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const cloudinaryResult = await uploadOnCloudinary(file.path);
      return cloudinaryResult?.url;
    });

    productImageUrls = (await Promise.all(uploadPromises)).filter(url => url); // Remove undefined values
  }

  // 6️⃣ Create new product
  const newProduct = new Product({
    name,
    brand: {
      _id: brandData._id,       // Store brand ID
      name: brandData.name,     // Store brand name
    },
    category,                   // Stores only the category ID
    subcategory: {
      _id: subcategoryData._id,
      name: subcategoryData.name, // Store subcategory name dynamically
    },
    description,
    price,
    quantity,
    countInStock,
    discountPrice,              // Optional field
    rating: 0,                  // Default rating is 0 for new product
    numReviews: 0,              // Default number of reviews is 0
    images: productImageUrls,    // Array of image URLs from Cloudinary
    type, 
  });

  // 7️⃣ Save product
  await newProduct.save();
  
  // 8️⃣ Return success response
  return res.status(201).json(new ApiResponse(201, newProduct, "Product created successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, subcategory, description, price, countInStock } = req.body;

  // Find the product by ID
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");  // Use ApiError for not found error
  }

  // Update fields
  product.name = name || product.name;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.subcategory = subcategory || product.subcategory;
  product.description = description || product.description;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;

  // Handle file uploads if any
  if (req.files?.images) {
    product.images = req.files.images.map(file => file.path);  // Update images
  }

  await product.save();

  return res.status(200).json(ApiResponse.success(product));  // Use ApiResponse for success
});

// Delete a product (Admin protected)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");  // Use ApiError for not found error
  }

  await product.remove();

  return res.status(200).json(ApiResponse.success({ message: "Product deleted successfully" }));  // Success message
});
