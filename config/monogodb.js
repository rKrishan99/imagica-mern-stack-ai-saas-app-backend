import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  // Connect to MongoDB
  await mongoose.connect(`${process.env.MONGO_URI}/imagica`);
};


export default connectDB;