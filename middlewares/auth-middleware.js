const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

  // const token =req.body.token || req.query.token || req.headers["authorization"];

  const token = req.cookies.token


  if (!token) {

    return res.redirect("/login");
    // return res.status(403).json({
    //   success: false,
    //   msg: "A Token Is Required For Authentication",
    // });
  }

  try {

    // const bearer = token.split(" ");

    // const bearerToken = bearer[1];

    const bearerToken = token

    const decodedData = jwt.verify(
      bearerToken,
      process.env.ACCESS_SECRET_TOKEN
    );

    req.user = decodedData.user;
  } catch (error) {


    return res.status(400).json({
      success: false,
      msg: "Invalid Token",
    });
  }


  return next();
};

module.exports = verifyToken;

