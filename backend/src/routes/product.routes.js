import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

router.route("/")
  .get(getAllProducts)  // Get all products
  .post(verifyJWT, authorizeAdmin, upload.single("image"), createProduct);  // Create product (admin only)

router.route("/:id")
  .get(getProductById)  // Get product by ID
  .patch(verifyJWT, authorizeAdmin, upload.single("image"), updateProduct)  // Update product (admin only)
  .delete(verifyJWT, authorizeAdmin, deleteProduct);  // Delete product (admin only)

export default router;
