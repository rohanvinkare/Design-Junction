const { validationResult } = require("express-validator");

const Post = require("../model/post-model.js");
const { post } = require("../routes/common-routes");

//======================================Create Post=======================================
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { title, description } = req.body;

    var obj = {
      title,
      description,
    }

    if (req.body.categories) {
      obj.categories = req.body.categories;
    }

    const post = new Post(obj);

    const postData = await post.save();

    const postFullData = await Post.findOne({ _id: postData._id }).populate(
      "categories"
    );

    return res.status(400).json({
      success: true,
      msg: "Post Created Successfully",
      data: postFullData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.massage,
    });
  }
};

//======================================Get Post=======================================

const getPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("categories");

    return res.status(200).json({
      success: true,
      msg: "Posts Fetched Successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//======================================Delete Post=======================================

const deletePost = async (req, res) => {
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

    const isExist = await Post.findOne({ _id: id });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        msg: "Post ID does not exist",
      });
    }

    await Post.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Posts Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//======================================Update Post=======================================

const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { id, title, description } = req.body;

    const isExist = await Post.findOne({ _id: id });

    if (!isExist) {
      return res.status(200).json({
        success: false,
        msg: "Post ID Dose not Exists",
      });
    }

    var UpdateObj = {
      title,
      description,
    };

    if (req.body.categories != null) {
      UpdateObj.categories = req.body.categories;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: UpdateObj },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Posts Updated Successfully",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { createPost, getPost, deletePost, updatePost };
