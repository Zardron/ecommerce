const express = require("express");
const {
  createColor,
  getColor,
  getSpecificColor,
  updateColor,
  deleteColor,
} = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.get("/", authMiddleware, isAdmin, getColor);
router.get("/:id", authMiddleware, isAdmin, getSpecificColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
