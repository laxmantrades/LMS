const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const {
  deleteMediaFromCloudinary,
  uploadMedia,
} = require("../utils/cloudinary");

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
const logout = async (req,res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Succefully Loged Out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Logout" + error.message,
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
   

    if (!user) {
      return "No user found";
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      res.status(500).json({
        success: false,
        message: "User Not Found",
      });
    }
    //extract publicid from
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; //extracting public Id
      deleteMediaFromCloudinary(publicId);
    }
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;
    const updateData = { name, photoUrl };
    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    return res.status(200).json({
      success: true,
      user: updateUser,
      message: "User updated Succefully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload the file",
    });
  }
};
module.exports = { register, login, logout, getUserProfile,updateProfile };
