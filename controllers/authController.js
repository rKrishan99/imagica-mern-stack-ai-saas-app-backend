import userModel from "../model/userModel.js";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  logger: true,
  debug: true,
});

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  console.log("Requested email:", email);
  console.log("SMTP Email:", process.env.EMAIL);
  console.log("SMTP Password length:", process.env.PASSWORD?.length);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_PASSWORD_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset - Imagica",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-image: linear-gradient(to right, #FFFFFF, #F0F0F0, #FEFEFE); padding: 6px;"> 
        <h2>Password Reset Request</h2>
        <p>Hello from Imagica!</p>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="background-image: linear-gradient(to right, #bc619b, #ef4444, #3b82f6); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
      `,
    };

    console.log("Attempting to send email...");
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    console.log("Email response:", emailResponse);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ success: false, message: "Token has expired" });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
