import { Router } from "express";
import { addtoCart } from "../controllers/cart.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// Route to get all brands
router.route("/").get(verifyJWT,addtoCart)
  // Route to create a new brand with image upload
 
export default router;
