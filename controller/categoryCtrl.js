const Category = require("../models/categoryModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

// Create A Category
const createCategory = asyncHandler(async (req, res) => {
  const categoryExist = await Category.findOne({ name: req.body.name });

  if (!categoryExist) {
    const newCategory = await Category.create(req.body);

    res.json(newCategory);
  } else {
    throw new Error("Category Already Exist");
  }
});

// Get All Category
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  res.json(category);
});

// Get All Category
const getSpecificCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const category = await Category.findById(id);

  res.json(category);
});

// Update Specific Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const categoryExist = await Category.findOne({ name: req.body.name });

  if (categoryExist) {
    throw new Error("Category Already Exist");
  } else {
    const categoryData = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedCategory: categoryData });
  }
});

// Delete Specific Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const categoryData = await Category.findByIdAndDelete(id);

  res.json({ deleteCategory: categoryData });
});

module.exports = {
  createCategory,
  getCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
};
