const helper = require("../helpers/helpers.js");



const checkPermission = async (req, res, next) => {
    try {


        if (req.user.role != 1) {
            const routerPermission = await helper.getRouterPermissions(
                req.path,
                req.user.role
            );


            const userPermissions = await helper.getUserPermissions(req.user._id);




            if (
                userPermissions.permissions.permissions == undefined ||
                !routerPermission
            ) {
                return res.status(400).json({
                    success: false,
                    msg: "You Have No Access - Only Admin can access",
                });
            }


            const permission_id = routerPermission.permission_id;
            if (!permission_id) {
                return res.status(400).json({
                    success: false,
                    msg: "Permission ID not found",
                });
            }

            const permission_name = permission_id.permission_name;
            if (!permission_name) {
                return res.status(400).json({
                    success: false,
                    msg: "Permission Name not found",
                });
            }

            const permission_values = routerPermission.permissions; //[0,1,2,3]




            const hasPermissions = await userPermissions.permissions.permissions.some(
                (permission) =>
                    permission.permission_name == permission_name &&
                    permission.permission_value.some((value) =>
                        permission_values.includes(value)
                    )
            );


            if (!hasPermissions) {

                return res.status(400).json({
                    success: false,
                    msg: "You Have No Access - Only Admin can access",
                });

            }


        }

        return next();

    } catch (error) {


        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong",
        });
    }
};

module.exports = checkPermission;
