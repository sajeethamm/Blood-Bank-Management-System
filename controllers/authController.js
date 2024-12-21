import UserModel from '../models/userModel.js'; // Import UserModel
import User from '../models/userModel.js'; // Import User for loginController
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    // Validation: Check if user already exists
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create new user
    const user = new UserModel(req.body);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //check Role
    if(user.role !== req.body.role){
      return res.status(500).send({
        success: false,
        message: "Role Dosent Match",
      })
    }
    // Compare password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return res.status(500).json({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// Current User Controller
export const currentUserController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.error("Error Fetching Current User:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get Current User",
      error,
    });
  }
};
