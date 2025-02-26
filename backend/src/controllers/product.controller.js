import mongoose from "mongoose"
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js"
import Category from "../models/category.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { productTypes } from "../config/ProductTypes.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
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
// export const getAllProductsByCategory = asyncHandler(async (req, res) => {
//   const { category, subcategories } = req.query;  
//   //console.log("Received subcategories:", subcategories);

//   let query = {};

//   // Case 1: If category is provided, filter by category
//   if (category) {
//     query.category = category;  
//   }

//   // Case 2: If subcategories are provided, convert it from string to an array
//   let subcategoryIds = [];
//   if (subcategories) {
//     subcategoryIds = subcategories.split(",").map(id => id.trim()); // Convert "1,2,3" -> ["1", "2", "3"]
//   }

//   // If subcategories exist, validate them against the category
//   if (subcategoryIds.length > 0) {
//     if (!category) {
//       return res.status(400).json(new ApiError(400, "Category must be provided to filter by subcategories"));
//     }

//     // Find the category first and get its subcategories
//     const parentCategory = await Category.findById(category);
//     if (!parentCategory) {
//       return res.status(404).json(new ApiError(404, "Category not found"));
//     }

//     //console.log("Parent Category:", parentCategory);

//     // Ensure provided subcategories belong to this category
//     const validSubcategoryIds = parentCategory.subcategories.map(sub => sub._id.toString());
//    // console.log("Valid Subcategory IDs:", validSubcategoryIds);
    
//     const invalidSubcategories = subcategoryIds.filter(id => !validSubcategoryIds.includes(id));

//     if (invalidSubcategories.length > 0) {
//       return res.status(400).json(new ApiError(400, `Some subcategories are not related to the provided category: ${invalidSubcategories}`));
//     }

//     // ✅ Corrected: Query subcategory._id instead of subcategory
//     query["subcategory._id"] = { $in: subcategoryIds.map(id => new mongoose.Types.ObjectId(id)) };
//   }

//   // Fetch products based on the constructed query
//   const products = await Product.find(query)
//     .populate({
//       path: "category",
//       select: "_id name",//removed the subcategories here
//     });

//   return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
// });


// export const getAllProductsByCategory = asyncHandler(async (req, res) => {
//   const { category, subcategories } = req.query;  // Get category and subcategory (or subcategories) from query params
//   console.log("logic",subcategories);
  
//   let query = {};

//   // Case 1: If category is provided, filter by category
//   if (category) {
//     query.category = category;  // Filter by category ID
//   }

//   // Case 2: If subcategories are provided (either one or multiple), filter by subcategory
//   if (subcategories) {
//     const subcategoryIds = Array.isArray(subcategories) ? subcategories : [subcategories];

//     // If category is provided, ensure subcategories are part of the category's subcategories
//     if (category) {
//       // Find the category first and get its subcategories directly (no need to populate)
//       const parentCategory = await Category.findById(category);
//       if (!parentCategory) {
//         return res.status(404).json(new ApiError(404, "Category not found"));
//       }

//       // Ensure the provided subcategories belong to this category
//       const validSubcategoryIds = parentCategory.subcategories.map(sub => sub._id.toString()); // Convert to string for comparison
//       const invalidSubcategories = subcategoryIds.filter(id => !validSubcategoryIds.includes(id));

//       if (invalidSubcategories.length > 0) {
//         return res.status(400).json(new ApiError(400, `Some subcategories are not related to the provided category: ${invalidSubcategories}`));
//       }

//       // Filter products that belong to the specified subcategories
//       query.subcategory = { $in: subcategoryIds }; 
//     } else {
//       return res.status(400).json(new ApiError(400, "Category must be provided to filter by subcategories"));
//     }
//   }

//   // Fetch products based on the constructed query
//   const products = await Product.find(query)
//     .populate({
//       path: "category", // Populate the category field
//       select: "_id name subcategories", // Select category and subcategories
//     });

//   // For each product, manually set the subcategory based on the saved subcategory ID
//   const result = products.map(product => {
//     if (product.category && product.category.subcategories) {
//       // Find the subcategory from the category's subcategories array
//       const subcategory = product.category.subcategories.find(sub => sub._id.toString() === product.subcategory._id.toString());
//       return {
//         ...product.toObject(),
//         category: {
//           _id: product.category._id,
//           name: product.category.name,
//         },
//         subcategory: subcategory ? { _id: subcategory._id, name: subcategory.name } : null
//       };
//     }

//     // If no subcategories exist, return the product without subcategory info
//     return {
//       ...product.toObject(),
//       category: product.category ? { _id: product.category._id, name: product.category.name } : null,
//       subcategory: null
//     };
//   });

//   return res.status(200).json(new ApiResponse(200, result, "Products fetched successfully"));
// });


// Get a product by ID

export const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const { category, subcategories, minPrice, maxPrice } = req.query;

  let query = {};

  // Case 1: If category is provided, filter by category
  if (category) {
    query.category = category;  // Ensure this is a field in the Product model
  }

  // Case 2: If subcategories are provided, convert it from string to an array
  let subcategoryIds = [];
  if (subcategories) {
    subcategoryIds = subcategories.split(",").map(id => id.trim()); // Convert "1,2,3" -> ["1", "2", "3"]
  }

  // If subcategories exist, validate them against the category
  if (subcategoryIds.length > 0) {
    if (!category) {
      return res.status(400).json(new ApiError(400, "Category must be provided to filter by subcategories"));
    }

    // Find the category first and get its subcategories
    const parentCategory = await Category.findById(category);
    if (!parentCategory) {
      return res.status(404).json(new ApiError(404, "Category not found"));
    }

    // Ensure provided subcategories belong to this category
    const validSubcategoryIds = parentCategory.subcategories.map(sub => sub._id.toString());
    const invalidSubcategories = subcategoryIds.filter(id => !validSubcategoryIds.includes(id));

    if (invalidSubcategories.length > 0) {
      return res.status(400).json(new ApiError(400, `Some subcategories are not related to the provided category: ${invalidSubcategories}`));
    }

    query["subcategory._id"] = { $in: subcategoryIds.map(id => new mongoose.Types.ObjectId(id)) };
  }

  // Case 3: If price filters (minPrice, maxPrice) are provided, add them to the query
  if (minPrice || maxPrice) {
    query.price = {}; // Ensure this is a field in the Product model

    if (minPrice) {
      query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
    }

    if (maxPrice) {
      query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
    }
  }

  // Fetch products based on the constructed query
  const products = await Product.find(query)
    .populate({
      path: "category",
      select: "_id name", // Populating the category field from the Category model
    }).sort({ price: 1 });

  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
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
