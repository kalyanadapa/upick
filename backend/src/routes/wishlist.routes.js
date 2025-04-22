// routes/wishlist.route.js
import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleWishlist, getWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/toggle", verifyJWT, toggleWishlist);
router.get("/", verifyJWT, getWishlist);

export default router;
