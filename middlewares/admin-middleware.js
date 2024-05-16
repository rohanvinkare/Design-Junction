const onlyAdminAccess = (req, res, next) => {
  try {
    //not equal to admin  ---> 1= admin
    if (req.user.role !== 1) {
      return res.status(400).json({
        success: false,
        msg: "You Have No Access - Only Admin can access",
      });
    }


  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "UnAuthorized Access - Only Admin can access",
    });
  }

  return next();
};

module.exports = { onlyAdminAccess };
