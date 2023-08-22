const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// Create New Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error("There is something wrong on your data");
  }
});

// Get All Product
const getAllProduct = asyncHandler(async (req, res) => {
  const allProduct = await Product.find();

  res.json(allProduct);
});

// Get Specific Product
const getSpecificProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const specificProduct = await Product.findById(id);
    res.json(specificProduct);
  } catch (error) {
    throw new Error("Invalid ID or ID Not Found");
  }
});

// Update Specific Product
const updateSpecificProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error("Invalid ID or ID Not Found");
  }
});

// Delete Specific Product
const deleteSpecificProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete({ _id: id });
    res.json(deleteProduct);
  } catch (error) {
    throw new Error("Invalid ID or ID Not Found");
  }
});

module.exports = {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
