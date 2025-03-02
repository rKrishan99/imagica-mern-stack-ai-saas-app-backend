import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/authController.js';

const restPasswordRouter = express.Router();

restPasswordRouter.post('/forgot-password', requestPasswordReset);
restPasswordRouter.post('/reset-password/:token', resetPassword);

export default restPasswordRouter;