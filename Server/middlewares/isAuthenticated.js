const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "User not authenticated",
      });
    }
    const decodeMessage = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeMessage) {
      return res.status(401).json({
        status: false,
        message: "Invalid Token",
      });
    }
    req.id = decodeMessage.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = isAuthenticated;
