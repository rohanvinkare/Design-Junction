const { check } = require("express-validator");

exports.adminPermissionAddValidator = [
  check("permission_name", "Permission Name Is Required").not().isEmpty(),
];

exports.adminPermissionDELETEValidator = [
  check("id", "ID Is Required").not().isEmpty(),
];

exports.adminPermissionUPDATEValidator = [
  check("id", "ID Is Required").not().isEmpty(),
  check("permission_name", "Permission Name Is Required").not().isEmpty(),
];

exports.categoryAddValidator = [
  check("category_name", "Category Name Is Required").not().isEmpty(),
];

exports.categoryDeleteValidator = [
  check("id", "ID Is Required").not().isEmpty(),
];

exports.categoryUpdateValidator = [
  check("id", "ID Is Required").not().isEmpty(),
  check("category_name", "Category Name Is Required").not().isEmpty(),
];

exports.postCreateValidator = [
  check("title", "Title Name Is Required").not().isEmpty(),
  check("description", "Description Name Is Required").not().isEmpty(),
];

exports.postDeleteValidator = [check("id", "ID Is Required").not().isEmpty()];

exports.postUpdateValidator = [
  check("id", "ID Is Required").not().isEmpty(),
  check("title", "Title Name Is Required").not().isEmpty(),
  check("description", "Description Name Is Required").not().isEmpty(),
];


exports.storeRoleValidator = [

  check("role_name", "role_name Is Required").not().isEmpty(),
  check("value", "value Is Required").not().isEmpty(),
];

exports.addRouterPermissionValidator = [

  check("router_endpoint", "router_endpoint Is Required").not().isEmpty(),
  check("role", "role Is Required").not().isEmpty(),
  check("permission_id", "permission_id Is Required").not().isEmpty(),
  check("permission", "permission Is Must be an Array").isArray(),
];


exports.getRouterPermissionValidator = [

  check("router_endpoint", "router_endpoint Is Required").not().isEmpty(),
];




