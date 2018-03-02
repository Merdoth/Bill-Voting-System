import express from 'express';
import userController from '../controllers/userControllers';
import adminController from '../controllers/adminControllers';
import validators from '../middlewares/validators';
const router = express.Router();
router.post('/api/v1/user/signup', validators.validateSignUp, userController.signUp);
router.post('/api/v1/user/signin', validators.validateSignIn, userController.signIn);
router.post('/api/v1/admin/signup', validators.validateAdmin, adminController.adminSignUp);
router.post('/api/v1/admin/signin', validators.validateAdmin, adminController.adminSignIn);

export default router;
