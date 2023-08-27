const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);

    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find();

    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getSpecificCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findById(id);

    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const couponUpdate = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedCoupon: couponUpdate });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const couponDelete = await Coupon.findByIdAndDelete(id);

    res.json({ deleteCoupon: couponDelete });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupon,
  getSpecificCoupon,
  updateCoupon,
  deleteCoupon,
};
