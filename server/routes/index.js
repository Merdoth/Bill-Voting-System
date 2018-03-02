import express from 'express';
import userController from '../controllers/userControllers';
import validators from '../middlewares/validators';
const router = express.Router();
router.post('/api/v1/signup', validators.validateSignUp, userController.signUp);
router.post('/api/v1/signin', validators.validateSignIn, userController.signIn);

export default router;
