const { validationResult } = require("express-validator");
const Category = require("../model/category-model.js");

//============================================Add Category=================================================

const addCategory = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    // If there are validation errors, return them
    if (!errors.isEmpty()) {



      return res.status(200).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { category_name } = req.body;

    const isExist = await Category.findOne({
      name: {
        $regex: category_name,
        $options: "i",
      },
    });

    if (isExist) {
      return res.status(400).json({
        success: false,
        msg: "category already exists",
      });
    }

    const category = new Category({
      name: category_name,
    });

    const categoryData = await category.save();

    return res.status(200).json({
      success: true,
      msg: "category added successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

//============================================GET Category=================================================

const getCategory = async (req, res) => {
  try {
    const categoryData = await Category.find({});

    return res.status(200).json({
      success: true,
      msg: "category Fetched successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

//============================================Delete Category=================================================

const deleteCategory = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    const categoryData = await Category.findById({ _id: id });

    if (!categoryData) {
      return res.status(400).json({
        success: false,
        msg: "category ID not found",
      });
    }

    await Category.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "category Deleted successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

//============================================Update Category=================================================

const updateCategory = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { id, category_name } = req.body;

    const categoryData = await Category.findById({ _id: id });

    if (!categoryData) {
      return res.status(400).json({
        success: false,
        msg: "category ID not found",
      });
    }

    const isExist = await Category.findOne({
      _id: {
        $ne: id,
      },
      name: {
        $regex: category_name,
        $options: "i",
      },
    });

    if (isExist) {
      return res.status(400).json({
        success: false,
        msg: "category name already assigned to other category ",
      });
    }

    // Update the category
    const updatedData = await Category.findByIdAndUpdate(
      id,
      { name: category_name }, // Update object with the new category name
      { new: true } // Option to return the updated document
    );


    return res.status(200).json({
      success: true,
      msg: "category Updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { addCategory, getCategory, deleteCategory, updateCategory };
