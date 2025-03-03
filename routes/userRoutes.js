import express from 'express'; 
import userController from '../controllers/userController.js';
import userAuth from '../middleware/auth.js';

const { registerUser, loginUser, userCredits, getAllUsers,deleteUser } = userController;// Destructure the registerUser and loginUser functions
const userRouter = express.Router();// Create a router

userRouter.post('/register', registerUser);// Create a post route for register
userRouter.post('/login', loginUser);// Create a post route for login
userRouter.get('/credits', userAuth, userCredits);// Create a post route for credits
userRouter.get("/users", getAllUsers);
userRouter.delete("/delete", deleteUser);

export default userRouter;// Export the router