
const { validationResult } = require("express-validator")
const RouterPermission = require("../../model/router-permission-model.js")

//=============================== Gat All Routes =============================

const getAllRoutes = async (req, res) => {
    try {
        const routes = [];
        const stack = req.app._router.stack;

        stack.forEach(data => {
            if (data.name === "router" && data.handle && data.handle.stack) {
                data.handle.stack.forEach((handler) => {
                    if (handler.route && handler.route.path && handler.route.methods) {
                        routes.push({
                            path: handler.route.path,
                            methods: handler.route.methods
                        });
                    }
                });
            }
        });

        return res.status(200).json({
            success: true,
            msg: "All Routes",
            data: routes
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


//================================== Add Rotes Routes =================================

const addRouterPermission = async (req, res) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        // If there are validation errors, return them
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "error",
                errors: errors.array(),
            });
        }

        const { router_endpoint, permission_id, role, permission } = req.body;
        const routerPermission = await RouterPermission.findOneAndUpdate(
            { router_endpoint, role },
            { router_endpoint, role, permission_id: permission_id, permissions: permission },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        return res.status(200).json({
            success: true,
            msg: "Router Permissions Added/Updated Successfully",
            data: routerPermission,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


//================================== Get Rotes Permission =================================

const getRouterPermissions = async (req, res) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        // If there are validation errors, return them
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "error",
                errors: errors.array(),
            });
        }

        const { router_endpoint } = req.body;

        const routerPermission = await RouterPermission.find({ router_endpoint }).populate("permission_id");

        return res.status(200).json({
            success: true,
            msg: "Router Permissions",
            data: routerPermission,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


//================================== Delete Rotes Permission =================================

const deleteRouterPermission = async (req, res) => {
    try {
        const { routerPermissionId } = req.body;

        // Check if the provided ID is valid
        if (!routerPermissionId) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Router Permission ID",
            });
        }

        // Delete the router permission
        await RouterPermission.findByIdAndDelete(routerPermissionId);

        return res.status(200).json({
            success: true,
            msg: "Router Permission Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


//=============================== Get All Routes with Permissions =============================
const getAllRouterPermissions = async (req, res) => {
    try {
        const routerPermissions = await RouterPermission.find().populate("permission_id");

        // Format data for the table
        const formattedData = routerPermissions.map(permission => {
            let permissionId = "";
            let permissionName = "";
            let isDefault = false;

            if (permission.permission_id) {
                permissionId = permission.permission_id._id;
                permissionName = permission.permission_id.permission_name;
                isDefault = permission.permission_id.is_default;
            }

            return {
                router_id: permission._id,
                routerEndpoint: permission.router_endpoint,
                role_that_can_access: permission.role,
                permission_id: permissionId,
                permission_name: permissionName,
                is_default: isDefault,
                Allowed_permissions_on_routes: permission.permissions.join(", "), // Join permissions array
            };
        });

        return res.status(200).json({
            success: true,
            msg: "All Router Permissions",
            data: formattedData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};


//==========================================================================

module.exports = { getAllRoutes, addRouterPermission, deleteRouterPermission, getRouterPermissions, getAllRouterPermissions }