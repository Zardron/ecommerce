const express = require("express");
const {
  createBrand,
  getBrand,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.get("/", authMiddleware, isAdmin, getBrand);
router.get("/:id", authMiddleware, isAdmin, getSpecificBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
