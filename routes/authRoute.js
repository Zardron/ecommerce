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
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware, getUser);
router.get("/", authMiddleware, isAdmin, getAllUser);
router.delete("/:id", deleteUser);
router.put("/update-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
