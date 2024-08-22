const express = require("express");
const router = express();

const authMiddleware = require("../middlewares/auth-middleware.js");
const adminPermissionController = require("../controllers/admin/admin-permission-controller.js");

const roleController = require("../controllers/admin/role-controller.js");
const routerController = require("../controllers/admin/router-controller.js");

const { onlyAdminAccess } = require("../middlewares/admin-middleware.js");

const {
  adminPermissionAddValidator,
  adminPermissionDELETEValidator,
  adminPermissionUPDATEValidator,
  storeRoleValidator,
  addRouterPermissionValidator,
  getRouterPermissionValidator
} = require("../helpers/validator-helpers.js");

//authMiddleware -> It is checking for token and from this we are getting the Data that stored in token headers
//onlyAdminAccess -> It is checking that user  role is (1-->admin) or not
//adminPermissionAddValidator -> Validating that all fields provided are correct or not for the add permission
//adminPermissionController -> Assigning Add , Delete , Update , Get permissions


//====================== Get all Users ====================================

router.get("/get-all-users", authMiddleware, adminPermissionController.getAllUsers);

//===========================================================================
router.post(
  "/add-permission",
  authMiddleware,
  onlyAdminAccess,
  adminPermissionAddValidator,
  adminPermissionController.adminAddPermission
);


router.get(
  "/get-permission",
  authMiddleware,
  onlyAdminAccess,
  adminPermissionController.adminGETPermission
);

router.post(
  "/delete-permission",
  authMiddleware,
  onlyAdminAccess,
  adminPermissionDELETEValidator,
  adminPermissionController.adminDELETEPermission
);

router.post(
  "/update-permission",
  authMiddleware,
  onlyAdminAccess,
  adminPermissionUPDATEValidator,
  adminPermissionController.adminUPDATEPermission
);

//================================Roles===============================
//roles route

router.post(
  "/store-role",
  authMiddleware,
  onlyAdminAccess,
  storeRoleValidator,
  roleController.storeRole
);

router.get(
  "/get-role",
  authMiddleware,
  onlyAdminAccess,
  roleController.getRole
);

router.delete(
  "/delete-role",
  authMiddleware,
  onlyAdminAccess,
  roleController.deleteRole
);



//==================================Router Permission Rotes====================================


router.post(
  "/add-router-permissions",
  authMiddleware,
  onlyAdminAccess,
  addRouterPermissionValidator,
  routerController.addRouterPermission
);

router.post(
  "/get-router-permissions",
  authMiddleware,
  onlyAdminAccess,
  getRouterPermissionValidator,
  routerController.getRouterPermissions
);

router.get("/routes-with-permissions",
  authMiddleware,
  getRouterPermissionValidator,
  routerController.getAllRouterPermissions);

router.delete("/delete-router-permission", authMiddleware,
  onlyAdminAccess,
  getRouterPermissionValidator,
  routerController.deleteRouterPermission);

module.exports = router;
