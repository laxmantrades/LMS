const jwt = require("jsonwebtoken");

const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  return res.status(200).cookie("token", token).json({
    success: true,
    message,
    user,
  });
};
module.exports = generateToken;
