import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Brand from "../models/brand.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// ✅ GET all brands
export const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().sort({ name: 1 }); // Sort brands alphabetically
  if (!brands || brands.length === 0) {
    throw new ApiError(404, "No brands found");
  }
  res.json(new ApiResponse(200, brands, "Brands retrieved successfully"));
});

// ✅ GET a single brand by ID
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }
  res.json(new ApiResponse(200, brand, "Brand retrieved successfully"));
});


export const createBrand = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // 1️⃣ Validate Required Fields
  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  // 2️⃣ Check if the brand already exists
  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) {
    throw new ApiError(400, "Brand already exists");
  }

  // 3️⃣ Handle the logo file upload to Cloudinary (if file exists)
  let logoUrl = "";
  if (req.file) {
    const cloudinaryResult = await uploadOnCloudinary(req.file.path); // Upload logo to Cloudinary
    logoUrl = cloudinaryResult?.url;
  } else {
    throw new ApiError(400, "Logo is required");
  }

  // 4️⃣ Create new brand
  const newBrand = new Brand({
    name,
    logo: logoUrl, // Store logo URL from Cloudinary
    description,
  });

  // 5️⃣ Save the new brand to the database
  await newBrand.save();

  // 6️⃣ Return the success response
  return res.status(201).json(new ApiResponse(201, newBrand, "Brand created successfully"));
});

// ✅ PATCH: Update a brand (Admin only)
export const updateBrand = asyncHandler(async (req, res) => {
  const { name, logo, description } = req.body;

  // Check if brand exists before updating
  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name, logo, description },
    { new: true }
  );

  if (!updatedBrand) {
    throw new ApiError(404, "Brand not found");
  }

  res.json(new ApiResponse(200, updatedBrand, "Brand updated successfully"));
});

// ✅ DELETE: Remove a brand (Admin only)
export const deleteBrand = asyncHandler(async (req, res) => {
  const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    throw new ApiError(404, "Brand not found");
  }

  res.json(new ApiResponse(200, null, "Brand deleted successfully"));
});
