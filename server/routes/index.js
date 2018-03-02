import express from 'express';
import userController from '../controllers/userControllers';
import validators from '../middlewares/validators';
const router = express.Router();
router.post('/api/v1/signup', validators.validateSignUp, userController.signUp);

export default router;
