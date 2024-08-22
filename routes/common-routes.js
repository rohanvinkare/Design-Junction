const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");

const checkPermission = require("../middlewares/check-permission-middleware.js")

const {
  categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
  postCreateValidator,
  postUpdateValidator,
  postDeleteValidator,
} = require("../helpers/validator-helpers.js");

const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  postLikeUnlikeValidator,
  postLikeCountValidator,
} = require("../helpers/user-validator-helpers.js");
const UserController = require("../controllers/user-controller.js");

const categoryController = require("../controllers/category-controller.js");

const postController = require("../controllers/post-controller.js");

const likeController = require("../controllers/like-controller.js");

// category route

router.post(
  "/add-category",
  authMiddleware, checkPermission,
  categoryAddValidator,
  categoryController.addCategory
);

router.get("/get-category", authMiddleware, checkPermission, categoryController.getCategory);

router.post(
  "/delete-category",
  authMiddleware, checkPermission,
  categoryDeleteValidator,
  categoryController.deleteCategory
);

router.post(
  "/update-category",
  authMiddleware, checkPermission,
  categoryUpdateValidator,
  categoryController.updateCategory
);

// Post Routes

router.post(
  "/create-post",
  authMiddleware, checkPermission,
  postCreateValidator,
  postController.createPost
);

router.get("/get-post", authMiddleware, checkPermission, postController.getPost);

router.post(
  "/delete-post",
  authMiddleware, checkPermission,
  postDeleteValidator,
  postController.deletePost
);

router.post(
  "/update-post",
  authMiddleware, checkPermission,
  postUpdateValidator,
  postController.updatePost
);

//==========================================User Routes=====================================

router.post(
  "/create-user",
  authMiddleware, checkPermission,
  createUserValidator,
  UserController.createUser
);

router.get("/get-user", authMiddleware, checkPermission, UserController.getUsers);

router.post(
  "/update-user",
  authMiddleware, checkPermission,
  updateUserValidator,
  UserController.updateUser
);

router.post(
  "/delete-user",
  authMiddleware, checkPermission,
  deleteUserValidator,
  UserController.deleteUser
);

//===============================like & Unlike Routes===============================

router.post(
  "/post-like",
  authMiddleware, checkPermission,
  postLikeUnlikeValidator,
  likeController.postLike
);

router.post(
  "/post-unlike",
  authMiddleware, checkPermission,
  postLikeUnlikeValidator,
  likeController.postUnlike
);

router.post(
  "/post-like-count",
  authMiddleware, checkPermission,
  postLikeCountValidator,
  likeController.postLikeCount
);


const routerController = require("../controllers/admin/router-controller.js");

const {
  getRouterPermissionValidator
} = require("../helpers/validator-helpers.js");

router.get("/routes-with-permissions",
  authMiddleware,
  getRouterPermissionValidator,
  routerController.getAllRouterPermissions);


module.exports = router;
