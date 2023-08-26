const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBlogCategory,
  getBlogCategory,
  getSpecificBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controller/blogCategoryCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.get("/", authMiddleware, isAdmin, getBlogCategory);
router.get("/:id", authMiddleware, isAdmin, getSpecificBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);

module.exports = router;
