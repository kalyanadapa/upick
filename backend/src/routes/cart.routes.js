import { Router } from "express";
import { addToCart } from "../controllers/cart.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// Route to get all brands
router.route("/").post(verifyJWT,addToCart)
  // Route to create a new brand with image upload
 
export default router;
