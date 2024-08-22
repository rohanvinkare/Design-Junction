// two Works are it is creating the multiple users with same email id

const { validationResult } = require("express-validator");

const User = require("../model/user-model");
const Permission = require("../model/permission-model.js")
const UserPermission = require("../model/user-permission-model.js")
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const mongoose = require("mongoose");

const { sendMail } = require("../helpers/mailer-helper.js");

//====================================Create User========================================
const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { name, email } = req.body;

    const isExists = await User.findOne({ email });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Email Already Exist",
      });
    }

    const password = randomstring.generate(6);
    const hashPassword = await bcrypt.hash(password, 10);

    var obj = {
      name,
      email,
      password: hashPassword,
    };

    if (req.body.role && req.body.role == 1) {
      return res.status(400).json({
        success: false,
        msg: "You cant Create Admin",
      });
    } else if (req.body.role !== null) {
      obj.role = req.body.role;
    }

    const user = new User(obj);
    const userData = await user.save();



    //--------------Add permission to user if coming in request------------------

    if (req.body.permissions != undefined) {
      const addPermission = req.body.permissions;
      const permissionArray = [];

      await Promise.all(addPermission.map(async (permission) => {
        const permissionData = await Permission.findOne({ _id: permission.id });


        permissionArray.push({
          permission_name: permissionData.permission_name,
          permission_value: permission.value,
        });
      }));

      if (permissionArray.length > 0) {
        const userPermission = new UserPermission({
          user_id: userData._id,
          permissions: permissionArray,
        });


        await userPermission.save();
      } else {
        console.log('No valid permissions found to assign.');
      }
    }


    //----------------------------Mail Format-------------------------------------

    const content =
      `
  <p>Hello <b>` +
      userData.name +
      `,</b> Your Account Has been Created, below is your Details</p>
  <table style="border-style:none;">
    <tr>
      <th>Name :- </th>
      <td>` +
      userData.name +
      `</td>
    </tr>

    <tr>
      <th>Email :- </th>
      <td>` +
      userData.email +
      `</td>
    </tr>

    <tr>
      <th>Password :- </th>
      <td>` +
      password +
      `</td>
    </tr>
  </table>

  <p>Now you can login your account in our Application, Thanks.....</p>
`;
    //--------Send Mail--------

    sendMail(userData.email, "Account Created", content);

    console.log(password);
    return res.status(200).json({
      success: true,
      msg: "User Created Successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//=====================================Get users =========================================

const getUsers = async (req, res) => {
  try {


    // get User Data with all permissions

    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(req.user._id),
          }
        }
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
          " permissions": {
            " permissions": "$permissions.permissions",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "User fetched Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//=======================================Update Users ====================================

// const updateUser = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         msg: "Validation error",
//         errors: errors.array(),
//       });
//     }

//     const { id, name, role, permissions } = req.body;

//     // Check if the user exists
//     const existingUser = await User.findById(id);
//     if (!existingUser) {
//       return res.status(400).json({
//         success: false,
//         msg: "User not found",
//       });
//     }

//     // Update user data
//     const updateObj = { name };
//     if (role !== undefined) {
//       updateObj.role = role;
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, { $set: updateObj }, { new: true });

//     let userPermission = await UserPermission.findOne({ user_id: updatedUser._id });

//     if (!userPermission) {
//       userPermission = new UserPermission({
//         user_id: updatedUser._id,
//         permissions: [], // Default empty permissions array
//       });
//     }

//     if (permissions && permissions.id && Array.isArray(permissions.value)) {
//       // Fetch permission_name based on permissions.id
//       const permissionData = await Permission.findOne({ _id: permissions.id });
//       if (!permissionData) {
//         return res.status(400).json({
//           success: false,
//           msg: "Permission not found",
//         });
//       }

//       // Set permissions array with permission_name and permission_value
//       userPermission.permissions = [{
//         permission_name: permissionData.permission_name,
//         permission_value: permissions.value,
//       }];
//     } else {
//       // Handle invalid permissions format
//       return res.status(400).json({
//         success: false,
//         msg: "Invalid permissions format",
//       });
//     }

//     await userPermission.save();

//     return res.status(200).json({
//       success: true,
//       msg: "User Updated Successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };


const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation error",
        errors: errors.array(),
      });
    }

    const { id, name, role, permissions } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    // Update user data
    const updateObj = { name };
    if (role !== undefined) {
      updateObj.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(id, { $set: updateObj }, { new: true });

    let userPermission = await UserPermission.findOne({ user_id: updatedUser._id });

    if (!userPermission) {
      userPermission = new UserPermission({
        user_id: updatedUser._id,
        permissions: [], // Default empty permissions array
      });
    }

    if (permissions && Array.isArray(permissions)) {
      for (const perm of permissions) {
        if (perm.id && Array.isArray(perm.value)) {
          // Fetch permission_name based on perm.id
          const permissionData = await Permission.findOne({ _id: perm.id });
          if (!permissionData) {
            return res.status(400).json({
              success: false,
              msg: `Permission not found for ID: ${perm.id}`,
            });
          }

          // Check if permission already exists, update if it does
          const existingPermIndex = userPermission.permissions.findIndex(p => p.permission_name === permissionData.permission_name);
          if (existingPermIndex !== -1) {
            userPermission.permissions[existingPermIndex].permission_value = perm.value;
          } else {
            // Add new permission
            userPermission.permissions.push({
              permission_name: permissionData.permission_name,
              permission_value: perm.value,
            });
          }
        } else {
          // Handle invalid permission format
          return res.status(400).json({
            success: false,
            msg: "Invalid permissions format",
          });
        }
      }
    } else {
      // Handle invalid permissions format
      return res.status(400).json({
        success: false,
        msg: "Invalid permissions format",
      });
    }

    await userPermission.save();

    return res.status(200).json({
      success: true,
      msg: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};



//============================== Delete Users ==========================================

const deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    const isExists = await User.findOne({ _id: id });

    if (!isExists) {
      return res.status(400).json({
        success: false,
        msg: "User Already not Exists",
      });
    }

    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      msg: "User deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
