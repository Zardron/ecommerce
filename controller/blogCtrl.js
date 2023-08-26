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
    const blogDetails = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
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

// Delete Specific Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blogDelete = await Blog.findByIdAndDelete(id);
    res.json({
      blogDelete,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Like A Blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.userDetails?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

// Dislike A Blog
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.userDetails?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getSpecificBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
