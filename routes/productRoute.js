const express = require("express");
const {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
  addToWishList,
  rating,
} = require("../controller/productCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getSpecificProduct);
router.put("/:id", authMiddleware, isAdmin, updateSpecificProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteSpecificProduct);

module.exports = router;
