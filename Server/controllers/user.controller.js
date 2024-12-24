const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Valiatiing every thing here should be typed
    if (!name || !email | !password) {
      return res.status(500).json({
        status: false,
        message: "All fields are required",
      });
    }
    //checking if same email exists or not
    const ifSameEmailExist = await User.findOne({ email });
    if (ifSameEmailExist) {
      return res.status(500).json({
        status: false,
        message: "User already exists",
      });
    }
    

    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //pushing the data to user
    await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.json({
      success: true,
      message: "Succefully Registered",
    });
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        status: false,
        message: "All fileds are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        status: false,
        message: "Incorrect Email or Password",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(500).json({
        status: false,
        message: "Incorrect Email or Password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Login" + error.message,
    });
  }
};
module.exports = { register, login };
