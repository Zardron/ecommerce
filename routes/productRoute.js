const express = require("express");
const {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
} = require("../controller/productCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getSpecificProduct);
router.put("/:id", authMiddleware, isAdmin, updateSpecificProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteSpecificProduct);
router.get("/", getAllProduct);

module.exports = router;
