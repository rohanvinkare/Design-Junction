const { validationResult } = require("express-validator");

const Role = require("../../model/role-model");

//============================== ADD Role ==================================
// Function to add a new permission
const storeRole = async (req, res) => {
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

    const { role_name, value } = req.body;

    const role = new Role({
      role_name,
      value,
    });

    const roleData = await role.save();

    return res.status(200).json({
      success: true,
      msg: "Role Created Successfully",
      data: roleData,
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(400).json({
      success: false,
      msg: "error",
      errors: error.message, // Corrected variable name here
    });
  }
};

//============================== GET Role ==================================

const getRole = async (req, res) => {
  try {


    const roles = await Role.find({
      value: {
        $ne: 1, // admin
      },
    });

    return res.status(200).json({
      success: true,
      msg: "role Fetched successfully",
      data: roles,
    });
  } catch (error) {

    // Return an error response if an error occurs
    return res.status(400).json({

      success: false,
      msg: "error",
      errors: error.message, // Corrected variable name here
    });
  }
};

//============================== Delete Role ==================================
// Function to delete a role
const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.body;

    // Check if roleId is valid
    if (!roleId) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Role ID",
      });
    }

    // Delete the role
    await Role.findByIdAndDelete(roleId);

    return res.status(200).json({
      success: true,
      msg: "Role Deleted Successfully",
    });
  } catch (error) {
    // Return an error response if an error occurs
    return res.status(400).json({
      success: false,
      msg: "Error deleting role",
      errors: error.message,
    });
  }
};

module.exports = { storeRole, getRole, deleteRole };
