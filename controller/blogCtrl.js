const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

// Create New Blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Blogs
const getBlog = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get Specific Blog
const getSpecificBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blogDetails = await Blog.findById(id);
    await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });

    res.json(blogDetails);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Specific Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blogUpdate = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      blogUpdate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog, updateBlog, getBlog, getSpecificBlog };
