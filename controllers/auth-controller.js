const User = require("../model/user-model.js");

const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookie = require('cookie');

const Permission = require("../model/permission-model.js");

const UserPermission = require("../model/user-permission-model.js");

const helper = require("../helpers/helpers.js");
const { renderFile } = require("ejs");

//====================================Register User=========================================
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check if the user already exists
    const isExistUser = await User.findOne({ email });

    // If user already exists
    if (isExistUser) {
      return res.status(200).json({
        success: false,
        msg: "Email Already Exist",
      });
    }

    // Hash the password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    // Save the user data
    const userData = await user.save();

    //Assign Default Permissions

    const defaultPermissions = await Permission.find({
      is_default: 1,
    });

    if (defaultPermissions.length > 0) {
      const permissionArray = defaultPermissions.map((permission) => ({
        permission_name: permission.permission_name,
        permission_value: [0, 1, 2, 3],
      }));

      const userPermission = new UserPermission({
        user_id: userData._id,
        permissions: permissionArray,
      });

      await userPermission.save();
    }

    // Return success response with user data
    return res.status(200).json({
      success: true,
      msg: "User Registered Successfully",
      data: userData,
    });
  } catch (err) {
    // If there is an error, return error response
    return res.status(400).json({
      success: false,
      msg: err.message, // use the error message instead of errors.array()
    });
  }
};

//====================================jwt TOKEN And Cookies =========================================

const generateAccessToken = async (user, res) => {
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "8h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60 * 1000, // Expires in 8 hours (milliseconds)
  });


  return token;
};



//====================================Login User=========================================

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }



    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({
        success: false,
        msg: "Email And Password is Incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Email And Password is Incorrect",
      });
    }

    const accessToken = await generateAccessToken({ user: userData }, res);



    // get User Data with all permissions
    const result = await User.aggregate([
      {
        $match: { email: email },
      },
      {
        $lookup: {
          from: "userpermissions", // from mongo compass
          localField: "_id",
          foreignField: "user_id",
          as: "permissions",
        },
      },

      {
        // we are getting array as a response but we want object so we are converting it
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          //-----------
          permissions: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $arrayElemAt: ["$permissions", 0] },
              else: null,
            },
          },
        },
      },
      {
        // null value in permissions then we are adding the custom field of permissions


        $addFields: {
          "permissions": "$permissions.permissions",
        },

      },
    ]);


    // // return res.redirect("/api/get-post?accessToken=" + accessToken);
    // return res.renderFile("admin-panel")

    return res.status(200).json({
      success: true,
      msg: "logged in successfully",
      accessToken: accessToken,
      tokenType: "Bearer",
      data: result[0],
    });
  } catch (err) {
    // If there is an error, return error response
    const errors = validationResult(req);
    return res.status(400).json({
      success: false,
      msg: errors.array(),
    });
  }
};


//====================================Log Out User =================================
const logoutUser = async (req, res) => {
  try {

    // console.log(req.cookies.token)
    // Clear cookies
    res.clearCookie('token');
    req.cookies.token = null;

    // console.log(req.cookies.token)

    return res.status(200).json({
      success: true,
      msg: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to logout",
    });
  }
};


//====================================User Profile =========================================

const getProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const userData = await User.findOne({ _id: user_id });

    return res.status(400).json({
      success: true,
      msg: "Profile Data",
      data: userData,
    });
  } catch (error) {
    // If there is an error, return error response
    return res.status(400).json({
      success: false,
      msg: errors.array(),
    });
  }
};


//================================================================================

const getUserPermissions = async (req, res) => {
  try {
    const user_id = req.user._id;

    const userPermissions = await helper.getUserPermissions(user_id);

    return res.status(200).json({
      success: true,
      msg: "User Permissions",
      data: userPermissions,
    });
  } catch (error) {
    const errors = validationResult(req);
    return res.status(400).json({
      success: false,
      msg: errors.array(),
    });
  }
};


module.exports = { registerUser, loginUser, logoutUser, getProfile, getUserPermissions };
