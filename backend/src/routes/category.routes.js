import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js"; // Protect routes

const router = Router();

// Public Routes
router.route("/").get(getAllCategories);
router.route("/:id").get(getCategoryById);

// Admin Protected Routes
router.route("/").post(verifyJWT,authorizeAdmin, createCategory);
router.route("/:id").patch(verifyJWT, authorizeAdmin,updateCategory);
router.route("/:id").delete(verifyJWT,authorizeAdmin, deleteCategory);

export default router;
