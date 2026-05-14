import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ADD TO CART
export const addToCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    // CHECK PRODUCT EXISTS
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }

    // OUT OF STOCK CHECK
    if (quantity > product.stock) {
      return res.status(400).json({
        msg: "Out of stock"
      });
    }

    let cart = await Cart.findOne({
      user: req.user.id
    });

    // CREATE NEW CART
    if (!cart) {

      cart = await Cart.create({
        user: req.user.id,
        items: [
          {
            product: productId,
            quantity
          }
        ]
      });

    } else {

      // CHECK PRODUCT ALREADY EXISTS IN CART
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      // UPDATE QUANTITY
      if (itemIndex > -1) {

        const newQuantity =
          cart.items[itemIndex].quantity + quantity;

        // STOCK CHECK
        if (newQuantity > product.stock) {
          return res.status(400).json({
            msg: "Out of stock"
          });
        }

        cart.items[itemIndex].quantity = newQuantity;

      } else {

        // ADD NEW PRODUCT
        cart.items.push({
          product: productId,
          quantity
        });

      }

      await cart.save();
    }

    res.json({
      msg: "Item added to cart",
      cart
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET CART
export const getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user.id
    }).populate("items.product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// UPDATE CART
export const updateCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }

    // STOCK CHECK
    if (quantity > product.stock) {
      return res.status(400).json({
        msg: "Out of stock"
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        msg: "Cart not found"
      });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {

      return res.status(404).json({
        msg: "Item not found in cart"
      });

    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      msg: "Cart updated successfully",
      cart
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        msg: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      msg: "Item removed",
      cart
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};