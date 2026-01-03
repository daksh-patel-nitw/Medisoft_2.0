import express from 'express';
import { forgotPasswordController, loginUserController } from '../Controllers/authController';

const router = express.Router();

//Login in the application
router.post('/login',loginUserController);

//Reset the user password
router.get('/forgotPassword',forgotPasswordController);

export default router;