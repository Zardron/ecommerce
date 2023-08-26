const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

// Create A Brand
const createBrand = asyncHandler(async (req, res) => {
  const brandExist = await Brand.findOne({ name: req.body.name });

  if (!brandExist) {
    const newBrand = await Brand.create(req.body);

    res.json(newBrand);
  } else {
    throw new Error("Brand Already Exist");
  }
});

// Get All Brand
const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find();

  res.json(brand);
});

// Get All Brand
const getSpecificBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const brand = await Brand.findById(id);

  res.json(brand);
});

// Update Specific Brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const brandExist = await Brand.findOne({ name: req.body.name });

  if (brandExist) {
    throw new Error("Brand Already Exist");
  } else {
    const brandData = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedBrand: brandData });
  }
});

// Delete Specific Brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const brandData = await Brand.findByIdAndDelete(id);

  res.json({ deleteBrand: brandData });
});

module.exports = {
  createBrand,
  getBrand,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
};
