import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from 'cloudinary';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();  // Fetch all products from the database
  return res.status(200).json(ApiResponse.success(products));  // Use ApiResponse for success
});

// Get a product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);  // Find product by ID
  if (!product) {
    throw new ApiError(404, "Product not found");  // Use ApiError for not found error
  }
  return res.status(200).json(ApiResponse.success(product));  // Use ApiResponse for success
});

// Create a new product (Admin protected)
// export const createProduct = asyncHandler(async (req, res) => {
//   const { name, brand, category, subcategory, description, price, quantity, countInStock } = req.body;

//   // Validation (ensure required fields are provided)
//   if (!name || !brand || !category || !price) {
//     throw new ApiError(400, "All required fields must be provided");  // Use ApiError for validation error
//   }
//   let cloudinaryResult = null;
//   if (req.file) {
//     cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'products',  // Optional: specify folder on Cloudinary
//       resource_type: 'auto' // Automatically detect image/video type
//     });
//   }
//   const newProduct = new Product({
//     name,
//     brand,
//     category,
//     subcategory,
//     quantity, 
//     description,
//     price,
//     countInStock,
//     image: cloudinaryResult ? cloudinaryResult.secure_url : '', 
//   });

//   await newProduct.save();

//   return res.status(201).json(new ApiResponse(201,newProduct));  // Use ApiResponse for success
// });
export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, subcategory, description, price, quantity, countInStock } = req.body;

  // Validation (ensure required fields are provided)
  if (!name || !brand || !category || !price) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Debug: Log incoming files
  console.log("Request files: ", req.file);

  const imageLocalPath = req.file?.path;

  // Debug: Log image path
  console.log("Product Image Path: ", imageLocalPath);

  // Check for image file
  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is required");
  }

  // Upload to Cloudinary using your custom upload function
  let productImageUrl;
  try {
    const cloudinaryResult = await uploadOnCloudinary(imageLocalPath); // Use your upload function here
    if (!cloudinaryResult) {
      throw new ApiError(400, "Product image upload failed");
    }
    productImageUrl = cloudinaryResult.url;  // Save the URL returned by Cloudinary
  } catch (error) {
    console.log("Error uploading product image: ", error);
    throw new ApiError(500, "Product image upload failed");
  }

  // Create new product
  const newProduct = new Product({
    name,
    brand,
    category,
    subcategory,
    description,
    price,
    quantity,
    countInStock,
    image: productImageUrl,  // Save the Cloudinary URL
  });

  await newProduct.save();

  // Return success response with created product
  return res.status(201).json(new ApiResponse(201, newProduct, "Product created successfully"));
});
// Update a product (Admin protected)
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
