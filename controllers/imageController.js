import axios from "axios";
import userModel from "../model/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.id; // Extract userId from authenticated user

    console.log("User ID:", userId); // Log the user ID
    console.log("Prompt(server log):", prompt);

    const user = await userModel.findById(userId);


    if (!user || !prompt) {
      return res.status(400).json({
        success: false,
        message: "User not found or prompt not provided",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    // Deduct a credit from the user
    const formData = new FormData();
    formData.append("prompt", prompt);

    const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "x-api-key": process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer",
    });

    // Convert the image to base64
    const base64 = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64}`;

    // Deduct a credit from the user
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
      $push: { generatedImages: resultImage },
    });

    // Send the image to the user
    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });

  } catch (error) {
    console.log("Image Generation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
