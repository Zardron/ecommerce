const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  getSpecificCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, getSpecificCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
