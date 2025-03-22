import { Router } from "express";
import { addToCart,getCartProducts } from "../controllers/cart.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// Route to get all brands
router.route("/").post(verifyJWT,addToCart).get(verifyJWT,getCartProducts)

export default router;
