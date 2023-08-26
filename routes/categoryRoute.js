const express = require("express");
const {
  createCategory,
  getCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", authMiddleware, isAdmin, getCategory);
router.get("/:id", authMiddleware, isAdmin, getSpecificCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
