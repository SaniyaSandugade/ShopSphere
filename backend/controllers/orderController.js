import Order from "../models/Order.js";

import Product from "../models/Product.js";

import sendEmail
from "../utils/sendEmail.js";

// PLACE ORDER

export const placeOrder = async (
  req,
  res
) => {

  try {

    const {

      items,
      shippingAddress,
      totalPrice,
      paymentMethod

    } = req.body;

    // CHECK EMPTY

    if (
      !items ||
      items.length === 0
    ) {

      return res.status(400).json({

        msg: "Cart is empty"

      });

    }

    // CREATE ORDER

    const order =
      await Order.create({

        user: null,

        items: items.map(item => ({

          product:
            item.product,

          quantity:
            item.quantity

        })),

        shippingAddress,

        totalPrice,

        paymentMethod:
          paymentMethod || "COD",

        isPaid: false,

        orderStatus:
          "Processing"

      });

    // REDUCE STOCK

    for (const item of items) {

      const product =
        await Product.findById(
          item.product
        );

      if (product) {

        product.stock -=
          item.quantity;

        await product.save();

      }

    }

    // SEND EMAIL

    await sendEmail(

      "sandugadesaniya@gmail.com",

      "Order Confirmed",

      `Your order ${order._id}
       has been placed successfully.`

    );

    // SUCCESS

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      msg: error.message

    });

  }

};

// GET ALL ORDERS

export const getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find()
        .populate(
          "items.product"
        );

    res.json(orders);

  } catch (error) {

    res.status(500).json({

      msg: error.message

    });

  }

};

// DELETE ORDER

export const deleteOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({

        msg: "Order not found"

      });

    }

    await order.deleteOne();

    res.json({

      msg: "Order deleted"

    });

  } catch (error) {

    res.status(500).json({

      msg: error.message

    });

  }

};


// UPDATE ORDER STATUS

export const updateOrderStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({
          msg: "Order not found"
        });

      }

      order.orderStatus =
        req.body.status;

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        msg: error.message
      });

    }

  };