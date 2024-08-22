const { check } = require("express-validator");

exports.registerValidator = [
  check("name", "Name Is Required").not().isEmpty(),
  check("email", "Email Is Required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password Is Required")
    // .isLength({ min: 6 })
    .not()
    .isEmpty(),
];

exports.loginValidator = [
  check("email", "Email Is Required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password Is Required")
    // .isLength({ min: 6 })
    .not()
    .isEmpty(),
];

exports.createUserValidator = [
  check("name", "Name Is Required").not().isEmpty(),
  check("email", "Email Is Required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
];

exports.updateUserValidator = [
  check("id", "ID Is Required").not().isEmpty(),
  check("name", "Name Is Required").not().isEmpty(),
];
exports.deleteUserValidator = [check("id", "ID Is Required").not().isEmpty()];

exports.postLikeUnlikeValidator = [
  check("user_id", "ID Is Required").not().isEmpty(),
  check("post_id", "ID Is Required").not().isEmpty(),
];

exports.postLikeCountValidator = [
  check("post_id", "ID Is Required").not().isEmpty(),
];
