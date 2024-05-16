
const User = require("../model/user-model.js");
const RouterPermission = require("../model/router-permission-model.js")
const mongoose = require("mongoose");
const routerPermissionModel = require("../model/router-permission-model.js");


//================== Permissions That users have ================================
const getUserPermissions = async (user_id) => {
    try {

        const user = await User.aggregate([
            {
                $match: {

                    _id: new mongoose.Types.ObjectId(user_id),

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
                    "permissions": {
                        "permissions": "$permissions.permissions",
                    },
                },
            },
        ]);



        return user[0]


    } catch (error) {

        console.log(error.message);
    }
}



//============== Routing permissions that user have ======================
const getRouterPermissions = async (router, role) => {
    try {
        const routerPermission = await RouterPermission.findOne({
            router_endpoint: router,
            role
        }).populate("permission_id");

        if (!routerPermission) {
            console.log("Router permission not found");
            return null;
        }



        const rohan = routerPermission.permission_id

        return routerPermission;

    } catch (error) {
        console.log("Error fetching router permissions:", error.message);
        return null;
    }
}





module.exports = { getUserPermissions, getRouterPermissions };

