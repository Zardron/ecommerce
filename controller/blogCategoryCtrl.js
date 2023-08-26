const BlogCategory = require("../models/blogCategoryModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

// Create A Category
const createBlogCategory = asyncHandler(async (req, res) => {
  const blogExist = await BlogCategory.findOne({ name: req.body.name });

  if (!blogExist) {
    const newBlogCategory = await BlogCategory.create(req.body);

    res.json(newBlogCategory);
  } else {
    throw new Error("Category Already Exist");
  }
});

// Get All Category
const getBlogCategory = asyncHandler(async (req, res) => {
  const blog = await BlogCategory.find();

  res.json(blog);
});

// Get All Category
const getSpecificBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const blog = await BlogCategory.findById(id);

  res.json(blog);
});

// Update Specific Category
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const blogExist = await BlogCategory.findOne({ name: req.body.name });

  if (blogExist) {
    throw new Error("Category Already Exist");
  } else {
    const blogData = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedCategory: blogData });
  }
});

// Delete Specific Category
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const blogData = await BlogCategory.findByIdAndDelete(id);

  res.json({ deleteCategory: blogData });
});

module.exports = {
  createBlogCategory,
  getBlogCategory,
  getSpecificBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
