import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/monogodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import restPasswordRouter from "./routes/resetPasswordRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.PASSWORD ? "Loaded" : "Not Loaded");
console.log("Password:", process.env.PASSWORD);


const startServer = async () => {
  try {
    await connectDB();

    app.get('/api/test', (req, res) => res.send('OK')) // Add a test route
    app.use("/api/user", userRouter);
    app.use("/api/image", imageRouter);
    app.use("/api/auth", restPasswordRouter);
    app.get("/", (req, res) => {
      res.send("API Working");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Log that the server is running
    });
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

startServer();
