import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Category from "../models/category.model.js"

// ✅ GET all categories
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories) {
    return next(new ApiError(404, "Categories not found"));
  }
  res.json(new ApiResponse(200, categories));
});

// ✅ GET a single category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }
  res.json(new ApiResponse(200, category));
});

// ✅ POST: Create a new category (Admin only)
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, subcategories } = req.body;

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return next(new ApiError(400, "Category already exists"));
  }

  const newCategory = new Category({ name, subcategories });
  await newCategory.save();

  res.status(201).json(new ApiResponse(201, newCategory, "Category created successfully"));
});

// ✅ PATCH: Update a category (Admin only)
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { name, subcategories } = req.body;

  // Check if category exists before updating
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { name, subcategories },
    { new: true }
  );

  if (!updatedCategory) {
    return next(new ApiError(404, "Category not found"));
  }

  res.json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

// ✅ DELETE: Remove a category (Admin only)
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return next(new ApiError(404, "Category not found"));
  }

  res.json(new ApiResponse(200, null, "Category deleted successfully"));
});
