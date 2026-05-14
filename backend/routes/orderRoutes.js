import express from "express";

import {

  placeOrder,
  getOrders,
  deleteOrder,
  updateOrderStatus

} from "../controllers/orderController.js";

const router =
  express.Router();


// PLACE ORDER

router.post(
  "/",
  placeOrder
);


// GET ALL ORDERS

router.get(
  "/",
  getOrders
);


// UPDATE ORDER STATUS

router.put(
  "/:id",
  updateOrderStatus
);


// DELETE ORDER

router.delete(
  "/:id",
  deleteOrder
);

export default router;