import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// GET ALL PRODUCTS

router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET SINGLE PRODUCT

router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ADD PRODUCT

router.post("/", async (req, res) => {

  try {

    const product = new Product({

      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,

    });

    const savedProduct =
      await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE PRODUCT

router.put("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE PRODUCT

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

export default router;