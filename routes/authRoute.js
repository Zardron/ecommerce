const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  changePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/reset-password/:token", resetPassword);
router.put("/change-password", authMiddleware, changePassword);
router.get("/refresh-token", handleRefreshToken);
router.get("/cart", authMiddleware, getUserCart);
router.get("/orders", authMiddleware, getOrders);
router.get("/orders/:id", authMiddleware, getOrderByUserId);
router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.get("/", authMiddleware, isAdmin, getAllUser);
router.delete("/:id", deleteUser);
router.put("/update-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put(
  "/orders/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
