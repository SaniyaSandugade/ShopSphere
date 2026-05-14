import Product from "../models/Product.js";

// CREATE PRODUCT (Admin)
export const createProduct = async (req, res) => {

  try {

    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    // LOW STOCK ALERT
    const updatedProducts = products.map(product => {

      const item = product.toObject();

      if (item.stock < 5) {

        item.lowStock = true;

      } else {

        item.lowStock = false;

      }

      return item;

    });

    res.json(updatedProducts);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        msg: "Product not found"
      });

    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// UPDATE PRODUCT (Admin)
export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {

      return res.status(404).json({
        msg: "Product not found"
      });

    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// DELETE PRODUCT (Admin)
export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {

      return res.status(404).json({
        msg: "Product not found"
      });

    }

    res.json({
      msg: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};