import mongoose from "mongoose";
import Product from "../models/Product.js";

async function createProduct(req, res, next) {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    let page = parseInt(req.query.page);

    if (!page) {
      page = 1;
    }

    if (page < 1) {
      page = 1;
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      page: page,
      limit: limit,
      totalProducts: totalProducts,
      totalPages: totalPages,
      products: products
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const productId = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(productId);

    if (isValidId === false) {
      return res.status(400).json({
        message: "Invalid product id"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      product: product
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const productId = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(productId);

    if (isValidId === false) {
      return res.status(400).json({
        message: "Invalid product id"
      });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (req.body.name !== undefined) {
      existingProduct.name = req.body.name;
    }

    if (req.body.category !== undefined) {
      existingProduct.category = req.body.category;
    }

    if (req.body.price !== undefined) {
      existingProduct.price = req.body.price;
    }

    if (req.body.quantity !== undefined) {
      existingProduct.quantity = req.body.quantity;
    }

    const updatedProduct = await existingProduct.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const productId = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(productId);

    if (isValidId === false) {
      return res.status(400).json({
        message: "Invalid product id"
      });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await existingProduct.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
