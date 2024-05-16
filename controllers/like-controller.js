const { validationResult } = require("express-validator");

const Like = require("../model/like-model.js");

const postLike = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { user_id, post_id } = req.body;

    const isLiked = await Like.findOne({
      user_id,
      post_id,
    });

    if (isLiked) {
      return res.status(400).json({
        success: false,
        msg: "You Already Liked This Post",
      });
    }

    const like = new Like({
      user_id,
      post_id,
    });

    const likeData = await like.save();
    return res.status(200).json({
      success: false,
      msg: "Post Liked Successfully",
      data: likeData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const postUnlike = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { user_id, post_id } = req.body;

    const isLiked = await Like.findOne({
      user_id,
      post_id,
    });

    if (!isLiked) {
      return res.status(400).json({
        success: false,
        msg: "You haven't liked this post",
      });
    }

    await Like.deleteOne({
      user_id,
      post_id,
    });

    // Define likeData before returning it
    const likeData = {
      user_id,
      post_id,
    };

    return res.status(200).json({
      success: false,
      msg: "Post Unliked Successfully",
      data: likeData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
const postLikeCount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "error",
        errors: errors.array(),
      });
    }

    const { post_id } = req.body;

    const likeCount = await Like.find({
      post_id,
    }).countDocuments();

    return res.status(200).json({
      success: false,
      msg: "Post Like Count",
      count: likeCount,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
module.exports = { postLike, postUnlike, postLikeCount };
