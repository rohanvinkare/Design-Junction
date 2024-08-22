const { validationResult } = require("express-validator");
const Permission = require("../../model/permission-model");
const User = require("../../model/user-model")

//============================== ADD Permission ==================================
// Function to add a new permission
const adminAddPermission = async (req, res) => {
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

    const { permission_name } = req.body;

    // Check if the permission name already exists
    const isExist = await Permission.findOne({
      permission_name: { $regex: permission_name, $options: "i" },
    });
    if (isExist) {
      return res.status(200).json({
        success: false,
        msg: "Permission Name Already Exists",
      });
    }

    // Create a new permission object
    const obj = {
      permission_name,
    };
    // Set the 'is_default' property if provided in the request
    if (req.body.default) {
      obj.is_default = parseInt(req.body.default); // Corrected typo here
    }

    const permission = new Permission(obj);
    // Save the new permission to the database
    const newPermission = await permission.save();

    // Return a success response with the new permission data
    return res.status(200).json({
      success: true,
      msg: "Permission Added Successfully",
      data: newPermission,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(200).json({
      success: false,
      msg: "error",
      errors: error.message, // Corrected variable name here
    });
  }
};

//============================== GET Permission ==================================

// Function to retrieve all permissions
const adminGETPermission = async (req, res) => {
  try {
    // Retrieve all permissions from the database
    const permissions = await Permission.find({});
    // Return a success response with the list of permissions
    return res.status(200).json({
      success: true,
      msg: "Permission Found Successfully",
      data: permissions,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(200).json({
      success: false,
      msg: "error",
      errors: error.message, // Corrected variable name here
    });
  }
};

//============================== DELETE Permission ==================================

// Function to delete a permission

const adminDELETEPermission = async (req, res) => {
  try {
    // // Validate the request
    // const errors = validationResult(req);
    // // If there are validation errors, return them
    // if (!errors.isEmpty()) {
    //   return res.status(200).json({
    //     success: false,
    //     msg: "error",
    //     errors: errors.array(),
    //   });
    // }

    const { id } = req.body;
    // console.log(req.body)

    const isExist = await Permission.findById({ _id: id });
    if (!isExist) {
      return res.status(200).json({
        success: false,
        msg: "Permission ID Dose not Exists",
      });
    }

    const deletedPermission = await Permission.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Permission We Deleted Successfully",
      data: deletedPermission,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(200).json({
      success: false,
      msg: "error",
      errors: error.message, // Corrected variable name here
    });
  }
};

//============================== UPDATE Permission ==================================

// Function to update a permission
const adminUPDATEPermission = async (req, res) => {
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

    const { id, permission_name } = req.body;

    // console.log(id, permission_name)

    // Check if the permission name already exists
    const isExist = await Permission.findOne({ _id: id });
    if (!isExist) {
      return res.status(200).json({
        success: false,
        msg: "Permission ID Dose not Exists",
      });
    }

    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permission_name: {
        $regex: permission_name,
        $options: "i",
      },
    });
    if (isNameAssigned) {
      return res.status(200).json({
        success: false,
        msg: "Permission Name Already assigned to Another Permission",
      });
    }

    // Create a new permission object
    const updatePermission = {
      permission_name,
    };
    // Set the 'is_default' property if provided in the request
    if (req.body.default != null) {
      updatePermission.is_default = parseInt(req.body.default);
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
      { _id: id },
      {
        $set: updatePermission,
      },
      { new: true }
    );

    // Return a success response with the new permission data
    return res.status(200).json({
      success: true,
      msg: "Permission Updated Successfully",
      data: updatedPermission,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(200).json({
      success: false,
      msg: "Permission Id Dose Not Exist",
      errors: error.message, // Corrected variable name here
    });
  }
};

//==============================Get all Users =========================

const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});

    // Return a success response with the list of users
    return res.status(200).json({
      success: true,
      msg: "Users Found Successfully",
      data: users,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(400).json({
      success: false,
      msg: "Error",
      error: error.message,
    });
  }
};


// Export the functions to be used in other parts of the application
module.exports = {
  adminAddPermission,
  adminGETPermission,
  adminDELETEPermission,
  adminUPDATEPermission,
  getAllUsers
};
