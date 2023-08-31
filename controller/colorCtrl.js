const Color = require("../models/colorModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

// Create A Color
const createColor = asyncHandler(async (req, res) => {
  const colorExist = await Color.findOne({ name: req.body.name });

  if (!colorExist) {
    const newColor = await Color.create(req.body);

    res.json(newColor);
  } else {
    throw new Error("Color Already Exist");
  }
});

// Get All Color
const getColor = asyncHandler(async (req, res) => {
  const color = await Color.find();

  res.json(color);
});

// Get All Color
const getSpecificColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const color = await Color.findById(id);

  res.json(color);
});

// Update Specific Color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const colorExist = await Color.findOne({ name: req.body.name });

  if (colorExist) {
    throw new Error("Color Already Exist");
  } else {
    const colorData = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedColor: colorData });
  }
});

// Delete Specific Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const colorData = await Color.findByIdAndDelete(id);

  res.json({ deleteColor: colorData });
});

module.exports = {
  createColor,
  getColor,
  getSpecificColor,
  updateColor,
  deleteColor,
};
