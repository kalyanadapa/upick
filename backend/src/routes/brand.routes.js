import { Router } from "express";
import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } from "../controllers/brand.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";  // Assuming multer is set up

const router = Router();

// Route to get all brands
router.route("/").get(getAllBrands)
  // Route to create a new brand with image upload
  .post(verifyJWT, authorizeAdmin, upload.single("logo"), createBrand);

// Route to get a single brand by ID
router.route("/:id").get(getBrandById);

// Route to update a brand with image upload (if needed)
router.route("/:id")
  .patch(verifyJWT, authorizeAdmin, upload.single("logo"), updateBrand)  // Image upload (single logo image)
  .delete(verifyJWT, authorizeAdmin, deleteBrand);  // Delete a brand

export default router;
