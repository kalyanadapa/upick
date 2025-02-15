import Product from "../models/product.model.js";
import Category from "../models/category.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate({
      path: "category", // Populate the category field
      select: "_id name subcategories", // Select category and subcategories
    });

  // For each product, manually set the subcategory based on the saved subcategory ID
  const result = products.map(product => {
    // Check if the category and its subcategories exist
    if (product.category && product.category.subcategories) {
      // Find the subcategory from the category's subcategories array
      const subcategory = product.category.subcategories.find(sub => 
        sub._id.toString() === product.subcategory.toString()
      );
      
      // Include only the selected subcategory, not the whole subcategories list
      return {
        ...product.toObject(),
        category: {
          _id: product.category._id,
          name: product.category.name,
        },
        subcategory: subcategory ? { _id: subcategory._id, name: subcategory.name } : null
      };
    }

    // If no subcategories exist, return the product without subcategory info
    return {
      ...product.toObject(),
      category: product.category ? { _id: product.category._id, name: product.category.name } : null,
      subcategory: null
    };
  });

  return res.status(200).json(new ApiResponse(200, result, "All Products fetched Successfully"));
});

export const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const { category, subcategories } = req.query;  // Get category and subcategory (or subcategories) from query params

  let query = {};

  // Case 1: If category is provided, filter by category
  if (category) {
    query.category = category;  // Filter by category ID
  }

  // Case 2: If subcategories are provided (either one or multiple), filter by subcategory
  if (subcategories) {
    const subcategoryIds = Array.isArray(subcategories) ? subcategories : [subcategories];
    
    // If category is provided, ensure subcategories are part of the category's subcategories
    if (category) {
      // Find the category first and get its subcategories directly (no need to populate)
      const parentCategory = await Category.findById(category);
      if (!parentCategory) {
        return res.status(404).json(new ApiError(404, "Category not found"));
      }

      // Ensure the provided subcategories belong to this category
      const validSubcategoryIds = parentCategory.subcategories.map(sub => sub._id.toString()); // Convert to string for comparison
      const invalidSubcategories = subcategoryIds.filter(id => !validSubcategoryIds.includes(id));

      if (invalidSubcategories.length > 0) {
        return res.status(400).json(new ApiError(400, `Some subcategories are not related to the provided category: ${invalidSubcategories}`));
      }

      // Filter products that belong to the specified subcategories
      query.subcategory = { $in: subcategoryIds }; 
    } else {
      return res.status(400).json(new ApiError(400, "Category must be provided to filter by subcategories"));
    }
  }

  // Fetch products based on the constructed query
  const products = await Product.find(query)
    .populate({
      path: "category", // Populate the category field
      select: "_id name subcategories", // Select category and subcategories
    });

  // For each product, manually set the subcategory based on the saved subcategory ID
  const result = products.map(product => {
    if (product.category && product.category.subcategories) {
      const subcategory = product.category.subcategories.find(sub => sub._id.toString() === product.subcategory.toString());
      return {
        ...product.toObject(),
        category: {
          _id: product.category._id,
          name: product.category.name,
        },
        subcategory: subcategory ? { _id: subcategory._id, name: subcategory.name } : null
      };
    }

    // If no subcategories exist, return the product without subcategory info
    return {
      ...product.toObject(),
      category: product.category ? { _id: product.category._id, name: product.category.name } : null,
      subcategory: null
    };
  });

  return res.status(200).json(new ApiResponse(200, result, "Products fetched successfully"));
});

// Get a product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);  // Find product by ID
  if (!product) {
    throw new ApiError(404, "Product not found");  // Use ApiError for not found error
  }
  return res.status(200).json(ApiResponse.success(product));  // Use ApiResponse for success
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, subcategory, description, price, quantity, countInStock } = req.body;

  // Validation
  if (!name || !brand || !category || !price) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Check for uploaded files
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  console.log("Uploaded Files: ", req.files); // Debug log

  // Upload each image to Cloudinary and store URLs
  let productImageUrls = [];

  try {
    for (const file of req.files) {
      const cloudinaryResult = await uploadOnCloudinary(file.path);
      if (cloudinaryResult) {
        productImageUrls.push(cloudinaryResult.url);
      }
    }

    if (productImageUrls.length === 0) {
      throw new ApiError(400, "Product image upload failed");
    }
  } catch (error) {
    console.error("Error uploading images:", error);
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
    images: productImageUrls, // Store array of image URLs
  });

  await newProduct.save();

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
