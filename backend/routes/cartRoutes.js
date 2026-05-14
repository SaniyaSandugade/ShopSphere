import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart
} from "../controllers/cartController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// ADD TO CART
router.post("/", auth, addToCart);

// GET CART
router.get("/", auth, getCart);

// UPDATE CART QUANTITY
router.put("/", auth, updateCart);

// REMOVE ITEM
router.delete("/:productId", auth, removeFromCart);

export default router;