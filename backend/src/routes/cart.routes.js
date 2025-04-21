import { Router } from "express";
import { addToCart,getCartProducts, removeFromCart } from "../controllers/cart.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// Route to get all brands
router.route("/").post(verifyJWT,addToCart).get(verifyJWT,getCartProducts).delete(verifyJWT,removeFromCart);

export default router;
