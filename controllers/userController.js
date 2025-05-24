

import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      profileImage,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        profileImage: user.profileImage,
      },
    });

    console.log("User Registered:", user);
    console.log("User Profile Image:", user.profileImage);

  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        profileImage: user.profileImage,
      },
    });
    console.log("User Logged:", user);
    console.log("User Profile Image:", user.profileImage);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const userCredits = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from the middleware
      if (!userId) {
        return res.status(401).json({ success: false, message: "User ID not found" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        credits: user.creditBalance,
        user: { 
          name: user.name,
          generatedImages: user.generatedImages || [],
          profileImage: user.profileImage || "no image",
         },
      });
    } catch (error) {
      console.log("User Credits Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find(); // Fetch all users from the database
      
      if (users.length === 0) {
        return res.status(404).json({ success: false, message: "No users found" });
      }
      
      res.status(200).json({
        success: true,
        users: users.map(user => ({
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          creditBalance: user.creditBalance,
          generatedImages: user.generatedImages,
        })),
      });
  
    } catch (error) {
      console.log("Error fetching all users:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      // const { email } = req.params; // Get user ID from the request parameters
      const { email } = req.body;

      console.log("User ID:", email);
  
      // Check if user ID is provided
      if (!email) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      // Attempt to find and delete the user by their ID
      const user = await userModel.findOneAndDelete({email});
  
      // If user is not found, return an error
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  

export default { registerUser, loginUser, userCredits, getAllUsers, deleteUser };
