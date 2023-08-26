const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getSpecificBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require("../controller/blogCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/", getBlog);
router.get("/:id", getSpecificBlog);

module.exports = router;
