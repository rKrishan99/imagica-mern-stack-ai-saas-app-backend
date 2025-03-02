import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
  profileImage: {
    type: String,
    default: "",
  },
  generatedImages: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
