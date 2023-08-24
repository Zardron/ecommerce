const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getSpecificBlog,
} = require("../controller/blogCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/", getBlog);
router.get("/:id", getSpecificBlog);

module.exports = router;
